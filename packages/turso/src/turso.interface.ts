import { Config } from '@libsql/client';
import { DrizzleConfig } from 'drizzle-orm';
export interface DrizzleTursoConfig {
  turso: {
    config: Config;
  };
  config?: DrizzleConfig<any> | undefined;
}
