import {createRootRoute, Link, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {Separator} from "@/ui/components/ui/separator.tsx";

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" search={{filter: 'ALL'}} className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
            </div>
            <Separator/>
            <div className="mx-auto container">
                <Outlet/>
            </div>
            <TanStackRouterDevtools/>
        </>
    ),
})