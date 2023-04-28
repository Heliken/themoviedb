export interface DiscoverResponse<ResponseType> {
  page: number;
  results: ResponseType[];
  totalPages: number;
}
