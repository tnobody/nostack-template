import {createHTTPServer} from '@trpc/server/adapters/standalone';
import {createTrpcContext} from './api/setup/context';
import {appRouter} from "@/server/api";

createHTTPServer({
    router: appRouter,
    createContext: createTrpcContext,
    basePath: '/api/'
}).listen(2022);
