import { Toaster } from "@/shared/components/ui/sonner"
import ReactQueryProvider from "./_components/react-query.provider"
import { ThemeProvider } from "./_components/theme-provider"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>
            <ReactQueryProvider>
                <Toaster richColors position="top-right" />
                {children}
            </ReactQueryProvider>
        </ThemeProvider>
    )
}