export interface MediaListResponse<ResponseType> {
    page: number;
    results:  ResponseType[];
    totalPages: number;
    totalResults: number;
}