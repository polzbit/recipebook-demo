import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import styles from './Pagination.module.scss';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { VF } from '../../utils/types';

export interface PaginationProps {
  page: number;
  maxItems: number;
  numOfItems: number;
  handleNextClick: VF;
  handlePrevClick: VF;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { page, maxItems, numOfItems, handleNextClick, handlePrevClick } =
    props;

  const last = page * maxItems;
  const first = 1 + last - maxItems;

  return numOfItems ? (
    <Grid
      container
      className={styles.pagination}
      data-testid='pagination'
      alignItems='center'
      justifyContent='flex-end'
    >
      <Grid item xs={1.5}>
        <span>{`${first} - ${
          last > numOfItems ? numOfItems : last
        } of ${numOfItems}`}</span>
      </Grid>
      <Grid item xs={0.5}>
        <IconButton
          onClick={handlePrevClick}
          disabled={page < 2}
          data-testid='prevButton'
        >
          <NavigateBefore />
        </IconButton>
      </Grid>
      <Grid item xs={0.5}>
        <IconButton
          onClick={handleNextClick}
          disabled={last > numOfItems}
          data-testid='nextButton'
        >
          <NavigateNext />
        </IconButton>
      </Grid>
    </Grid>
  ) : null;
};
