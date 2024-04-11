import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      [x: string]: any;
      name: string;
      email: string;
      expires: string;
      accessToken: string;
    };
  }
}
