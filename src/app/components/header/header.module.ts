import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SearchModule } from '../search/search.module';
import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, HeaderLoginComponent],
  exports: [HeaderComponent],
  imports: [SearchModule, CommonModule, RouterLink, RouterLinkActive],
})
export class HeaderModule {}
