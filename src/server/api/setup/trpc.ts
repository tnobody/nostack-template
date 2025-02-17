import {initTRPC, TRPCError} from '@trpc/server';
import {TrpcContext} from "@/server/api/setup/context.ts";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<TrpcContext>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(function isAuthed(opts) {
    if (!opts.ctx.session) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
        });
    }
    return opts.next({
        ctx: {
            session: opts.ctx.session
        }
    })
});