import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client, Pool } from 'pg';
import { DrizzlePGConfig } from './node-postgres.interface';
@Injectable()
export class DrizzlePGService {
  public async getDrizzle(options: DrizzlePGConfig) {
    if (options.pg.connection === 'client') {
      const client = new Client(options.pg.config);
      await client.connect();
      return drizzle(client, options?.config);
    }
    const pool = new Pool(options.pg.config);
    return drizzle(pool, options?.config);
  }
}
