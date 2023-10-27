<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
 <a href="https://nestjs.com/" target="blank">A NestJS</a> module for integrating  <a href="https://orm.drizzle.team" target="blank">Drizzle ORM </a> with <a href="https://github.com/porsager/postgres" target="blank">Node-Postgres</a> driver
</p>

<p align="center">
  <a href="https://nx.dev/" target="blank"><img src="https://img.shields.io/badge/built%20with-Nx-orange?style=for-the-badge" alt="Nrwl Nx" /></a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [License](#license)

## Installation

```bash
npm install @knaadh/nestjs-drizzle-pg drizzle-orm pg
```

## Usage

Import the DrizzlePGModule module and pass an `options` object to initialize it. You can pass `options` object using the usual methods for [custom providers](https://docs.nestjs.com/fundamentals/custom-providers) as shown below:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as schema from '../db/schema';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';

@Module({
  imports: [
    // Method #1: Pass options object
    DrizzlePGModule.register({
      tag: 'DB_DEV',
      pg: {
        connection: 'client',
        config: {
          connectionString: 'postgres://postgres:@127.0.0.1:5432/drizzleDB',
        },
      },
      config: { schema: { ...schema } },
    }),

    // Method #2: useFactory()
    DrizzlePGModule.registerAsync({
      tag: 'DB_PROD',
      useFactory() {
        return {
          pg: {
            connection: 'client',
            config: {
              connectionString: 'postgres://postgres:@127.0.0.1:5432/drizzleDB',
            },
          },
          config: { schema: { ...schema } },
        };
      },
    }),

    // Method #3: useClass()
    DrizzlePGModule.registerAsync({
      tag: 'DB_STAGING',
      useClass: DBConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```typescript
export class DBConfigService {
  create = () => {
    return {
      pg: {
        connection: 'client' as const,
        config: {
          connectionString: 'postgres://postgres:@127.0.0.1:5432/drizzleDB',
        },
      },
      config: { schema: { ...schema } },
    };
  };
}
```
You can inject the Drizzle instances using their respective `tag` specified in the configurations

```typescript
import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../db/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
@Injectable()
export class AppService {
  constructor(
    @Inject('DB_DEV') private drizzleDev: NodePgDatabase<typeof schema>,
    @Inject('DB_PROD') private drizzleProd: NodePgDatabase<typeof schema>
  ) {}
  async getData() {
    const books = await this.drizzleDev.query.books.findMany();
    const authors = await this.drizzleProd.query.authors.findMany();
    return {
      books: books,
      authors: authors,
    };
  }
}
```

## Configuration

A DrizzlePGModule `option` object has the following interface:

```typescript
export interface DrizzlePGConfig {
  pg: {
    connection: 'client' | 'pool';
    config: ClientConfig | PoolConfig;
  };
  config?: DrizzleConfig<any> | undefined;
}
```

- `pg.connection:` single `client` connection or a `pool` as mentioned [here](https://orm.drizzle.team/docs/quick-postgresql/node-postgres)
- (optional) `postgres.config:` pass [client config](https://node-postgres.com/apis/client) or [pool config](https://node-postgres.com/apis/pool) according to the connection
- (optional) `config:` DrizzleORM configuration

## Documentation

- [NX](https://nx.dev/)
- [DrizzleORM](https://orm.drizzle.team/)
- [Node-PostGres](https://github.com/porsager/postgres)

## License

This package is [MIT licensed](LICENSE).
