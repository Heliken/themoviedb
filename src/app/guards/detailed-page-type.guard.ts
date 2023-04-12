import { ActivatedRouteSnapshot } from '@angular/router';
import { MediaType } from '../types/media-type';

export const detailedPageTypeGuard = (route: ActivatedRouteSnapshot) => {
  return (
    route.params['detailedPageType'] === MediaType.Movie ||
    route.params['detailedPageType'] === MediaType.Tv
  );
};
