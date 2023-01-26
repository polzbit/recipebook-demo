import { FC } from 'react';
import { IconButton } from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';
import styles from './FavoriteButton.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { Meal, VF } from '../../utils/types';
import { toggleFavoriteItem } from '../../store/recipes/reducer';

export interface FavoriteButtonProps {
  recipe: Meal;
}

export const FavoriteButton: FC<FavoriteButtonProps> = (props) => {
  const { recipe } = props;
  const { idMeal } = recipe;
  const dispatch = useAppDispatch();

  const favoriteRecipes: Meal[] = useAppSelector(
    (state) => state.favoriteRecipes,
  );
  const isFavorite: boolean = favoriteRecipes.some(
    (favoriteRecipe: Meal) => favoriteRecipe.idMeal === idMeal,
  );
  const handleFavoriteClick: VF = () => {
    dispatch(toggleFavoriteItem(recipe));
  };
  return (
    <IconButton
      className={styles.favoriteButton}
      onClick={handleFavoriteClick}
      data-testid='favoriteButton'
    >
      {isFavorite ? (
        <Star data-testid='starFull' />
      ) : (
        <StarBorder data-testid='starOutline' />
      )}
    </IconButton>
  );
};
