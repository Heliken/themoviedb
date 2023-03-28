import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationResponse } from '../types/api-configuration';
import {
  CONFIG_CACHE_KEY,
  CONFIG_EXPIRATION_TIME,
} from 'src/api-info';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigurationService {
  constructor(private http: HttpClient) {}

  public getStoredConfig():
    | ConfigurationResponse
    | undefined {
    // TODO: figure out if there better way how to deal with possible undefined;
    const storedConfig = localStorage.getItem(
      this.cacheKey
    );

    if (storedConfig) {
      return JSON.parse(storedConfig).config;
    }

    return undefined;
  }

  public loadConfig(): void {
    if (this.cachedConfig) {
      const { timestamp } = JSON.parse(this.cachedConfig);
      const configExpired =
        this.currentTime - timestamp >
        CONFIG_EXPIRATION_TIME;

      if (configExpired) {
        this.requestConfig();
      }
    } else {
      this.requestConfig();
    }
  }

  private cacheKey = CONFIG_CACHE_KEY;
  private cachedConfig = localStorage.getItem(
    this.cacheKey
  );
  private currentTime = Date.now();

  private requestConfig(): void {
    this.http
      .get<ConfigurationResponse>('/api/configuration')
      .subscribe((data) => {
        this.storeConfig(data);
      });
  }

  private storeConfig(
    newConfig: ConfigurationResponse
  ): void {
    localStorage.setItem(
      this.cacheKey,
      JSON.stringify({
        config: newConfig,
        timestamp: Date.now(),
      })
    );
  }
}
