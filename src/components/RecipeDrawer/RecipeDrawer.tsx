import { FC } from 'react';
import {
  Box,
  Grid,
  SwipeableDrawer,
  IconButton,
  ListItem,
  ListItemText,
  List,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './RecipeDrawer.module.scss';
import { Meal, VF } from '../../utils/types';
import { FavoriteButton } from '../FavoriteButton';
import { NO_IMAGE_ICON } from '../../utils/constants';

export interface RecipeDrawerProps {
  recipe: Meal | undefined;
  handleCloseDrawer: VF;
}

export const RecipeDrawer: FC<RecipeDrawerProps> = (props) => {
  const { recipe, handleCloseDrawer } = props;

  const renderIngredients = () => {
    if (recipe) {
      const ingredients = Object.entries(recipe).reduce(
        (_newObj, [key, value]) => {
          if (key.includes('strIngredient') && !!value) {
            return { ..._newObj, [key]: value };
          }
          return _newObj;
        },
        {},
      );
      const ingredientsStr: string[] = Object.values(ingredients);
      return ingredientsStr.map((ingredient: string, index: number) => (
        <ListItem key={index}>
          <ListItemText
            disableTypography
            primary={ingredient}
            sx={{ fontSize: '12px', margin: 0 }}
          />
        </ListItem>
      ));
    }
    return null;
  };

  return (
    <SwipeableDrawer
      data-testid='recipeDrawer'
      anchor='right'
      open={!!recipe}
      onClose={handleCloseDrawer}
      onOpen={() => null}
      PaperProps={{
        style: {
          borderBottomLeftRadius: '15px',
          borderTopLeftRadius: '15px',
          overflowX: 'hidden',
        },
      }}
    >
      <Box className={styles.recipeInfo}>
        <Grid container alignItems='flex-start' spacing={0}>
          <Grid item xs={12}>
            <IconButton
              onClick={handleCloseDrawer}
              data-testid='drawerCloseButton'
            >
              <Close />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ mt: '100px', p: '0 25px' }}>
              <Grid item xs={6}>
                <img
                  className={styles.mealThumb}
                  src={recipe?.strMealThumb}
                  onError={(
                    event: React.SyntheticEvent<HTMLImageElement, Event>,
                  ) => {
                    event.currentTarget.src = NO_IMAGE_ICON;
                  }}
                  alt=''
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <h1 className={styles.recipeHeader}>{recipe?.strMeal}</h1>
                  </Grid>
                  <Grid item xs={10}>
                    <h3 className={styles.recipeCategory}>
                      {recipe?.strCategory}
                    </h3>
                  </Grid>
                  <Grid item xs={2}>
                    {recipe && <FavoriteButton recipe={recipe} />}
                  </Grid>
                  <Grid item xs={12}>
                    <h5 className={styles.recipeSubTitle}>Ingredients:</h5>
                  </Grid>
                  <Grid item xs={12}>
                    <List dense disablePadding>
                      {renderIngredients()}
                    </List>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <h5 className={styles.recipeSubTitle}>Instructions:</h5>
              </Grid>
              <Grid item xs={12}>
                <p className={styles.instructions}>{recipe?.strInstructions}</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </SwipeableDrawer>
  );
};
