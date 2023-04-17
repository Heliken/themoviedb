import { MediaType } from './media-type';
import { MovieTvRated } from './movie';

export interface GuestSession {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface StoredGuestSession {
  id: string;
  rated: StoredGuestSessionRatedData;
}

export interface StoredGuestSessionRatedData {
  [MediaType.Movie]: MovieTvRated[];
  [MediaType.Tv]: MovieTvRated[];
}
