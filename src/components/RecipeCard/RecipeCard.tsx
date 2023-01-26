import { FC } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Tooltip,
} from '@mui/material';
import styles from './RecipeCard.module.scss';
import { Meal } from '../../utils/types';
import { FavoriteButton } from '../FavoriteButton';
import { NO_IMAGE_ICON } from '../../utils/constants';

export interface RecipeCardProps {
  recipe: Meal;
  handleShowRecipe: (recipe: Meal) => void;
}

export const RecipeCard: FC<RecipeCardProps> = (props) => {
  const { recipe, handleShowRecipe } = props;
  const { strMealThumb, strMeal, strInstructions } = recipe;

  return (
    <Grid item data-testid='recipeCard'>
      <Card sx={{ maxWidth: 200 }} className={styles.recipeCard}>
        <CardMedia
          sx={{ height: 180 }}
          image={strMealThumb}
          component='img'
          onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            event.currentTarget.src = NO_IMAGE_ICON;
          }}
        />
        <CardContent className={styles.cardContent}>
          <Grid container alignItems='stretch' justifyContent='flex-start'>
            <Grid item xs={10}>
              <Tooltip title={strMeal} placement='top'>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='span'
                  className={styles.recipeCardTitle}
                >
                  {strMeal.length > 20
                    ? `${strMeal.substring(0, 20).trim()}...`
                    : strMeal}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={2}>
              <FavoriteButton recipe={recipe} />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body2'
                color='text.secondary'
                component='span'
                className={styles.recipeCardInstructions}
              >
                {strInstructions.length > 100
                  ? `${strInstructions.substring(0, 100).trim()}...`
                  : strInstructions}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            variant='contained'
            data-testid='readMoreButton'
            className={styles.readMoreButton}
            onClick={() => handleShowRecipe(recipe)}
          >
            Read more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
