import { DrizzleConfig } from 'drizzle-orm';
import { ClientConfig, PoolConfig } from 'pg';
export interface DrizzlePGConfig {
  pg: {
    connection: 'client' | 'pool';
    config: ClientConfig | PoolConfig;
  };
  config?: DrizzleConfig<any> | undefined;
}
