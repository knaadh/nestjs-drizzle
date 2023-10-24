<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
 <a href="https://nestjs.com/" target="blank">A NestJS</a> module for integrating  <a href="https://orm.drizzle.team" target="blank">Drizzle ORM </a> with <a href="https://github.com/WiseLibs/better-sqlite3" target="blank">Better-SQLite3</a> driver
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
npm install @knaadh/nestjs-drizzle-better-sqlite3 drizzle-orm better-sqlite3
```

## Usage

Import the DrizzleBetterSQLiteModule module and pass an `options` object to initialize it. You can pass `options` object using the usual methods for [custom providers](https://docs.nestjs.com/fundamentals/custom-providers) as shown below:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as schema from '../db/schema';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';

@Module({
  imports: [
    // Method #1: Pass options object
    DrizzleBetterSQLiteModule.register({
      tag: 'DB_DEV',
      sqlite3: {
        filename: 'demo.db',
      },
      config: { schema: { ...schema } },
    }),

    // Method #2: useFactory()
    DrizzleBetterSQLiteModule.register({
      tag: 'DB_PROD',
      sqlite3: {
        filename: 'demo.db',
      },
      config: { schema: { ...schema } },
    }),

    // Method #3: useClass()
    DrizzleBetterSQLiteModule.register({
      tag: 'DB_STAGING',
      sqlite3: {
        filename: 'demo.db',
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
      sqlite3: {
        filename: 'demo.db',
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
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
@Injectable()
export class AppService {
  constructor(
    @Inject('DB_DEV') private drizzleDev: BetterSQLite3Database<typeof schema>,
    @Inject('DB_PROD') private drizzleProd: BetterSQLite3Database<typeof schema>
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

A DrizzleBetterSQLiteModule `option` object has the following interface:

```typescript
export interface DrizzleBetterSQLiteConfig {
  sqlite3: {
    filename: string | Buffer;
    options?: Database.Options | undefined;
  };
  config?: DrizzleConfig<any> | undefined;
}
```

- `sqlite3.filename:` path to the database file. If the database file does not exist, it is created
- (optional) `sqlite3.options:` BetterSQLite [options](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#new-databasepath-options)
- (optional `config:` DrizzleORM configuration.

## Documentation

- [NX](https://nx.dev/)
- [DrizzleORM](https://orm.drizzle.team/)
- [Better-SQLit3](https://github.com/WiseLibs/better-sqlite3)

## License

This package is [MIT licensed](LICENSE).
