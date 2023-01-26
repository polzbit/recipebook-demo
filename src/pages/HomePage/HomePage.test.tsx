import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { HomePage } from '.';
import { store } from '../../store';
import { ADD_RECIPE_ROUTE, RECIPE_BOARD_ROUTE } from '../../utils/routes';
import * as router from 'react-router';
import { MEALS_DB_ROUTES } from '../../api/themealdb';
import { mockCategories, mockMeals } from '../../utils/mock';

const handlers = [
  rest.get(
    MEALS_DB_ROUTES.GET_MEAL_BY_ID.replace('?i=:mealId', ''),
    (req, res, ctx) => {
      return res(ctx.json({ meals: mockMeals[0] }), ctx.delay(150));
    },
  ),
  rest.get(
    MEALS_DB_ROUTES.GET_MEALS_BY_CATEGORY.replace('?c=:category', ''),
    (req, res, ctx) => {
      return res(ctx.json({ meals: mockMeals }), ctx.delay(150));
    },
  ),
  rest.get(MEALS_DB_ROUTES.GET_CATEGORIES, (req, res, ctx) => {
    return res(ctx.json({ meals: mockCategories }), ctx.delay(150));
  }),
  rest.get(
    MEALS_DB_ROUTES.SEARCH_MEAL_BY_NAME.replace('?s=:search', ''),
    (req, res, ctx) => {
      return res(ctx.json({ meals: mockMeals }), ctx.delay(150));
    },
  ),
];

describe('HomePage test suite', () => {
  const server = setupServer(...handlers);
  const mockNavigate = jest.fn();
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
  });

  it('HomePage should mount', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const homePage = screen.getByTestId('homePage');
    expect(homePage).toBeInTheDocument();
  });

  it('HomePage should route to add recipe page', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const addRecipeNavButton = screen.getByTestId('addRecipeNavButton');
    fireEvent.click(addRecipeNavButton);
    expect(mockNavigate).toBeCalledWith(ADD_RECIPE_ROUTE);
  });

  it('HomePage should handle tab change', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const favTab = screen.getByTestId('favTab');
    const allTabPanel = screen.getByTestId('allTabPanel');
    const favTabPanel = screen.getByTestId('favTabPanel');
    expect(allTabPanel).toBeVisible();
    expect(favTabPanel).not.toBeVisible();
    fireEvent.click(favTab);
    expect(allTabPanel).not.toBeVisible();
    expect(favTabPanel).toBeVisible();
  });

  it('HomePage should set category select item', async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const categorySelect = within(screen.getByTestId('categorySelect'));
    const selectButton = categorySelect.getByRole('button');
    fireEvent.mouseDown(selectButton);
    const listBox = within(screen.getByRole('listbox'));
    const listItem = await listBox.findByText('Vegetarian');
    fireEvent.click(listItem);
    expect(listItem).toHaveClass('Mui-selected');
  });

  it('HomePage should handle search', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const searchInput = within(screen.getByTestId('searchInput'));
    const input = searchInput.getByPlaceholderText('Search');
    expect(searchInput.queryByDisplayValue('test')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(searchInput.getByDisplayValue('test')).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '' } });
    expect(searchInput.getByDisplayValue('')).toBeInTheDocument();
  });

  it('HomePage should toggle drawer', async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    const readMoreButton = await screen.findAllByTestId('readMoreButton');
    fireEvent.click(readMoreButton[0]);
    const drawer = screen.getByTestId('recipeDrawer');
    expect(drawer).not.toHaveClass('MuiModal-hidden');
    const drawerCloseButton = screen.getByTestId('drawerCloseButton');
    fireEvent.click(drawerCloseButton);
    await waitFor(() => expect(drawer).toHaveClass('MuiModal-hidden'));
  });
});
