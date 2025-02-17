import {createFileRoute} from '@tanstack/react-router'
import {cn} from "@/ui/lib/utils.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/ui/components/ui/card.tsx";
import {Label} from "@/ui/components/ui/label.tsx";
import {Input} from "@/ui/components/ui/input.tsx";
import {Button} from "@/ui/components/ui/button.tsx";
import {FormEvent, useState} from "react";
import {useAuth} from "@/ui/link.ts";

export const Route = createFileRoute('/signup')({
    component: RouteComponent,
})

function RouteComponent() {
    const {signUp} = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await signUp.email({
            email,
            name: email,
            password,
            callbackURL: '/?filter=ALL',
        })
    }


    return (
        <div className={cn("max-w-lg mx-auto flex flex-col gap-6")}>
            <Card>
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password"
                                       type="password"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       required/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Create Account
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/signin" className="underline underline-offset-4">
                                Sign In
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
