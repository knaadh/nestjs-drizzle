import { Global, DynamicModule } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './mysql.definition';
import { DrizzleMySqlService } from './mysql.service';
import { DrizzleMySqlConfig } from './mysql.interface';

@Global()
export class DrizzleMySqlModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzleMySqlService,
        {
          provide: options?.tag || 'default',
          useFactory: async (drizzleService: DrizzleMySqlService) => {
            return await drizzleService.getDrizzle(options);
          },
          inject: [DrizzleMySqlService],
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
        DrizzleMySqlService,
        {
          provide: options?.tag || 'default',
          useFactory: async (
            drizzleService: DrizzleMySqlService,
            config: DrizzleMySqlConfig
          ) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DrizzleMySqlService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
}
