import 'dotenv/config';
import {createHTTPHandler} from '@trpc/server/adapters/standalone';
import {createTrpcContext} from './api/setup/context';
import {appRouter} from "@/server/api";
import connect from 'connect'
import * as http from "node:http";
import {toNodeHandler} from "better-auth/node";
import {auth} from "@/server/auth.ts";

const app = connect();

app.use("/api/auth/", toNodeHandler(auth));

app.use('/api/', createHTTPHandler({
    router: appRouter,
    createContext: createTrpcContext,
}))


http.createServer(app).listen(2022);