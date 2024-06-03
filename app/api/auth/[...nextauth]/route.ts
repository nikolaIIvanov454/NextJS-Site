import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import argon2 from "argon2";
import connectMongo from "@/libs/mongoConfig";
import User from "@/models/UserSchema";
import { signOut } from "next-auth/react";

export const authOptions = {
  session: {
    strategy: "jwt" as const,
    jwt: {
      secret: process.env.JWT_SECRET,
      maxAge: 24 * 60 * 60,
    },
  },
  cookie: {
    name: "next-auth.session",
    options: {
      httpOnly: true,
      sameSite: "lax",
      // Setting maxAge to undefined or a short duration (e.g., 0) will make the cookie a session cookie,
      // which is deleted when the browser is closed
      maxAge: undefined, // or 0
    },
  },
  next_secret_key: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    }),
    CredentialsProvider({
      name: "email",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        username: {
          type: "text",
        },
        password: { label: "Password", type: "password" },
        remember: {
          label: "Remember Me",
          type: "checkbox",
        },
      },

      async authorize(credentials, req) {
        await connectMongo();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Login is unsuccessful.");
        } else {
          try {
            const passwordMatch = await argon2.verify(
              user.password,
              credentials.password
            );

            if (!passwordMatch) {
              throw new Error("Invalid password.");
            } else {
              return {
                id: user._id,
                email: user.email,
                name: credentials.username,
                rememberMe: credentials.remember,
              };
            }
          } catch (error) {
            console.error("An error occured:", error);
            throw error;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user) {

        token.maxAge = user.rememberMe ? 24 * 60 * 60 : 0;
        token.provider = account?.provider; 

        if (account) {
          token.provider = account.provider;
        }

        if (trigger === "update") {
          if (session.user) {
            token.name = session.user.name;
            token.email = session.user.email;
          }
        }

        if (user.rememberMe) {
          token.maxAge = 24 * 60 * 60; 
        } else {
          token.maxAge = 0;
        }
      }

      return {
        ...token,
        ...user,
      };
    },

    async session({ session, token, user }) {
      session.accessToken = token;

      if (session.accessToken.rememberMe === 'true') {
        session.accessToken.maxAge = 24 * 60 * 60;
      } else if(session.accessToken.rememberMe === 'false')  {
        session.accessToken.maxAge = 0;
      }

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
