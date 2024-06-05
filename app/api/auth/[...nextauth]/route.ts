import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import argon2 from "argon2";
import connectMongo from "@/libs/mongoConfig";
import User from "@/models/UserSchema";

export const authOptions = {
  session: {
    strategy: "jwt" as const,
    jwt: {
      secret: process.env.JWT_SECRET,
      maxAge: 24 * 60 * 60,
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
                remember: credentials.remember,
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
        // token.user = user; // Merge user data into token
        token.provider = account?.provider;
        token.maxAge = user.remember ? 24 * 60 * 60 : 0;
      }

      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.email = session.user.email;
        token.picture = session.user.image;
      }

      return token;
    },

    async session({ session, token }) {
      // session.user = token.user; 
      session.accessToken = token;

      if (token.user?.remember) {
        session.maxAge = 24 * 60 * 60;
      } else {
        session.maxAge = 0;
      }

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
