import { Toaster } from "@/shared/components/ui/sonner"
import ReactQueryProvider from "./_components/react-query.provider"
import { ThemeProvider } from "./_components/theme-provider"
import NextAuthProvider from "./_components/next-auth-provider"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <NextAuthProvider>
            <ThemeProvider>
                <ReactQueryProvider>
                    <Toaster richColors position="top-right" />
                    {children}
                </ReactQueryProvider>
            </ThemeProvider>
        </NextAuthProvider>
    )
}