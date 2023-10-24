import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2';
import { DrizzleMySqlConfig } from './mysql.interface';
import { drizzle } from 'drizzle-orm/mysql2';
@Injectable()
export class DrizzleMySqlService {
  public async getDrizzle(options: DrizzleMySqlConfig) {
    if (options.mysql.connection === 'client') {
      const client = await mysql.createConnection(options.mysql.config as any);
      return drizzle(client, options?.config);
    }
    const pool = mysql.createPool(options.mysql.config as any);
    return drizzle(pool, options?.config);
  }
}
