import 'dotenv/config';
import {createHTTPHandler} from '@trpc/server/adapters/standalone';
import {createTrpcContext} from './api/setup/context';
import {appRouter} from "@/server/api";
import * as http from "node:http";
import {toNodeHandler} from "better-auth/node";
import {auth} from "@/server/auth.ts";

const handleAuth = toNodeHandler(auth);
const handleTrpc = createHTTPHandler({
    router: appRouter,
    createContext: createTrpcContext,
    basePath: '/api/'
});
http.createServer(async (req, res) => {
    if (req.url?.startsWith('/api/auth')) {
        await handleAuth(req, res);
    } else if (req.url?.startsWith('/api')) {
        handleTrpc(req, res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'}).end();
    }
}).listen(2022);