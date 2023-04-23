import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { TvDetailsComponent } from './pages/tv-details/tv-details.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { CastPageComponent } from './pages/cast-page/cast-page.component';
import { MediaType } from './types/media-type';
import { CastPageRouteData } from './types/cast-page-route-data';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainpageComponent,
  },
  {
    path: 'tv',
    children: [
      {
        path: ':id',
        component: TvDetailsComponent,
        pathMatch: 'full',
      },
      {
        path: ':id/cast',
        component: CastPageComponent,
        data: {
          mediaType: MediaType.Tv,
        } as CastPageRouteData,
      },
    ],
  },
  {
    path: 'movie',
    children: [
      {
        path: ':id',
        component: MovieDetailsComponent,
        pathMatch: 'full',
      },
      {
        path: ':id/cast',
        component: CastPageComponent,
        data: {
          mediaType: MediaType.Movie,
        } as CastPageRouteData,
      },
    ],
  },
  {
    path: 'person',
    children: [
      {
        path: ':id',
        component: PersonDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
