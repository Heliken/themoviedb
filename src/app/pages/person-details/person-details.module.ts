import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailsComponent } from './person-details.component';

@NgModule({
  declarations: [PersonDetailsComponent],
  exports: [PersonDetailsComponent],
  imports: [CommonModule],
})
export class PersonDetailsModule {}
