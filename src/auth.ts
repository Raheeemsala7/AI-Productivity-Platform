import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { loginAction } from "./features/auth/apis/auth.action";
import { sessionMaxAge } from "./shared/constant/session.constant";
import GoogleProvider from "next-auth/providers/google";



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
                    id: loginData.payload.user.email,
                    name: loginData.payload.user.name,
                    email: loginData.payload.user.email,
                    token: loginData.payload.access_token,
                };

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
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