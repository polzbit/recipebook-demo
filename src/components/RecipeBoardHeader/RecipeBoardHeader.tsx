import { FC } from 'react';
import {
  Grid,
  Button,
  Select,
  Tooltip,
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
  const currentCategoriesStr = currentCategories.join(', ');
  return (
    <Grid
      container
      className={styles.recipeBoardHeader}
      data-testid='recipeBoardHeader'
      alignItems='center'
      justifyContent='flex-start'
      spacing={2}
    >
      <Grid item sm={3.5} xs={4}>
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
              <Tooltip title={currentCategoriesStr} placement='top'>
                <span className={styles.selectPlaceholder}>
                  {currentCategories.length
                    ? currentCategoriesStr
                    : 'Pick a category'}
                </span>
              </Tooltip>
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
      <Grid item sm={3.5} xs={5}>
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
      <Grid item xs={1.5} sx={{ ml: 'auto', mr: '20px' }}>
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
