import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { MovieTvDetailsComponent } from './pages/movie-tv-details/movie-tv-details.component';
import { detailedPageTypeGuard } from './guards/detailed-page-type.guard';
import { TvDetailsComponent } from './pages/tv-details/tv-details.component';

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
      },
    ],
  },
  {
    path: ':detailedPageType',
    canActivate: [detailedPageTypeGuard],
    children: [
      {
        path: ':id',
        component: MovieTvDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
