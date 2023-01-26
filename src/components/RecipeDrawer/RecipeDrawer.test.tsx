import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RecipeDrawer } from '.';
import { mockMeals } from '../../utils/mock';
import { store } from '../../store';

describe('RecipeDrawer test suite', () => {
  const mockRecipe = mockMeals[0];
  const mockCloseDrawer = jest.fn();

  it('RecipeDrawer should mount', () => {
    render(
      <Provider store={store}>
        <RecipeDrawer recipe={undefined} handleCloseDrawer={mockCloseDrawer} />
      </Provider>,
    );
    const recipeDrawer = screen.getByTestId('recipeDrawer');
    expect(recipeDrawer).toBeInTheDocument();
  });

  it('RecipeDrawer should show recipe', () => {
    render(
      <Provider store={store}>
        <RecipeDrawer recipe={mockRecipe} handleCloseDrawer={mockCloseDrawer} />
      </Provider>,
    );
    expect(screen.queryByTestId('recipeDrawer')).toBeInTheDocument();
  });
});
