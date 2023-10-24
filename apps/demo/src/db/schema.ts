import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const books = pgTable('Books', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});

export const authors = pgTable('Authors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});
