import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SearchModule } from '../search/search.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [SearchModule, RouterModule],
})
export class HeaderModule {}
