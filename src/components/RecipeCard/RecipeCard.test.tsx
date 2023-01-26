import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RecipeCard } from '.';
import { mockMeals } from '../../utils/mock';
import { store } from '../../store';

describe('RecipeCard test suite', () => {
  const mockRecipe = mockMeals[0];
  const mockRecipeSmall = { ...mockRecipe, strMeal: '', strInstructions: '' };
  const mockShowRecipe = jest.fn();

  it('RecipeCard should mount', () => {
    render(
      <Provider store={store}>
        <RecipeCard recipe={mockRecipe} handleShowRecipe={mockShowRecipe} />
      </Provider>,
    );
    const recipeCard = screen.getByTestId('recipeCard');
    expect(recipeCard).toBeInTheDocument();
  });

  it('RecipeCard should show recipe', () => {
    render(
      <Provider store={store}>
        <RecipeCard
          recipe={mockRecipeSmall}
          handleShowRecipe={mockShowRecipe}
        />
      </Provider>,
    );
    const readMoreButton = screen.getByTestId('readMoreButton');
    fireEvent.click(readMoreButton);
    expect(mockShowRecipe).toBeCalled();
  });
});
