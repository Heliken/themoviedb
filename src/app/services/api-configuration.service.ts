import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG_CACHE_KEY, CONFIG_EXPIRATION_TIME } from 'src/api-info';
import { ConfigurationResponse } from '../types/api-configuration';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigurationService {
  constructor(private http: HttpClient) {}

  public getConfig(): ConfigurationResponse | undefined {
    return this.config;
  }

  public loadConfig(): void {
    if (this.cachedConfig) {
      const { timestamp, config } = JSON.parse(this.cachedConfig);
      const configExpired =
        this.currentTime - timestamp > CONFIG_EXPIRATION_TIME;

      if (configExpired) {
        this.requestConfig();
      } else {
        this.config = config;
      }
    } else {
      this.requestConfig();
    }
  }

  private cacheKey = CONFIG_CACHE_KEY;
  private cachedConfig = localStorage.getItem(this.cacheKey);
  private config?: ConfigurationResponse;
  private currentTime = Date.now();

  private requestConfig(): void {
    this.http
      .get<ConfigurationResponse>('/api/configuration')
      .subscribe(data => {
        this.saveConfig(data);
      });
  }

  private saveConfig(newConfig: ConfigurationResponse): void {
    this.config = newConfig;

    localStorage.setItem(
      this.cacheKey,
      JSON.stringify({
        config: newConfig,
        timestamp: Date.now(),
      })
    );
  }
}
