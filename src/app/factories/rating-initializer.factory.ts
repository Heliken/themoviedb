import { forkJoin, of } from 'rxjs';
import { GuestSessionService } from '../services/guest-session.service';
import { RatingService } from '../services/rating.service';

export const ratingInitializerFactory =
  (ratingService: RatingService, guestSessionService: GuestSessionService) =>
  () => {
    const sessionId = guestSessionService.getSessionId();
    if (sessionId) {
      return forkJoin([
        ratingService.requestRatedMovies(sessionId),
        ratingService.requestRatedTvShows(sessionId),
      ]);
    } else {
      return of(null);
    }
  };
