import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';
import {fail} from "node:assert";

export default defineConfig({
    out: './drizzle',
    schema: './src/server/db/schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DATABASE_URL ?? fail('DATABASE_URL is not set'),
    },
});
