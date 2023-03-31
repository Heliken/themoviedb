export interface Movie {
  id: number;
  poster: string | null;
  title: string;
  releaseDate?: Date;
  rating?: number;
}
