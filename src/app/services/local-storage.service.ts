import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_EXPIRATION_TIME } from 'src/api-info';

interface LocalStorageData<T> {
  timestamp: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T> {
  public getItem(key: string): T | undefined {
    const stringValue = localStorage.getItem(key);

    if (stringValue) {
      const { timestamp, data } = JSON.parse(stringValue);
      const isExpired = this.checkExpiration(timestamp);

      if (isExpired) {
        this.removeItem(key);
        return undefined;
      } else {
        return data;
      }
    } else {
      return undefined;
    }
  }

  public setItem(key: string, value: LocalStorageData<T>): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  private currentTime = Date.now();

  private removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  private checkExpiration(timestamp: string): boolean {
    return (
      this.currentTime - parseInt(timestamp) > LOCAL_STORAGE_EXPIRATION_TIME
    );
  }
}
