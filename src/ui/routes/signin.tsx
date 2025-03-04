import {createFileRoute} from '@tanstack/react-router'
import {LoginForm} from "@/ui/components/login-form.tsx";
import {useAuth} from "@/ui/link.ts";
import {toast} from "sonner";

export const Route = createFileRoute('/signin')({
    component: RouteComponent,
})

function RouteComponent() {
    const {signIn} = useAuth()

    function handleLogin({email, password}: { email: string, password: string }) {
        signIn.email({
            email, password, callbackURL: '/',
        }, {
            onError: (ctx) => {
                // display the error message
                toast(ctx.error.message);
            },
        })

    }

    return <LoginForm onLogin={handleLogin}/>
}
