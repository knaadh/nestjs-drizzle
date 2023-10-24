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
