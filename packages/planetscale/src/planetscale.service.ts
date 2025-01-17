import { Injectable } from '@nestjs/common';
import { Client } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { DrizzlePlanetScaleConfig } from './planetscale.interface';
@Injectable()
export class DrizzlePlanetScaleService {
  public async getDrizzle(options: DrizzlePlanetScaleConfig) {
    const client = new Client(options?.planetscale.config);
    return drizzle(client, options?.config || {});
  }
}
