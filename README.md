<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
 <a href="https://nestjs.com/" target="blank">A NestJS</a> module for integrating <a href="https://orm.drizzle.team" target="blank">Drizzle ORM
</p>

<p align="center">
  <a href="https://nx.dev/" target="blank"><img src="https://img.shields.io/badge/built%20with-Nx-orange?style=for-the-badge" alt="Nrwl Nx" /></a>
</p>

<p align="center">
<img alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/knaadh/nestjs-drizzle">
<img alt="NPM" src="https://img.shields.io/npm/l/%40knaadh%2Fnestjs-drizzle-postgres">
<img alt="Discord" src="https://img.shields.io/discord/1167090530841280593">
</p>


## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [License](#license)

## Installation

There is a separate module for each one of the major database drivers supported by the DrizzleORM. You can install them via your preferred package manager.

```bash
# PostgresJS
npm install @knaadh/nestjs-drizzle-postgres drizzle-orm postgres

# Node-Postgres
npm install @knaadh/nestjs-drizzle-pg drizzle-orm pg

# MySQL2
npm install @knaadh/nestjs-drizzle-mysql2 drizzle-orm mysql2

# Better-SQLite3
npm install @knaadh/nestjs-drizzle-better-sqlite3 drizzle-orm better-sqlite3

# Turso
npm install @knaadh/nestjs-drizzle-turso drizzle-orm @libsql/client

# PlanetScale
npm install @knaadh/nestjs-drizzle-planetscale drizzle-orm @planetscale/database
```

## Usage

Import the Drizzle module of the respective database driver and pass an `options` object to initialize it as shown in the example below:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as schema from '../db/schema';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
@Module({
  imports: [
    DrizzleBetterSQLiteModule.register({
      tag: 'DB_DEV',
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

You can inject the Drizzle instances using their respective `tag` specified in the configuration

```typescript
import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../db/schema';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
@Injectable()
export class AppService {
  constructor(
    @Inject('DB_DEV') private drizzleDev: LibSQLDatabase<typeof schema>
  ) {}
  async getData() {
    const books = await this.drizzleDev.query.books.findMany();
    const authors = await this.drizzleDev.query.authors.findMany();
    return {
      books: books,
      authors: authors,
    };
  }
}
```

In case you need the access to the underlying connection client for tasks such as connection termination or other operations, you must define the session property manually, as Drizzle does not currently expose it. In the following example, we demonstrate how to access the client to close all database connections when our NestJS application is terminated, using the `onApplicationShutdown` hook.

Note that the specific client type vary depending on the database driver being used, so adjust the type accordingly.

```typescript
import { MySql2Client, MySql2Database } from 'drizzle-orm/mysql2';

import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';

import * as schema from './schema/mysql';

export type ExtendedMySql2Database<T extends Record<string, unknown>> =
  MySql2Database<T> & {
    session: {
      client: MySql2Client;
    };
  };

@Injectable()
export class AppService implements OnApplicationShutdown {
  constructor(
    @Inject('DB')
    private drizzleProd: ExtendedMySql2Database<typeof schema>,
  ) {}

  async getHello() {
    const books = await this.drizzleProd.query.books.findMany();
    const authors = await this.drizzleProd.query.authors.findMany();
    return {
      books: books,
      authors: authors,
    };
  }
  
  async onApplicationShutdown() {
    await this.drizzleProd.session.client.end();
  }
}
```

You can read the detailed documentation of each of the module from the links given below

## Documentation

- [@knaadh/nestjs-drizzle-postgres](https://github.com/knaadh/nestjs-drizzle/blob/main/packages/postgres-js/README.md)
- [@knaadh/nestjs-drizzle-pg](https://github.com/knaadh/nestjs-drizzle/blob/main/packages/node-postgres/README.md)
- [@knaadh/nestjs-drizzle-mysql2](https://github.com/knaadh/nestjs-drizzle/blob/main/packages/mysql2/README.md)
- [@knaadh/nestjs-drizzle-better-sqlite3](https://github.com/knaadh/nestjs-drizzle/blob/main/packages/better-sqlite3/README.md)
- [@knaadh/nestjs-drizzle-turso](https://github.com/knaadh/nestjs-drizzle/blob/main/packages/turso/README.md)
- [@knaadh/nestjs-drizzle-planetscale](https://github.com/knaadh/nestjs-drizzle/blob/main/packages/planetscale/README.md)

## License

This package is [MIT licensed](LICENSE).
