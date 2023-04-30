import { Injectable } from '@angular/core';

interface LocalStorageData<T> {
  expires?: string;
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
        const { data, expires } = JSON.parse(stringValue);
        if (expires) {
          const isExpired = this.checkExpiration(expires);
          if (isExpired) {
            this.removeItem(key);
            return undefined;
          }
        }
        return data;
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

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  private checkExpiration(expires: string): boolean {
    return Date.now() - parseInt(expires) > 0;
  }
}
