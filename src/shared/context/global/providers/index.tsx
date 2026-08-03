import { Toaster } from "sonner"
import NextAuthProvider from "./_components/next-auth-provider"
import { NextIntlClientProvider } from "next-intl"
import ReactQueryProvider from "./_components/react-query.provider"


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ReactQueryProvider>
                <Toaster richColors position="top-right" />
                {children}
            </ReactQueryProvider>
        </>
    )
}