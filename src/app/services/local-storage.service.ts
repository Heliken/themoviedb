import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_EXPIRATION_TIME } from 'src/api-info';

// todo: find a solution to remove any, probably with generics
interface LocalStorageData {
  timestamp: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public getItem(key: string): LocalStorageData['data'] {
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

  public setItem(key: string, value: LocalStorageData): void {
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
