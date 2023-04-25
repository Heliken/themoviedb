import { SelectOption } from '../../../types/ui-types/select-option';
import { SortType } from '../types/sort-types';

export const sortTypeKeys = {
  [SortType.popularityAsc]: 'Least popular',
  [SortType.popularityDesc]: 'Most popular',
  [SortType.releaseDateAsc]: 'Oldest',
  [SortType.releaseDateDesc]: 'Newest',
  [SortType.voteAverageAsc]: 'Best rating',
  [SortType.voteAverageDesc]: 'Worst rating',
};

export const sortingOptions: SelectOption[] = Object.values(SortType).map(
  sortType => {
    return { value: sortType, key: sortTypeKeys[sortType] };
  }
);

export const defaultSortOption = SortType.popularityDesc;
