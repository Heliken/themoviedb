import { SelectOption } from '../../../types/ui-types/select-option';
import { SortType } from '../types/sort-types';

export const sortTypeKeys = {
  [SortType.popularityAsc]: 'Least popular',
  [SortType.popularityDesc]: 'Most popular',
  [SortType.releaseDateAsc]: 'Oldest',
  [SortType.releaseDateDesc]: 'Newest',
  [SortType.voteAverageAsc]: 'Worst rating',
  [SortType.voteAverageDesc]: 'Best rating',
};

export const sortingOptions: SelectOption[] = Object.values(SortType).map(
  sortType => {
    return { value: sortType, key: sortTypeKeys[sortType] };
  }
);

export const defaultSortOption = SortType.popularityDesc;

export const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];
