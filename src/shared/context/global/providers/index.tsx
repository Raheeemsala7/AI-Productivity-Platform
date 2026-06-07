import { Toaster } from "sonner"
import NextAuthProvider from "./_components/next-auth-provider"


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        // <ReactQueryProvider>
            <NextAuthProvider>
                <Toaster richColors position="top-right" />
                {children}
            </NextAuthProvider>
        // </ReactQueryProvider>
    )
}