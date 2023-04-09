import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { MovieTvDetailsComponent } from './pages/movie-tv-details/movie-tv-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainpageComponent,
  },
  {
    path: 'movie',
    children: [
      {
        path: ':id',
        component: MovieTvDetailsComponent,
      },
    ],
  },
  {
    path: 'tv',
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
