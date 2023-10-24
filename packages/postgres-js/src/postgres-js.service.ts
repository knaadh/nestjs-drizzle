import { Injectable } from '@nestjs/common';
import postgres from 'postgres';
import { DrizzlePostgresConfig } from './postgres-js.interface';
import { drizzle } from 'drizzle-orm/postgres-js';

@Injectable()
export class DrizzlePostgresService {
  public getDrizzle(options: DrizzlePostgresConfig) {
    const client = postgres(options.postgres.url, options.postgres.config);
    return drizzle(client, options?.config);
  }
}
