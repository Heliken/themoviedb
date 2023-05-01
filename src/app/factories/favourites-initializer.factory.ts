import { of } from 'rxjs';
import { UserInfoService } from '../services/user-info.service';
import { FavouritesService } from '../services/favourites.service';

export const favouritesInitializerFactory =
  (favouritesService: FavouritesService, userInfo: UserInfoService) => () => {
    const sessionId = userInfo.getSessionId();
    if (sessionId) {
      return favouritesService.requestFavMoviesAndTvShows(sessionId);
    } else {
      return of(null);
    }
  };
