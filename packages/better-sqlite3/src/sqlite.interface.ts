import * as Database from 'better-sqlite3';
import { DrizzleConfig } from 'drizzle-orm';
export interface DrizzleBetterSQLiteConfig {
  sqlite3: {
    filename: string | Buffer;
    options?: Database.Options | undefined;
  };
  config?: DrizzleConfig<any> | undefined;
}
