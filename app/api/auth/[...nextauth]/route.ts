import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import argon2 from 'argon2';
import connectMongo from '@/libs/mongoConfig';
import User from '@/models/UserSchema';

export const authOptions = {
  session: {
    strategy: 'jwt' as const, // Set strategy as const
    jwt: {
      secret: process.env.JWT_SECRET,
      encryption: true // Optional: Enable encryption for added security
    }
  },
  next_secret_key: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    }),
    CredentialsProvider({
      name: 'Default',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        await connectMongo();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('Login is unsuccessful.'); // Reject the promise with an error
        } else {
          try {
            const passwordMatch = await argon2.verify(
              user.password,
              credentials.password
            );

            if (!passwordMatch) {
              throw new Error('Invalid password.'); // Reject the promise with an error
            } else {
              return { id: user.id, email: user.email, name: user.name }; // Return a User object
            }
          } catch (error) {
            console.error('An error occured:', error);
            throw error; // Reject the promise with the error
          }
        }
      },
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
