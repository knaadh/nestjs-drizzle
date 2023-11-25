import { Config } from '@planetscale/database';
import { DrizzleConfig } from 'drizzle-orm';

export interface DrizzlePlanetScaleConfig {
  planetscale: {
    config: Config;
  };
  config?: DrizzleConfig<any> | undefined;
}
