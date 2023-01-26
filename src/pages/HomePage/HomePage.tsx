import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Grid, Tabs, Tab } from '@mui/material';
import appStyles from '../../components/App/App.module.scss';
import styles from './HomePage.module.scss';
import { TabPanel } from '../../components/TabPanel';
import { RecipeBoardHeader } from '../../components/RecipeBoardHeader';
import { DEFAULT_CATEGORY, RECIPE_TABS } from '../../utils/constants';
import { ADD_RECIPE_ROUTE } from '../../utils/routes';
import { RecipeBoard } from '../../components/RecipeBoard';
import {
  fetchCategories,
  fetchMealsByCategory,
  fetchSearchMeals,
} from '../../store/recipes/actions';
import { useAppDispatch, useAppSelector } from '../../store';
import { Category, Meal } from '../../utils/types';
import { SelectChangeEvent } from '@mui/material';
import { RecipeDrawer } from '../../components/RecipeDrawer';
import { filterCategory } from '../../store/recipes/reducer';

export interface HomePageState {
  search: string;
  currentTab: string;
  currentCategories: string[];
  currentRecipe?: Meal;
}

export const HomePage: React.ElementType = () => {
  const [state, setState] = useState<HomePageState>({
    search: '',
    currentTab: RECIPE_TABS.all,
    currentCategories: [DEFAULT_CATEGORY],
    currentRecipe: undefined,
  });
  const categories: Category[] = useAppSelector((state) => state.categories);
  const recipes: Meal[] = useAppSelector((state) => state.recipes);
  const favoriteRecipes: Meal[] = useAppSelector(
    (state) => state.favoriteRecipes,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMealsByCategory(DEFAULT_CATEGORY));
  }, [dispatch]);

  const navigate = useNavigate();

  const handleAddRecipe = () => {
    navigate(ADD_RECIPE_ROUTE);
  };

  const handleTabChange = (event: React.SyntheticEvent, tab: string) => {
    setState({ ...state, currentTab: tab });
  };

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const currentCategories = event.target.value as string[];
    if (currentCategories.length > state.currentCategories.length) {
      dispatch(
        fetchMealsByCategory(currentCategories[currentCategories.length - 1]),
      );
    } else {
      const currentCategory = state.currentCategories.find(
        (category) => !currentCategories.includes(category),
      );
      dispatch(filterCategory(currentCategory));
    }
    setState({
      ...state,
      currentCategories,
    });
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const search = event.target.value as string;
    if (search.length) {
      dispatch(fetchSearchMeals(search));
    } else {
      dispatch(fetchMealsByCategory(DEFAULT_CATEGORY));
    }
    setState({ ...state, search });
  };

  const closeDrawer = () => {
    setState({ ...state, currentRecipe: undefined });
  };

  const openDrawer = (recipe: Meal) => {
    setState({ ...state, currentRecipe: recipe });
  };

  return (
    <Grid
      container
      className={`${styles.home} ${appStyles.page}`}
      data-testid='homePage'
    >
      <Grid item xs={12} className={styles.recipeBoardTitle}>
        <h1>Recipes</h1>
      </Grid>
      <Grid item xs={12}>
        <RecipeBoardHeader
          search={state.search}
          currentCategories={state.currentCategories}
          categories={categories}
          handleCategoryChange={handleCategoryChange}
          handleSearchChange={handleSearchChange}
          handleAddRecipe={handleAddRecipe}
        />
      </Grid>
      <Grid item xs={12}>
        <Tabs
          value={state.currentTab}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { backgroundColor: 'rgb(92, 10, 199)' } }}
          textColor='secondary'
        >
          <Tab
            label='All Recipes'
            value={RECIPE_TABS.all}
            className={styles.recipeBoardTab}
            data-testid='allTab'
          />
          <Tab
            label='Favorites'
            value={RECIPE_TABS.favorite}
            className={styles.recipeBoardTab}
            data-testid='favTab'
          />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        <TabPanel
          currentTab={state.currentTab}
          value={RECIPE_TABS.all}
          testId='allTabPanel'
        >
          <RecipeBoard recipes={recipes} handleShowRecipe={openDrawer} />
        </TabPanel>
        <TabPanel
          currentTab={state.currentTab}
          value={RECIPE_TABS.favorite}
          testId='favTabPanel'
        >
          <RecipeBoard
            recipes={favoriteRecipes}
            handleShowRecipe={openDrawer}
          />
        </TabPanel>
      </Grid>
      <RecipeDrawer
        recipe={state.currentRecipe}
        handleCloseDrawer={closeDrawer}
      />
    </Grid>
  );
};
