import type {CreateHTTPContextOptions} from '@trpc/server/adapters/standalone';
import {db} from "@/server/db";
import {todoTable} from '../../db/schema.ts'

export  type Todo = typeof todoTable.$inferSelect

export const createTrpcContext = async (opts: CreateHTTPContextOptions) => {
    return ({
        db: db,
        ...opts
    })
}

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;
