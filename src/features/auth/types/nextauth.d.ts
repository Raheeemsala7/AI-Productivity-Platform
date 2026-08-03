import { UserData } from "@/src/features/auth/types/auth";

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */

    interface User {
        user: {
            name: string
            email: string
        };
        token: string;
    }

    interface Session {
        user: {
            name: string
            email: string
        };
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        user: {
            name: string
            email: string
        };
        token: string;
    }
}