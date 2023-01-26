import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RecipeBoard } from '.';
import { mockMeals } from '../../utils/mock';
import { store } from '../../store';

describe('RecipeBoard test suite', () => {
  const mockShowRecipe = jest.fn();
  it('RecipeBoard should mount', () => {
    render(
      <Provider store={store}>
        <RecipeBoard recipes={mockMeals} handleShowRecipe={mockShowRecipe} />
      </Provider>,
    );
    const recipeBoard = screen.getByTestId('recipeBoard');
    expect(recipeBoard).toBeInTheDocument();
  });

  it('RecipeBoard should show pagination', () => {
    render(
      <Provider store={store}>
        <RecipeBoard recipes={mockMeals} handleShowRecipe={mockShowRecipe} />
      </Provider>,
    );
    const pagination = screen.getByTestId('pagination');
    const prevButton = screen.getByTestId('prevButton');
    const nextButton = screen.getByTestId('nextButton');
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    expect(pagination).toBeInTheDocument();
  });

  it('RecipeBoard should hide pagination', () => {
    render(
      <Provider store={store}>
        <RecipeBoard recipes={[]} handleShowRecipe={mockShowRecipe} />
      </Provider>,
    );
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
});
