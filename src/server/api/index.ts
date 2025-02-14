import {publicProcedure, router} from './setup/trpc.ts';
import {z} from "zod";

export const appRouter = router({
    todoList: publicProcedure
        .input(z.union([z.literal('ALL'), z.literal('DONE'), z.literal('UNDONE')]))
        .query(async ({input, ctx}) => {
            return ctx.todoRepository.filter(({done}) => {
                switch (input) {
                    case 'ALL':
                        return true;
                    case 'DONE':
                        return done;
                    case 'UNDONE':
                        return !done;
                }
            })
        }),
    addTodo: publicProcedure
        .input(z.string())
        .mutation(async ({input, ctx}) => {
            return ctx.todoRepository.push({title: input, done: false})
        }),
    updateTodo: publicProcedure
        .input(z.object({index: z.number(), done: z.boolean()}))
        .mutation(async ({input, ctx}) => {
            ctx.todoRepository[input.index].done = input.done;
            return ctx.todoRepository[input.index];
        })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;