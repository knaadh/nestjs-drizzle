<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
 <a href="https://nestjs.com/" target="blank">A NestJS</a> module for integrating  <a href="https://orm.drizzle.team" target="blank">Drizzle ORM </a> with <a href="https://github.com/sidorares/node-mysql2" target="blank">MySQL2</a> driver
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
npm install @knaadh/nestjs-drizzle-mysql2 drizzle-orm mysql2
```

## Usage

Import the DrizzleMySqlModule module and pass an `options` object to initialize it. You can pass `options` object using the usual methods for [custom providers](https://docs.nestjs.com/fundamentals/custom-providers) as shown below:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as schema from '../db/schema';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';

@Module({
  imports: [
    // Method #1: Pass options object
    DrizzleMySqlModule.register({
      tag: 'DB_DEV',
      mysql: {
        connection: 'client',
        config: {
          host: '127.0.0.1',
          user: 'root',
          database: 'drizzleDB',
        },
      },
      config: { schema: { ...schema }, mode: 'default' },
    }),

    // Method #2: useFactory()
    DrizzleMySqlModule.register({
      tag: 'DB_PROD',
      mysql: {
        connection: 'client',
        config: {
          host: '127.0.0.1',
          user: 'root',
          database: 'drizzleDB',
        },
      },
      config: { schema: { ...schema }, mode: 'default' },
    }),

    // Method #3: useClass()
    DrizzleMySqlModule.register({
      tag: 'DB_STAGING',
      mysql: {
        connection: 'client',
        config: {
          host: '127.0.0.1',
          user: 'root',
          database: 'drizzleDB',
        },
      },
      config: { schema: { ...schema }, mode: 'default' },
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
      mysql: {
        connection: 'client',
        config: {
          host: '127.0.0.1',
          user: 'root',
          database: 'drizzleDB',
        },
      },
      config: { schema: { ...schema }, mode: 'default' },
    };
  };
}
```

You can inject the Drizzle instances using their respective `tag` specified in the configurations

```typescript
import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../db/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
@Injectable()
export class AppService {
  constructor(
    @Inject('DB_DEV') private drizzleDev: MySql2Database<typeof schema>,
    @Inject('DB_PROD') private drizzleProd: MySql2Database<typeof schema>
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

A DrizzleMySqlModule `option` object has the following interface:

```typescript
export interface DrizzleMySqlConfig {
  mysql: {
    connection: 'client' | 'pool';
    config: ConnectionOptions | PoolOptions | string;
  };
  config: MySql2DrizzleConfig<any> | undefined;
}
```

- `mysql.connection:` single `client` connection or a `pool` as mentioned [here](https://orm.drizzle.team/docs/quick-mysql/mysql2)
- (optional) `mysql.config:` pass [client config](https://github.com/sidorares/node-mysql2#installation) or [pool config](https://github.com/sidorares/node-mysql2#installation) according to the connection
- (required) `config:` DrizzleORM MySQL2 configuration. You need to specify mode as documented [here](https://orm.drizzle.team/docs/rqb#modes)

## Documentation

- [NX](https://nx.dev/)
- [DrizzleORM](https://orm.drizzle.team/)
- [MySQL2](https://github.com/sidorares/node-mysql2)

## License

This package is [MIT licensed](LICENSE).
