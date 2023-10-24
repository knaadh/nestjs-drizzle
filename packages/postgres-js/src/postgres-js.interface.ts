import { DrizzleConfig } from 'drizzle-orm';
import { Options, PostgresType } from 'postgres';

export interface DrizzlePostgresConfig {
  postgres: {
    url: string;
    config?: Options<Record<string, PostgresType<any>>> | undefined;
  };
  config?: DrizzleConfig<any> | undefined;
}
