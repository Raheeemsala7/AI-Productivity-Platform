import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { IApiResponse } from "./shared/types/api";



export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
                token: {},
                user: {}
            },
            authorize: async (credentials) => {

                const res = await fetch(`${process.env.API_URL}/auth/login`, {
                    method: "POST",
                    body: JSON.stringify({ username: credentials?.username, password: credentials?.password }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const data: IApiResponse<{}> = await res.json()
                console.log("data login", data)
                if (!data.status) {
                    throw Error(data.message)
                }

                const loginData = data.payload

                return {
                    id: loginData.user.id,
                    token: loginData.token,
                    user: loginData.user
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
    }
}