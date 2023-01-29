import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Grid,
  FormControl,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  ListItem,
  ListItemText,
  List,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import {
  ChevronLeft,
  KeyboardArrowDown,
  Add,
  Delete,
} from '@mui/icons-material';
import styles from './AddRecipePage.module.scss';
import appStyles from '../../components/App/App.module.scss';
import { RECIPE_BOARD_ROUTE } from '../../utils/routes';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCategories } from '../../store/recipes/actions';
import { Category, VF } from '../../utils/types';
import { addRecipe } from '../../store/recipes/reducer';

export interface AddRecipeState {
  name: string;
  category: string;
  img: string;
  instructions: string;
  ingredient: string;
  ingredients: string[];
}

export const AddRecipePage: React.ElementType = () => {
  const [state, setState] = useState<AddRecipeState>({
    name: '',
    category: '',
    img: '',
    instructions: '',
    ingredient: '',
    ingredients: [],
  });
  const dispatch = useAppDispatch();
  const categories: Category[] = useAppSelector((state) => state.categories);
  const isValidForm =
    !!state.name &&
    !!state.category &&
    !!state.img &&
    !!state.instructions &&
    state.ingredients.length;
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const navigate = useNavigate();

  const goBack: VF = () => {
    navigate(RECIPE_BOARD_ROUTE);
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const name = event.target.name as string;
    const value = event.target.value as string;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const category = event.target.value as string;
    setState({ ...state, category });
  };

  const removeIngredients = (ingredient: string) => {
    setState({
      ...state,
      ingredients: state.ingredients.filter(
        (oldIngredient) => oldIngredient !== ingredient,
      ),
    });
  };

  const renderIngredients = () => {
    return state.ingredients.map((ingredient, index) => (
      <ListItem
        key={index}
        secondaryAction={
          <IconButton
            edge='end'
            onClick={() => removeIngredients(ingredient)}
            data-testid='removeIngredientButton'
          >
            <Delete />
          </IconButton>
        }
      >
        <ListItemText primary={ingredient} data-testid='ingredient' />
      </ListItem>
    ));
  };

  const addIngredient: VF = () => {
    if (
      !!state.ingredient &&
      state.ingredients.length < 20 &&
      !state.ingredients.some((ingredient) => ingredient === state.ingredient)
    ) {
      setState({
        ...state,
        ingredients: [...state.ingredients, state.ingredient],
        ingredient: '',
      });
    } else {
      setState({
        ...state,
        ingredient: '',
      });
    }
  };

  const addNewRecipe: VF = () => {
    if (isValidForm) {
      dispatch(addRecipe(state));
      navigate(RECIPE_BOARD_ROUTE);
    }
  };

  return (
    <Grid
      container
      className={`${styles.addRecipePage} ${appStyles.page}`}
      data-testid='addRecipePage'
    >
      <Grid item xs={12}>
        <Button
          variant='text'
          className={styles.backButton}
          startIcon={<ChevronLeft />}
          onClick={goBack}
          data-testid='backButton'
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems='flex-start'>
          <Grid item xs={12}>
            <h1 className={styles.addRecipeTitle}>Add Recipe</h1>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={3.5}>
              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <TextField
                    name='name'
                    placeholder='Meal name'
                    value={state.name}
                    onChange={handleTextChange}
                    data-testid='nameInput'
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    name='category'
                    displayEmpty
                    value={state.category}
                    label='Pick a category'
                    input={<OutlinedInput />}
                    IconComponent={KeyboardArrowDown}
                    onChange={handleCategoryChange}
                    data-testid='categorySelect'
                  >
                    <MenuItem disabled value=''>
                      <em>Pick a Category</em>
                    </MenuItem>
                    {categories?.map(({ strCategory }) => (
                      <MenuItem key={strCategory} value={strCategory}>
                        {strCategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }}>
                  <TextField
                    name='img'
                    placeholder='Image URL'
                    value={state.img}
                    onChange={handleTextChange}
                    data-testid='imgInput'
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} className={styles.ingredientsForm}>
                <FormControl sx={{ width: '100%' }}>
                  <TextField
                    name='ingredient'
                    placeholder='Ingredient'
                    value={state.ingredient}
                    onChange={handleTextChange}
                    data-testid='ingredientInput'
                  />
                </FormControl>
                <Button
                  variant='contained'
                  onClick={addIngredient}
                  data-testid='addIngredientButton'
                >
                  <Add />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <List disablePadding dense>
                  {renderIngredients()}
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <FormControl sx={{ width: '100%', ml: '15px' }}>
              <TextField
                name='instructions'
                placeholder='Instructions'
                multiline
                rows={12}
                value={state.instructions}
                onChange={handleTextChange}
                data-testid='instructionsArea'
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ mt: '15px' }}>
            <Box display='flex' justifyContent='flex-end'>
              <Button
                variant='contained'
                onClick={addNewRecipe}
                className={styles.addRecipeButton}
                data-testid='addRecipeButton'
                disabled={!isValidForm}
              >
                Add
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
