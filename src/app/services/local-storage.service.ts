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
      try {
        const { timestamp, data } = JSON.parse(stringValue);
        const isExpired = this.checkExpiration(timestamp);

        if (isExpired) {
          this.removeItem(key);
          return undefined;
        } else {
          return data;
        }
      } catch (error) {
        console.log(
          'Error parsing stored data, requesting new from API:',
          error
        );
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  public setItem(key: string, value: LocalStorageData<T>): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  private removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  private checkExpiration(timestamp: string): boolean {
    return Date.now() - parseInt(timestamp) > LOCAL_STORAGE_EXPIRATION_TIME;
  }
}
