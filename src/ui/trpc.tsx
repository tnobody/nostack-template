import {createTRPCClient, httpBatchLink} from '@trpc/client';
import {AppRouter} from "@/server/api";

export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${new URL(location.href).origin}/api`,
        }),
    ],
});

