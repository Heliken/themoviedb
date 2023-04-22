import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [SearchModule],
})
export class HeaderModule {}
