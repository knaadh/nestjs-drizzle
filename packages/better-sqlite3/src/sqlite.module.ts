import { Global, DynamicModule } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './sqlite.definition';
import { DrizzleBetterSQLiteService } from './sqlite.service';
import { DrizzleBetterSQLiteConfig } from './sqlite.interface';

@Global()
export class DrizzleBetterSQLiteModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzleBetterSQLiteService,
        {
          provide: options?.tag || 'default',
          useFactory: async (drizzleService: DrizzleBetterSQLiteService) => {
            return await drizzleService.getDrizzle(options);
          },
          inject: [DrizzleBetterSQLiteService],
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
        DrizzleBetterSQLiteService,
        {
          provide: options?.tag || 'default',
          useFactory: async (
            drizzleService: DrizzleBetterSQLiteService,
            config: DrizzleBetterSQLiteConfig
          ) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DrizzleBetterSQLiteService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
}
