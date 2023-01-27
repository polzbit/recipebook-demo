import {
  findByTestId,
  findByText,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { AddRecipePage } from '.';
import { store } from '../../store';
import { RECIPE_BOARD_ROUTE } from '../../utils/routes';
import * as router from 'react-router';
import { MEALS_DB_ROUTES } from '../../api/themealdb';
import { mockCategories, mockMeals } from '../../utils/mock';

const handlers = [
  rest.get(
    MEALS_DB_ROUTES.GET_MEAL_BY_ID.replace('?i=:mealId', ''),
    (req, res, ctx) => {
      return res(ctx.json({ meals: [mockMeals[0]] }), ctx.delay(150));
    },
  ),
  rest.get(
    MEALS_DB_ROUTES.GET_MEALS_BY_CATEGORY.replace('?c=:category', ''),
    (req, res, ctx) => {
      return res(ctx.json({ meals: mockMeals }), ctx.delay(150));
    },
  ),
  rest.get(
    MEALS_DB_ROUTES.GET_CATEGORIES.replace('?c=list', ''),
    (req, res, ctx) => {
      return res(
        ctx.json({
          meals: mockCategories,
        }),
        ctx.delay(150),
      );
    },
  ),
];

describe('AddRecipePage test suite', () => {
  const server = setupServer(...handlers);
  const mockNavigate = jest.fn();
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
  });

  it('AddRecipePage should mount', () => {
    render(
      <Provider store={store}>
        <AddRecipePage />
      </Provider>,
    );
    const addRecipePage = screen.getByTestId('addRecipePage');
    expect(addRecipePage).toBeInTheDocument();
  });

  it('AddRecipePage should route to home', () => {
    render(
      <Provider store={store}>
        <AddRecipePage />
      </Provider>,
    );
    const backButton = screen.getByTestId('backButton');
    fireEvent.click(backButton);
    expect(mockNavigate).toBeCalledWith(RECIPE_BOARD_ROUTE);
  });

  it('AddRecipePage should set name input text', () => {
    render(
      <Provider store={store}>
        <AddRecipePage />
      </Provider>,
    );
    const nameInput = within(screen.getByTestId('nameInput'));
    const input = nameInput.getByPlaceholderText('Meal name');
    expect(nameInput.queryByDisplayValue('test')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(nameInput.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('AddRecipePage should set category select item', async () => {
    render(
      <Provider store={store}>
        <AddRecipePage />
      </Provider>,
    );
    const categorySelect = within(screen.getByTestId('categorySelect'));
    const selectButton = categorySelect.getByRole('button');
    fireEvent.mouseDown(selectButton);
    const listBox = within(screen.getByRole('listbox'));
    const listItem = await listBox.findByText('Vegetarian');
    fireEvent.click(listItem);
    expect(categorySelect.getByDisplayValue('Vegetarian')).toBeInTheDocument();
  });

  it('AddRecipePage should add/remove ingredients', () => {
    render(
      <Provider store={store}>
        <AddRecipePage />
      </Provider>,
    );
    const ingredientInput = within(screen.getByTestId('ingredientInput'));
    const input = ingredientInput.getByPlaceholderText('Ingredient');
    expect(ingredientInput.queryByDisplayValue('test')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(ingredientInput.getByDisplayValue('test')).toBeInTheDocument();
    const addIngredientButton = screen.getByTestId('addIngredientButton');
    fireEvent.click(addIngredientButton);
    expect(ingredientInput.getByDisplayValue('')).toBeInTheDocument();
    const newIngredient = screen.getByText('test');
    expect(newIngredient).toBeInTheDocument();
    const removeIngredientButton = screen.getByTestId('removeIngredientButton');
    fireEvent.click(removeIngredientButton);
    expect(newIngredient).not.toBeInTheDocument();
  });

  it('AddRecipePage should not add empty ingredients', () => {
    render(
      <Provider store={store}>
        <AddRecipePage />
      </Provider>,
    );

    const addIngredientButton = screen.getByTestId('addIngredientButton');
    fireEvent.click(addIngredientButton);
    expect(
      screen.queryByTestId('removeIngredientButton'),
    ).not.toBeInTheDocument();
  });

  it('AddRecipePage should not add duplicate ingredients', () => {
    render(
      <Provider store={store}>
        <AddRecipePage />
      </Provider>,
    );
    const ingredientInput = within(screen.getByTestId('ingredientInput'));
    const ingredient = ingredientInput.getByPlaceholderText('Ingredient');
    expect(ingredientInput.queryByDisplayValue('test')).not.toBeInTheDocument();
    fireEvent.change(ingredient, { target: { value: 'test' } });
    expect(ingredientInput.getByDisplayValue('test')).toBeInTheDocument();
    const addIngredientButton = screen.getByTestId('addIngredientButton');
    fireEvent.click(addIngredientButton);
    expect(ingredientInput.getByDisplayValue('')).toBeInTheDocument();
    const newIngredients = screen.getAllByTestId('ingredient');
    expect(newIngredients.length).toBe(1);
    fireEvent.change(ingredient, { target: { value: 'test' } });
    expect(ingredientInput.getByDisplayValue('test')).toBeInTheDocument();
    fireEvent.click(addIngredientButton);
    expect(ingredientInput.getByDisplayValue('')).toBeInTheDocument();
    expect(newIngredients.length).toBe(1);
  });

  it('AddRecipePage should not add recipe', () => {
    render(
      <Provider store={store}>
        <AddRecipePage />
      </Provider>,
    );
    const addRecipeButton = screen.getByTestId('addRecipeButton');
    fireEvent.click(addRecipeButton);
    expect(mockNavigate).toBeCalledTimes(0);
  });

  it('AddRecipePage should add recipe and redirect to home', async () => {
    render(
      <Provider store={store}>
        <AddRecipePage />
      </Provider>,
    );

    const nameInput = within(screen.getByTestId('nameInput'));
    const name = nameInput.getByPlaceholderText('Meal name');
    expect(nameInput.queryByDisplayValue('test')).not.toBeInTheDocument();
    fireEvent.change(name, { target: { value: 'test' } });
    expect(nameInput.getByDisplayValue('test')).toBeInTheDocument();

    const categorySelect = within(screen.getByTestId('categorySelect'));
    const selectButton = categorySelect.getByRole('button');
    fireEvent.mouseDown(selectButton);
    const listBox = within(screen.getByRole('listbox'));
    const listItem = await listBox.findByText('Vegetarian');
    fireEvent.click(listItem);

    const imgInput = within(screen.getByTestId('imgInput'));
    const img = imgInput.getByPlaceholderText('Image URL');
    expect(imgInput.queryByDisplayValue('test')).not.toBeInTheDocument();
    fireEvent.change(img, { target: { value: 'test' } });
    expect(imgInput.getByDisplayValue('test')).toBeInTheDocument();

    const ingredientInput = within(screen.getByTestId('ingredientInput'));
    const input = ingredientInput.getByPlaceholderText('Ingredient');
    expect(ingredientInput.queryByDisplayValue('test')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(ingredientInput.getByDisplayValue('test')).toBeInTheDocument();
    const addIngredientButton = screen.getByTestId('addIngredientButton');
    fireEvent.click(addIngredientButton);

    const instructionsArea = within(screen.getByTestId('instructionsArea'));
    const instructions = instructionsArea.getByPlaceholderText('Instructions');
    expect(
      instructionsArea.queryByDisplayValue('test'),
    ).not.toBeInTheDocument();
    fireEvent.change(instructions, { target: { value: 'test' } });
    expect(instructionsArea.getByDisplayValue('test')).toBeInTheDocument();

    const addRecipeButton = screen.getByTestId('addRecipeButton');
    fireEvent.click(addRecipeButton);
    expect(mockNavigate).toBeCalledWith(RECIPE_BOARD_ROUTE);
  });
});
