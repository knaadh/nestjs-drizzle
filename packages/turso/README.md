<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
 <a href="https://nestjs.com/" target="blank">A NestJS</a> module for integrating  <a href="https://orm.drizzle.team" target="blank">Drizzle ORM </a> with <a href="https://turso.tech" target="blank">Turso</a>
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
npm install @knaadh/nestjs-drizzle-turso drizzle-orm @libsql/client
```

## Usage

Import the DrizzleTursoModule module and pass an `options` object to initialize it. You can pass `options` object using the usual methods for [custom providers](https://docs.nestjs.com/fundamentals/custom-providers) as shown below:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as schema from '../db/schema';
import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';

@Module({
  imports: [
    // Method #1: Pass options object
    DrizzleTursoModule.register({
      tag: 'DB_DEV',
      turso: {
        config: {
          url: 'DATABASE_URL',
          authToken: 'DATABASE_AUTH_TOKEN',
        },
      },
      config: { schema: { ...schema } },
    }),

    // Method #2: useFactory()
    DrizzleTursoModule.register({
      tag: 'DB_PROD',
      turso: {
        config: {
          url: 'DATABASE_URL',
          authToken: 'DATABASE_AUTH_TOKEN',
        },
      },
      config: { schema: { ...schema } },
    }),

    // Method #3: useClass()
    DrizzleTursoModule.register({
      tag: 'DB_STAGING',
      turso: {
        config: {
          url: 'DATABASE_URL',
          authToken: 'DATABASE_AUTH_TOKEN',
        },
      },
      config: { schema: { ...schema } },
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
      turso: {
        config: {
          url: 'DATABASE_URL',
          authToken: 'DATABASE_AUTH_TOKEN',
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
import { LibSQLDatabase } from 'drizzle-orm/libsql';
@Injectable()
export class AppService {
  constructor(
    @Inject('DB_DEV') private drizzleDev: LibSQLDatabase<typeof schema>,
    @Inject('DB_PROD') private drizzleProd: LibSQLDatabase<typeof schema>
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

A DrizzleTursoModule `option` object has the following interface:

```typescript
export interface DrizzleTursoConfig {
  turso: {
    config: Config;
  };
  config?: DrizzleConfig<any> | undefined;
}
```

- `turso.config:` Turso [config](https://docs.turso.tech/libsql/client-access/javascript-typescript-sdk)
- (optional) `config:` DrizzleORM configuration.

## Documentation

- [NX](https://nx.dev/)
- [DrizzleORM](https://orm.drizzle.team/)
- [Turso](https://docs.turso.tech/)

## License

This package is [MIT licensed](LICENSE).
