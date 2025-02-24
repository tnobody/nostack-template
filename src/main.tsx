import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createRouter} from '@tanstack/react-router'
import './ui/index.css'

// Import the generated route tree
import {routeTree} from './routeTree.gen'
import {ThemeProvider} from "@/ui/components/ui/theme-provider.tsx";
import {authClient, AuthContext, trpc, TrpcContext} from "@/ui/link.ts";

// Create a new router instance
const router = createRouter({routeTree})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <AuthContext.Provider value={authClient}>
                <TrpcContext.Provider value={trpc}>
                    <ThemeProvider defaultTheme="system" storageKey="user-app-theme">
                        <RouterProvider router={router}/>
                    </ThemeProvider>
                </TrpcContext.Provider>
            </AuthContext.Provider>
        </StrictMode>,
    )
}