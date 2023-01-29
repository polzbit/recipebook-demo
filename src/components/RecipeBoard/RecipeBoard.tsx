import { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import styles from './RecipeBoard.module.scss';
import { Meal } from '../../utils/types';
import { RecipeCard } from '../RecipeCard';
import { Pagination } from '../Pagination';

export interface RecipeBoardProps {
  recipes: Meal[];
  handleShowRecipe: (recipe: Meal) => void;
}

export const RecipeBoard: FC<RecipeBoardProps> = (props) => {
  const { recipes, handleShowRecipe } = props;
  const [page, setPage] = useState(1);
  const MAX_ITEMS = 10;
  const recipesToRender = recipes.slice(
    (page - 1) * MAX_ITEMS,
    page * MAX_ITEMS,
  );

  useEffect(() => {
    setPage(1);
  }, [recipes]);

  return (
    <Grid
      container
      className={styles.recipeBoard}
      data-testid='recipeBoard'
      spacing={2}
    >
      {recipesToRender.map((recipe, index) => (
        <Grid key={index} item lg={2.4} md={3} sm={4} xs={6}>
          <RecipeCard recipe={recipe} handleShowRecipe={handleShowRecipe} />
        </Grid>
      ))}
      {!recipesToRender.length && (
        <Grid item xs={12} className={styles.emptyBoard}>
          <span>Nothing to show.</span>
        </Grid>
      )}
      <Grid item xs={12}>
        <Pagination
          page={page}
          numOfItems={recipes.length}
          maxItems={MAX_ITEMS}
          handleNextClick={() => setPage(page + 1)}
          handlePrevClick={() => setPage(page - 1)}
        />
      </Grid>
    </Grid>
  );
};
