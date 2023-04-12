import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { MovieTvDetailsComponent } from './pages/movie-tv-details/movie-tv-details.component';
import { detailedPageTypeGuard } from './guards/detailed-page-type.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainpageComponent,
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
