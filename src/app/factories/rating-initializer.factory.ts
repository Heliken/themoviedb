import { forkJoin, of } from 'rxjs';
import { RatingService } from '../services/rating.service';
import { UserInfoService } from '../services/user-info.service';

export const ratingInitializerFactory =
  (ratingService: RatingService, userInfo: UserInfoService) => () => {
    const sessionId = userInfo.getSessionId();
    if (sessionId) {
      return forkJoin([
        ratingService.requestRatedMovies(sessionId),
        ratingService.requestRatedTvShows(sessionId),
      ]);
    } else {
      return of(null);
    }
  };
