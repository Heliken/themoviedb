export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
  Person = 'person',
}

export type CanBeRatedMediaType = MediaType.Movie | MediaType.Tv;
