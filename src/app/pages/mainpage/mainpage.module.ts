import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage.component';
import { MainpageSectionComponent } from './components/mainpage-section/mainpage-section.component';
import { UiCardsGridModule } from '../../components/ui-cards-grid/ui-cards-grid.module';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { LoginFormModule } from '../../components/login-form/login-form.module';
@NgModule({
  declarations: [MainpageComponent, MainpageSectionComponent],
  imports: [
    CommonModule,
    UiCardsGridModule,
    ToGridItemsModule,
    LoginFormModule,
  ],
})
export class MainpageModule {}
