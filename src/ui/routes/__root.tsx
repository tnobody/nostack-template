import {createRootRoute, Link, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {Separator} from "@/ui/components/ui/separator.tsx";
import {ModeToggle} from "@/ui/components/ui/mode-toggle.tsx";
import {useAuth, useSession} from "@/ui/link.ts";
import {LogInIcon, LogOutIcon} from "lucide-react";

export const Route = createRootRoute({
    component: Root
})

function Root() {
    const {data: session} = useSession();
    const {signOut} = useAuth()
    return <>
        <div className="p-2 flex gap-4 justify-between items-center">
            <div className="flex gap-4">
                <Link to="/" className="[&.active]:font-bold">
                    <div className={'font-bold text-green-300'}>NoStack</div>
                </Link>{' '}
                {session && (
                <Link to="/todos" className="[&.active]:font-bold" search={{filter: 'ALL'}}>
                    Todos
                </Link>
                )}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
            </div>
            <div className="flex gap-2 items-center">
                {session ? (
                    <div className="flex gap-2 items-center">
                        <span className="text-muted">{session.user.email}</span>
                    <button className="cursor-pointer" onClick={() => signOut()}>
                        <LogOutIcon className={"h-4 w-4"}/>
                    </button>
                    </div>
                ) : (
                    <Link to="/signin" >
                        <LogInIcon className={"h-4 w-4"}/>
                    </Link>
                )}
                <ModeToggle/>
            </div>
        </div>
        <Separator/>
        <div className="mx-auto container p-6">
            <Outlet/>
        </div>
        <TanStackRouterDevtools/>
    </>
}