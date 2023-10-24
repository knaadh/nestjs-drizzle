import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { DrizzleTursoConfig } from './turso.interface';
@Injectable()
export class DrizzleTursoService {
  public async getDrizzle(options: DrizzleTursoConfig) {
    const client = createClient(options.turso.config);
    return drizzle(client, options?.config);
  }
}
