import {createTRPCClient, httpBatchLink} from '@trpc/client';
import {createAuthClient} from "better-auth/react"
import {AppRouter} from "@/server/api";
import {createContext, useContext} from "react";
import {fail} from "@/ui/lib/fail.ts";

const currentLocation = `${new URL(location.href).origin}`;

export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${currentLocation}/api`,
        }),
    ],
});


export const TrpcContext = createContext<typeof trpc | null>(null)
export const useTrpc = () => useContext(TrpcContext) ?? fail('TrpcContext not Provided')


export const authClient = createAuthClient({
    baseURL: currentLocation,
})

export const AuthContext = createContext<typeof authClient | null>(null)
export const useAuth = () => useContext(AuthContext) ?? fail('AuthContext not Provided')
export const {useSession} = authClient