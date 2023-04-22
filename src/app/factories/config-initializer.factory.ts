import { ApiConfigurationService } from '../services/api-configuration.service';

export const configInitializerFactory =
  (apiConfigService: ApiConfigurationService) => () =>
    apiConfigService.loadConfig();
