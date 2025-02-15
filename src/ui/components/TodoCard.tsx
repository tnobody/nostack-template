import type {Todo} from "@/server/api/setup/context.ts";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/ui/components/ui/card.tsx";
import {Input} from "@/ui/components/ui/input.tsx";
import {Button} from "@/ui/components/ui/button.tsx";
import {Separator} from "@/ui/components/ui/separator.tsx";
import {Checkbox} from "@/ui/components/ui/checkbox.tsx";
import {cn} from "@/ui/lib/utils.ts";
import {ToggleGroup, ToggleGroupItem} from "@/ui/components/ui/toggle-group.tsx";
import {useState} from "react";

export type Filter = 'ALL' | 'DONE' | 'UNDONE'
export type TodoCardProps = {
    todos: Todo[],
    filter: Filter
    onFilterChange: (filter: Filter) => void;
    onDoneChange: (e: { todo: Todo, nextState: boolean }) => void;
    onNewTodo: (text: string) => void
}

export const TodoCard = ({
                             filter = 'ALL',
                             todos,
                             onFilterChange,
                             onDoneChange,
                             onNewTodo
                         }: TodoCardProps) => {
    const [nextTodoText, setNextTodoText] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNewTodo(nextTodoText);
        setNextTodoText('')
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Todos</span>
                    <ToggleGroup onValueChange={onFilterChange} value={filter} type="single" size="sm"
                                 variant="outline">
                        <ToggleGroupItem value="ALL">ALL</ToggleGroupItem>
                        <ToggleGroupItem value="DONE">DONE</ToggleGroupItem>
                        <ToggleGroupItem value="UNDONE">UNDONE</ToggleGroupItem>
                    </ToggleGroup>
                </CardTitle>
            </CardHeader>
            <CardContent className={'px-0'}>
                <ul className={'flex flex-col gap-4'}>
                    <li>
                        <Separator/>
                    </li>
                    {todos.map((todo, i) => (
                        <>
                            <li className={'px-6 flex gap-4 items-center'}>
                                <Checkbox checked={Boolean(todo.done)}
                                          onCheckedChange={nextState => onDoneChange({
                                              todo, nextState: !!nextState
                                          })}
                                          id={"terms" + i}
                                          className=""
                                />
                                <label
                                    htmlFor={"terms" + i}
                                    className={cn(
                                        "flex-1 peer-has-checked:p-4",
                                        {'opacity-50': todo.done}
                                    )}
                                >
                                    {todo.title}
                                </label>
                            </li>
                            <Separator/>
                        </>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input value={nextTodoText}
                           onChange={e => setNextTodoText(e.target.value)}
                           type="text"
                           className="flex-1" placeholder="Whats next..."/>
                    <Button variant="secondary" type="submit">Add</Button>
                </form>
            </CardFooter>
        </Card>
    )
}