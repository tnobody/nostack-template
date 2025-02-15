import 'dotenv/config';
import {drizzle} from 'drizzle-orm/libsql';
import {fail} from "@/ui/lib/fail.ts";

export const db = drizzle(process.env.DATABASE_URL ?? fail('DATABASE_URL not set'));