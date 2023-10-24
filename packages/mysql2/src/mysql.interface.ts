import { MySql2DrizzleConfig } from 'drizzle-orm/mysql2';
import { ConnectionOptions, PoolOptions } from 'mysql2';
export interface DrizzleMySqlConfig {
  mysql: {
    connection: 'client' | 'pool';
    config: ConnectionOptions | PoolOptions | string;
  };
  config: MySql2DrizzleConfig<any> | undefined;
}
