<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
 <a href="https://nestjs.com/" target="blank">A NestJS</a> module for integrating  <a href="https://orm.drizzle.team" target="blank">Drizzle ORM </a> with official <a href="https://github.com/planetscale/database-js" target="blank">PlanetScale</a> driver
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

## Compatibility

| Package Version | drizzle-orm Version |
| --------------- | ------------------- |
| 1.3.x           | ≥0.3.0              |
| ≤1.2.x          | <0.3.0              |

## Installation

```bash
npm install @knaadh/nestjs-drizzle-planetscale drizzle-orm @planetscale/database
```

## Usage

Import the DrizzlePlanetScaleModule module and pass an `options` object to initialize it. You can pass `options` object using the usual methods for [custom providers](https://docs.nestjs.com/fundamentals/custom-providers) as shown below:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as schema from '../db/schema';
import { DrizzlePlanetScaleModule } from '@knaadh/nestjs-drizzle-planetscale';

@Module({
  imports: [
    // Method #1: Pass options object
    DrizzlePlanetScaleModule.register({
      tag: 'DB_DEV',
      planetscale: {
        config: {
          username: 'PLANETSCALE_USERNAME',
          password: 'PLANETSCALE_PASSWORD',
          host: 'PLANETSCALE_HOST',
        },
      },
      config: { schema: { ...schema } },
    }),

    // Method #2: useFactory()
    DrizzlePlanetScaleModule.registerAsync({
      tag: 'DB_PROD',
      useFactory() {
        return {
          planetscale: {
            config: {
              username: 'PLANETSCALE_USERNAME',
              password: 'PLANETSCALE_PASSWORD',
              host: 'PLANETSCALE_HOST',
            },
          },
          config: { schema: { ...schema } },
        };
      },
    }),

    // Method #3: useClass()
    DrizzlePlanetScaleModule.registerAsync({
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
      planetscale: {
        config: {
          username: 'PLANETSCALE_USERNAME',
          password: 'PLANETSCALE_PASSWORD',
          host: 'PLANETSCALE_HOST',
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
import { PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless';
@Injectable()
export class AppService {
  constructor(@Inject('DB_DEV') private drizzleDev: PlanetScaleDatabase<typeof schema>, @Inject('DB_PROD') private drizzleProd: PlanetScaleDatabase<typeof schema>) {}
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

A DrizzlePlanetScaleModule `option` object has the following interface:

```typescript
export interface DrizzlePlanetScaleConfig {
  planetscale: {
    config: Config;
  };
  config?: DrizzleConfig<any> | undefined;
}
```

- `planetscale.config:` PlanetScale [config](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)
- (optional) `config:` DrizzleORM configuration

## Documentation

- [NX](https://nx.dev/)
- [DrizzleORM](https://orm.drizzle.team/)
- [PlanetScale](https://planetscale.com/docs/tutorials/planetscale-serverless-driver)

## License

This package is [MIT licensed](https://github.com/knaadh/nestjs-drizzle/blob/main/LICENSE).
