import { Global, DynamicModule } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './postgres-js.definition';
import { DrizzlePostgresService } from './postgres-js.service';
import { DrizzlePostgresConfig } from './postgres-js.interface';

@Global()
export class DrizzlePostgresModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzlePostgresService,
        {
          provide: options?.tag || 'default',
          useFactory: async (drizzleService: DrizzlePostgresService) => {
            return await drizzleService.getDrizzle(options);
          },
          inject: [DrizzlePostgresService],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const {
      providers = [],
      exports = [],
      ...props
    } = super.registerAsync(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzlePostgresService,
        {
          provide: options?.tag || 'default',
          useFactory: async (
            drizzleService: DrizzlePostgresService,
            config: DrizzlePostgresConfig
          ) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DrizzlePostgresService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
}
