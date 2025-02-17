import {cn} from "@/ui/lib/utils"
import {Button} from "@/ui/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/ui/components/ui/card"
import {Input} from "@/ui/components/ui/input"
import {Label} from "@/ui/components/ui/label"
import {ComponentProps, FormEvent, useState} from "react";

export type LoginFormProps = {
    onLogin(credentials: { email: string, password: string }): void
}

export function LoginForm({
                              onLogin,
                              className,
                              ...props
                          }: LoginFormProps & ComponentProps<"div">) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onLogin({email, password})
    }

    return (
        <div className={cn("max-w-lg mx-auto flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
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
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password"
                                       type="password"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       required/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/signup" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
