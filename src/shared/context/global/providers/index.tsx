import { Toaster } from "sonner"
import NextAuthProvider from "./_components/next-auth-provider"
import { NextIntlClientProvider } from "next-intl"


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>

            <Toaster richColors position="top-right" />
            {children}

        </>
        // <>
        // // <ReactQueryProvider>
        // // <NextAuthProvider>
        //     // <NextIntlClientProvider>
        //         <Toaster richColors position="top-right" />
        //         {children}
        //     // </NextIntlClientProvider>
        // // </NextAuthProvider>
        // // </ReactQueryProvider>
        // </>
    )
}