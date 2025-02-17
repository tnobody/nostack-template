import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {TanStackRouterVite} from '@tanstack/router-plugin/vite'

import * as path from "node:path";


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        TanStackRouterVite({
            routesDirectory: './src/ui/routes/',
            autoCodeSplitting: true
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:2022',
                changeOrigin: false,
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
