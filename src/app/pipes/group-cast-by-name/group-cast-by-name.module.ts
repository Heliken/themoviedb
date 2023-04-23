import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCastByNamePipe } from './group-cast-by-name.pipe';

@NgModule({
  declarations: [GroupCastByNamePipe],
  exports: [GroupCastByNamePipe],
  imports: [CommonModule],
})
export class GroupCastByNameModule {}
