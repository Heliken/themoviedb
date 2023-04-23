import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay, tap } from 'rxjs';
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
    this.notificationsSubscription = this.notificationsService.notifications$
      .pipe(
        tap(notification => this.notifications.push(notification)),
        delay(this.notificationDelayTime),
        tap(() => this.notifications.shift())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.notificationsSubscription?.unsubscribe();
  }
}
