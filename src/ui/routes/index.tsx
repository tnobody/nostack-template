import {createFileRoute, useRouter} from '@tanstack/react-router'
import {trpc} from "@/ui/trpc.tsx";
import {AppRouter} from "@/server/api";
import {inferProcedureInput} from "@trpc/server";
import {Filter, TodoCard} from "@/ui/components/TodoCard.tsx";
import {Todo} from "@/server/api/setup/context.ts";

type TodoListInput = inferProcedureInput<AppRouter['todoList']>;

export const Route = createFileRoute('/')({
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

    function handleFilterChange(filter: Filter) {
        navigate({search: {filter}})
    }

    async function handleDoneChange({todo, nextState}: { todo: Todo, nextState: boolean }) {
        await trpc.updateTodo.mutate({id: todo.id, done: nextState})
        router.invalidate();
    }

    async function handleNewTodo(title: string) {
        await trpc.addTodo.mutate(title)
        router.invalidate();
    }

    return (
        <div className="p-2">
            <TodoCard todos={todos}
                      filter={filter}
                      onFilterChange={handleFilterChange}
                      onDoneChange={handleDoneChange}
                      onNewTodo={handleNewTodo}
            />
        </div>
    )
}