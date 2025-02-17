import type {CreateHTTPContextOptions} from '@trpc/server/adapters/standalone';
import {db} from "@/server/db";
import {todoTable} from '../../db/schema.ts'
import {auth} from "@/server/auth.ts";

export  type Todo = typeof todoTable.$inferSelect

export const createTrpcContext = async (opts: CreateHTTPContextOptions) => {
    const hinit = Object.entries(opts.req.headers)
        .flatMap(([n, vals]): [string, string][] => (Array.isArray(vals) ? vals : [vals]).map(v => [n, v ?? '']))
    const headers = new Headers(hinit)
    const session = await auth.api.getSession({
        headers
    })

    return ({
        db: db,
        auth: auth,
        session,
        ...opts
    })
}

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;
