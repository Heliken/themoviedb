import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomNotification } from '../types/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public notifications$ = new Subject<CustomNotification>();

  showNotification(notification: CustomNotification): void {
    this.notifications$.next(notification);
  }
}
