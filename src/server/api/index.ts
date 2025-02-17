import {protectedProcedure, publicProcedure, router} from './setup/trpc.ts';
import {z} from "zod";
import {todoTable} from "@/server/db/schema.ts";
import {eq} from "drizzle-orm";

export const appRouter = router({
    todoList: publicProcedure
        .input(z.union([z.literal('ALL'), z.literal('DONE'), z.literal('UNDONE')]))
        .query(async ({input, ctx: {db}}) => {
            const all = db.select().from(todoTable)
            const q = input === 'ALL' ? all : all.where(eq(todoTable.done, input === 'DONE' ? 1 : 0))
            return await q.all()
        }),
    addTodo: protectedProcedure
        .input(z.string())
        .mutation(async ({input, ctx: {db}}) => {
            await db.insert(todoTable).values({title: input, done: 0})
        }),
    updateTodo: protectedProcedure
        .input(z.object({id: z.number(), done: z.boolean()}))
        .mutation(async ({input, ctx: {db}}) => {
            await db.update(todoTable).set({done: input.done ? 1 : 0}).where(eq(todoTable.id, input.id))
        })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;