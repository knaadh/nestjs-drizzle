import { Injectable } from '@nestjs/common';
import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { DrizzlePlanetScaleConfig } from './planetscale.interface';
@Injectable()
export class DrizzlePlanetScaleService {
  public async getDrizzle(options: DrizzlePlanetScaleConfig) {
    const connection = connect(options?.planetscale.config);
    return drizzle(connection, options?.config);
  }
}
