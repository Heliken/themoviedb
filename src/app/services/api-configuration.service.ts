import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG_CACHE_KEY } from 'src/api-info';
import { ConfigurationResponse } from '../types/api-configuration';
import { LocalStorageService } from './local-storage.service';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigurationService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService<ConfigurationResponse>
  ) {}

  public getConfig(): ConfigurationResponse | undefined {
    return this.config;
  }

  public loadConfig(): Observable<ConfigurationResponse | undefined> {
    if (this.cachedConfig) {
      this.config = this.cachedConfig;
      return of(this.config);
    } else {
      return this.requestConfig().pipe(tap(data => this.saveConfig(data)));
    }
  }

  private cacheKey = CONFIG_CACHE_KEY;
  private cachedConfig = this.localStorageService.getItem(this.cacheKey);
  private config?: ConfigurationResponse;

  private requestConfig(): Observable<ConfigurationResponse> {
    return this.http.get<ConfigurationResponse>('configuration');
  }

  private saveConfig(newConfig: ConfigurationResponse): void {
    this.config = newConfig;

    this.localStorageService.setItem(this.cacheKey, {
      data: newConfig,
      timestamp: Date.now().toString(),
    });
  }
}
