import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { loginAction, loginGoogleAction } from "./features/auth/apis/auth.action";
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
                console.log("credentials", credentials)

                const loginData = await loginAction({
                    email: credentials.email,
                    password: credentials.password,
                    remember: false,
                });

                console.log("loginData", loginData);

                return {
                    id: loginData.payload.user.email,
                    user: loginData.payload.user,
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
        jwt: async ({ token, user, account }) => {
            if (user) {
                token.token = user.token;
                token.user = user.user;
            }
            if (account?.provider === "google") {
                console.log(account)
                console.log(account.access_token)
                const googleData = await loginGoogleAction(account.id_token!)

                console.log("DATA : ", googleData)
            }

            return token;
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