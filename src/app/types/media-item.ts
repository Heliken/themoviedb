export interface MediaItem {
    adult: boolean;
    backdropPath: string;
    firstAirDate?: Date;
    genreids: number[];
    id: number;
    mediaType: MediaType;
    name?: string;
    originalLanguage: string;
    originalName?: string;
    originalTitle?: string;
    overview: string;
    originCountry?: string[];
    popularity: number;
    posterPath: string;
    releaseDate?: Date;
    title?: string;
    video?: boolean;
    voteAverage: number;
    voteCount: number;
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
}
