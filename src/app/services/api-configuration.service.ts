import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG_CACHE_KEY } from 'src/api-info';
import { ConfigurationResponse } from '../types/api-configuration';
import { LocalStorageService } from './local-storage.service';

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

  public loadConfig(): void {
    if (this.cachedConfig) {
      this.config = this.cachedConfig;
    } else {
      this.requestConfig();
    }
  }

  private cacheKey = CONFIG_CACHE_KEY;
  private cachedConfig = this.localStorageService.getItem(this.cacheKey);
  private config?: ConfigurationResponse;

  private requestConfig(): void {
    this.http
      .get<ConfigurationResponse>('/api/configuration')
      .subscribe(data => {
        this.saveConfig(data);
      });
  }

  private saveConfig(newConfig: ConfigurationResponse): void {
    this.config = newConfig;

    this.localStorageService.setItem(this.cacheKey, {
      data: newConfig,
      timestamp: Date.now().toString(),
    });
  }
}
