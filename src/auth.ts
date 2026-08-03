import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { loginAction } from "./features/auth/apis/auth.action";
import { sessionMaxAge } from "./shared/constant/session.constant";



export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
                token: {},
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                const loginData = await loginAction({
                    email: credentials.email,
                    password: credentials.password,
                    remember: false,
                });

                console.log("loginData", loginData);

                return {
                    id: "2",
                    name: "Kareem",
                    email: "karemmustafa20@gmail.com",
                    token: loginData.access_token,
                };

            }
        })
    ],

    callbacks: {
        jwt: async ({ token, user }) => {

            if (user) {
                token.token = user.token
                // token.user = user.user
            }
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user

            return session
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: sessionMaxAge,
    },
    jwt: {
        maxAge: sessionMaxAge,
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
    },
}