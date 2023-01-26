const MEAL_DB_URL = 'https://www.themealdb.com/api/json/v1/1';

export const MEALS_DB_ROUTES = {
  GET_CATEGORIES: `${MEAL_DB_URL}/list.php?c=list`,
  GET_MEALS_BY_CATEGORY: `${MEAL_DB_URL}/filter.php?c=:category`,
  SEARCH_MEAL_BY_FIRST_LATTER: `${MEAL_DB_URL}/search.php?f=:char`,
  SEARCH_MEAL_BY_NAME: `${MEAL_DB_URL}/search.php?s=:name`,
  GET_MEAL_BY_ID: `${MEAL_DB_URL}/lookup.php?i=:mealId`,
};

export const getMealCategories = () => {
  return fetch(MEALS_DB_ROUTES.GET_CATEGORIES, {
    method: 'GET',
  });
};

export const getMealsIdsByCategory = (category: string) => {
  return fetch(
    MEALS_DB_ROUTES.GET_MEALS_BY_CATEGORY.replace(':category', category),
    {
      method: 'GET',
    },
  );
};

export const getMealById = (mealId: string) => {
  return fetch(MEALS_DB_ROUTES.GET_MEAL_BY_ID.replace(':mealId', mealId), {
    method: 'GET',
  });
};

export const getMealsByFirstLatter = (char: string) => {
  return fetch(
    MEALS_DB_ROUTES.SEARCH_MEAL_BY_FIRST_LATTER.replace(':char', char),
    {
      method: 'GET',
    },
  );
};

export const getMealsByName = (name: string) => {
  return fetch(MEALS_DB_ROUTES.SEARCH_MEAL_BY_NAME.replace(':name', name), {
    method: 'GET',
  });
};

export const searchMeal = async (meal: string) => {
  try {
    const response = await getMealsByName(meal);
    if (response.status === 200) {
      return response.json();
    }
    throw new Error('[!] Meals DB currently not available.');
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await getMealCategories();
    if (response.status === 200) {
      return response.json();
    }
    throw new Error('[!] Meals DB currently not available.');
  } catch (error) {
    throw error;
  }
};

export const getMealsByCategory = async (category: string) => {
  try {
    const mealsIdsResponse = await getMealsIdsByCategory(category);
    if (mealsIdsResponse.status === 200) {
      const mealsIds = await mealsIdsResponse.json();
      const { meals } = mealsIds;
      return meals
        ?.map(async (meal: any) => {
          const { idMeal } = meal;
          const mealResponse = await getMealById(idMeal);
          if (mealResponse.status === 200) {
            const { meals: mealData } = await mealResponse.json();
            return {
              ...mealData[0],
            };
          }
          return null;
        })
        .filter((meal: any) => !!meal);
    }
    throw new Error('[!] Meals DB currently not available.');
  } catch (error) {
    throw error;
  }
};
