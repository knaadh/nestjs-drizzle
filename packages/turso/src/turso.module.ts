import { Global, DynamicModule } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './turso.definition';
import { DrizzleTursoService } from './turso.service';
import { DrizzleTursoConfig } from './turso.interface';

@Global()
export class DrizzleTursoModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzleTursoService,
        {
          provide: options?.tag || 'default',
          useFactory: async (drizzleService: DrizzleTursoService) => {
            return await drizzleService.getDrizzle(options);
          },
          inject: [DrizzleTursoService],
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
        DrizzleTursoService,
        {
          provide: options?.tag || 'default',
          useFactory: async (
            drizzleService: DrizzleTursoService,
            config: DrizzleTursoConfig
          ) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DrizzleTursoService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
}
