import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";

export * from './auth-schema.ts'

export const todoTable = sqliteTable("todo", {
    id: int().primaryKey({autoIncrement: true}),
    title: text().notNull(),
    done: int().notNull(),
});