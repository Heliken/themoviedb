import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
  imports: [CommonModule],
})
export class NotificationModule {}
