import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { DrizzleBetterSQLiteConfig } from './sqlite.interface';
@Injectable()
export class DrizzleBetterSQLiteService {
  public async getDrizzle(options: DrizzleBetterSQLiteConfig) {
    const sqlite = new Database(
      options.sqlite3.filename,
      options.sqlite3.options
    );
    return drizzle(sqlite, options?.config);
  }
}
