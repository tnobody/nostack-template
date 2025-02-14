import type {CreateHTTPContextOptions} from '@trpc/server/adapters/standalone';

export  type Todo = {
    title: string, done: boolean
}

const todoRepository: Array<Todo> = [
    {title: 'Download NoStack Template', done: true},
    {title: 'Start your Project', done: false},
]

export const createTrpcContext = async (opts: CreateHTTPContextOptions) => {
    return ({
        todoRepository,
        ...opts
    })
}

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;
