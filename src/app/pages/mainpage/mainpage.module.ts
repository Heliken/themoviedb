import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage.component';
import { MainpageSectionComponent } from './components/mainpage-section/mainpage-section.component';
import { UiCardsGridModule } from '../../components/ui-cards-grid/ui-cards-grid.module';
@NgModule({
  declarations: [MainpageComponent, MainpageSectionComponent],
  imports: [CommonModule, UiCardsGridModule],
})
export class MainpageModule {}
