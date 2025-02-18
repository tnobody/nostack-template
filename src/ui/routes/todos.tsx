import {createFileRoute, useRouter} from '@tanstack/react-router'
import {AppRouter} from "@/server/api";
import {inferProcedureInput} from "@trpc/server";
import {Filter, TodoCard} from "@/ui/components/TodoCard.tsx";
import {Todo} from "@/server/api/setup/context.ts";
import {trpc} from "@/ui/link.ts";
import {toast} from "sonner";

type TodoListInput = inferProcedureInput<AppRouter['todoList']>;

export const Route = createFileRoute('/todos')({
    validateSearch(search) {
        if ('filter' in search && typeof search.filter === 'string' && ['ALL', 'DONE', 'UNDONE'].includes(search['filter'].toUpperCase())) {
            return {filter: search.filter as TodoListInput};
        } else {
            return {filter: 'ALL' as const};
        }
    },
    loaderDeps: (x) => x.search,
    loader({deps}) {
        return trpc.todoList.query(deps.filter)
    },
    component: Index,
})

function Index() {
    const todos = Route.useLoaderData()
    const {filter} = Route.useSearch()
    const router = useRouter();
    const navigate = Route.useNavigate()

    async function handleFilterChange(filter: Filter) {
        await navigate({search: {filter}})
    }

    async function handleDoneChange({todo, nextState}: { todo: Todo, nextState: boolean }) {
        try {
            await trpc.updateTodo.mutate({id: todo.id, done: nextState})
            router.invalidate();
        } catch (error) {
            toast.error('Unauthorized', {
                description: 'Login required for this action',
                action: {
                    label: 'Sign in',
                    onClick: () => router.navigate({to: '/signin'})
                },
            })
        }
    }

    async function handleNewTodo(title: string) {
        await trpc.addTodo.mutate(title)
        router.invalidate();
    }

    return (
        <TodoCard todos={todos}
                  filter={filter}
                  onFilterChange={handleFilterChange}
                  onDoneChange={handleDoneChange}
                  onNewTodo={handleNewTodo}
        />
    )
}