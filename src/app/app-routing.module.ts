import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
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
    path: 'movie',
    children: [
      {
        path: ':id',
        component: MovieDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
