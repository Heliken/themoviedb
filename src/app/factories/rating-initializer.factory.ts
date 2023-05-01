import { of } from 'rxjs';
import { RatingService } from '../services/rating.service';
import { UserInfoService } from '../services/user-info.service';

export const ratingInitializerFactory =
  (ratingService: RatingService, userInfo: UserInfoService) => () => {
    const sessionId = userInfo.getSessionId();
    if (sessionId) {
      return ratingService.requestRatedMoviesAndTvShows(sessionId);
    } else {
      return of(null);
    }
  };
