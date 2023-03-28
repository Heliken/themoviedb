import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainpageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
