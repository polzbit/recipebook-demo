import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { FavoriteButton } from '.';
import { mockMeals } from '../../utils/mock';
import { store } from '../../store';
import { toggleFavoriteItem } from '../../store/recipes/reducer';

describe('FavoriteButton test suite', () => {
  it('FavoriteButton should mount', () => {
    const mockRecipe = mockMeals[0];
    render(
      <Provider store={store}>
        <FavoriteButton recipe={mockRecipe} />
      </Provider>,
    );
    const favoriteButton = screen.getByTestId('favoriteButton');
    const starOutline = screen.getByTestId('starOutline');
    expect(favoriteButton).toBeInTheDocument();
    expect(starOutline).toBeInTheDocument();
  });
  it('FavoriteButton should show as favorite', () => {
    const mockRecipe = mockMeals[0];
    store.dispatch(toggleFavoriteItem(mockRecipe));
    render(
      <Provider store={store}>
        <FavoriteButton recipe={mockRecipe} />
      </Provider>,
    );
    const favoriteButton = screen.getByTestId('favoriteButton');
    const starFull = screen.getByTestId('starFull');
    expect(starFull).toBeInTheDocument();
    fireEvent.click(favoriteButton);
  });
});
