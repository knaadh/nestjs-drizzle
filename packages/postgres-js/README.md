<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
 <a href="https://nestjs.com/" target="blank">A NestJS</a> module for integrating  <a href="https://orm.drizzle.team" target="blank">Drizzle ORM </a> with <a href="https://github.com/porsager/postgres" target="blank">PostgresJS</a> driver
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
npm install @knaadh/nestjs-drizzle-postgres drizzle-orm postgres
```

## Usage

Import the DrizzlePostgresModule module and pass an `options` object to initialize it. You can pass `options` object using the usual methods for [custom providers](https://docs.nestjs.com/fundamentals/custom-providers) as shown below:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

@Module({
  imports: [
    // Method #1: Pass options object
    DrizzlePostgresModule.register({
      tag: 'DB_DEV',
      postgres: {
        url: 'postgres://postgres:@127.0.0.1:5432/drizzleDB',
      },
      config: { schema: { ...schema } },
    }),

    // Method #2: useFactory()
    DrizzlePostgresModule.registerAsync({
      tag: 'DB_PROD',
      useFactory() {
        return {
          postgres: {
            url: 'postgres://postgres:@127.0.0.1:5432/drizzleDB',
          },
          config: { schema: { ...schema } },
        };
      },
    }),

    // Method #3: useClass()
     DrizzlePostgresModule.registerAsync({
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
      postgres: {
        url: 'postgres://postgres:@127.0.0.1:5432/drizzleDB',
      },
      config: { schema: { ...schema } },
    };
  };
}
```
You can inject the Drizzle instances using their respective `tag` specified in the configurations

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';
@Injectable()
export class AppService {
  constructor(
    @Inject('DB_DEV') private drizzleDev: PostgresJsDatabase<typeof schema>,
    @Inject('DB_PROD') private drizzleProd: PostgresJsDatabase<typeof schema>
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

A DrizzlePostgresModule `option` object has the following interface:

```typescript
export interface DrizzlePostgresConfig {
  postgres: {
    url: string;
    config?: Options<Record<string, PostgresType<any>>> | undefined;
  };
  config?: DrizzleConfig<any> | undefined;
}
```

- `postgres.url:` postgres url connection string
- (optional) `postgres.config:` Postgres.js driver [options](https://github.com/porsager/postgres#connection-details)
- (optional) `config:` DrizzleORM configuration

## Documentation

- [NX](https://nx.dev/)
- [DrizzleORM](https://orm.drizzle.team/)
- [PostgresJS](https://github.com/porsager/postgres)

## License

This package is [MIT licensed](LICENSE).
