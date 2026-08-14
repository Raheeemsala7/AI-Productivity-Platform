import { DefaultSession } from "next-auth";
import { User as IUser } from "./auth";

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    token: string;
    user: IUser;

  }


  interface Session {
    user: IUser
  }

}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: IUser
    token: string;
  }
}