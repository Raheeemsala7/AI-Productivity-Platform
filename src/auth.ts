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
                if (!credentials) {
                    return null;
                }
                const loginData = await loginAction({
                    email: credentials.email,
                    password: credentials.password,
                    remember: false
                });
                return {
                    id: loginData.access_token,
                    token: loginData.access_token,
                    user: {
                        "name": "Kareem",
                        "email": "karemmustafa20@gmail.com",
                    },
                }
            }
        })
    ],

    callbacks: {
        jwt: async ({ token, user }) => {

            if (user) {
                token.token = user.token
                token.user = user.user
            }
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            session.token = token.token

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
        signIn: '/login',
        error: '/login',
    },
}