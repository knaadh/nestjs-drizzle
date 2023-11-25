import { Global, DynamicModule } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './planetscale.definition';
import { DrizzlePlanetScaleService } from './planetscale.service';
import { DrizzlePlanetScaleConfig } from './planetscale.interface';

@Global()
export class DrizzlePlanetScaleModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzlePlanetScaleService,
        {
          provide: options?.tag || 'default',
          useFactory: async (drizzleService: DrizzlePlanetScaleService) => {
            return await drizzleService.getDrizzle(options);
          },
          inject: [DrizzlePlanetScaleService],
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
        DrizzlePlanetScaleService,
        {
          provide: options?.tag || 'default',
          useFactory: async (
            drizzleService: DrizzlePlanetScaleService,
            config: DrizzlePlanetScaleConfig
          ) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DrizzlePlanetScaleService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
}
