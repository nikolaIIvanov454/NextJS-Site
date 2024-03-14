import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import argon2 from 'argon2';

export const authOptions = {
    next_secret_key: process.env.NEXTAUTH_SECRET_KEY,
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY
    })],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };