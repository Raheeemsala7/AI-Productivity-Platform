import { IUser } from "./user"


declare module "next-auth" {


  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    token: string;
    user: IUser
  }


  interface Session {
    user: IUser
    token: string;

  }
}



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: IUser;
    token: string;
  }
}