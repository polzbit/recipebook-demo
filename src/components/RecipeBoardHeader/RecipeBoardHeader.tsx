import { FC } from 'react';
import {
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import { KeyboardArrowDown, Search } from '@mui/icons-material';
import styles from './RecipeBoardHeader.module.scss';
import { Category, VF } from '../../utils/types';

export interface RecipeBoardHeaderProps {
  search: string;
  categories: Category[];
  currentCategories: string[];
  handleCategoryChange: (event: SelectChangeEvent<unknown>) => void;
  handleSearchChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  handleAddRecipe: VF;
}

export const RecipeBoardHeader: FC<RecipeBoardHeaderProps> = (props) => {
  const {
    search,
    categories,
    currentCategories,
    handleAddRecipe,
    handleSearchChange,
    handleCategoryChange,
  } = props;
  return (
    <Grid
      container
      className={styles.recipeBoardHeader}
      data-testid='recipeBoardHeader'
      alignItems='center'
      justifyContent='flex-start'
      spacing={2}
    >
      <Grid item xs={3.5}>
        <FormControl sx={{ width: '100%' }} size='small'>
          <Select
            multiple
            displayEmpty
            data-testid='categorySelect'
            value={currentCategories}
            label='Pick a category'
            input={<OutlinedInput />}
            IconComponent={KeyboardArrowDown}
            onChange={handleCategoryChange}
            renderValue={() => (
              <span className={styles.selectPlaceholder}>Pick a category</span>
            )}
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
      <Grid item xs={3.5}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            value={search}
            onChange={handleSearchChange}
            placeholder='Search'
            data-testid='searchInput'
            inputProps={{
              style: {
                padding: '0 15px',
                height: '40px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Grid>
      <Grid item sx={{ ml: 'auto' }}>
        <Button
          variant='contained'
          onClick={handleAddRecipe}
          className={styles.addRecipeButton}
          data-testid='addRecipeNavButton'
        >
          Add Recipe
        </Button>
      </Grid>
    </Grid>
  );
};
