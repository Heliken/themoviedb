import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CustomNotification } from 'src/app/types/notification';

@Component({
  selector: 'mdb-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  constructor(private notificationsService: NotificationsService) {}

  public notifications: CustomNotification[] = [];
  public notificationsSubscription?: Subscription;

  private notificationDelayTime = 3000;

  ngOnInit(): void {
    this.notificationsSubscription =
      this.notificationsService.notifications$.subscribe(notification => {
        this.notifications.push(notification);

        setTimeout(() => {
          this.notifications.shift();
        }, this.notificationDelayTime);
      });
  }

  ngOnDestroy(): void {
    this.notificationsSubscription?.unsubscribe();
  }
}
