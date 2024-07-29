import { getDb } from "@/drizzle/db";
import { users } from "@/drizzle/schema";

import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: 'email' },
        password: { label: "Password", type: 'password' },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) {
          throw new Error('Please provide both email and password');
        }

        const db = await getDb();
        const user = await db.select().from(users).where(eq(users.email, email));

        if (!user[0]) {
          throw new Error('Invalid Email');
        }
        const isMatched = await compare(password, user[0]?.password);
        if (!isMatched) {
          throw new Error('Password did not match');
        }

        const userData: User = {
          fullName: user[0].fullName,
          email: user[0].email,
          id: user[0].id.toString(), // Ensure id is a string
          role: user[0].role,
        };
        return userData;
      },
      // authorize: async (credentials:any) => {
      //   const email = credentials?.email as string | undefined;
      //   const password = credentials?.password as string | undefined;
      //   if (!email || !password) {
      //     throw new Error('Please provide both email and password')
      //   }

      //   const db = await getDb();
      //   const user = await db.select().from(users).where(eq(users.email, email))

      //   if (!user[0]) {
      //     throw new Error('Invalid Email')
      //   }
      //   const isMatched = await compare(password, user[0]?.password)
      //   console.log('this inside credintioal ', isMatched, password, user[0]?.password)
      //   if (password === user[0]?.password) {
      //     console.log('Password Match')
      //     const userData = {
      //       fullName: user[0].fullName,
      //       email: user[0].email,
      //       id: user[0].id,
      //       role: user[0].role,
      //     }
      //     return userData;
      //   } else if (!isMatched) {
      //     throw new Error('Password did not matched')
      //   }
      //   const userData = {
      //     fullName: user[0].fullName,
      //     email: user[0].email,
      //     id: user[0].id,
      //     role: user[0].role,
      //   }
      //   return userData;
      // },
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      console.log('user  token 1: ', token, user)
      if (user) {
        token.email = user.email;
        token.fullName = user.fullName;
        token.role = user.role;
        token.id = user.id; // Optionally include user ID
      }
      return token;
    },
    async session({ session, token }: any) {
      console.log('user  token 2:  ', token, session)
      session.user.email = token?.email as string;
      session.user.fullName = token?.fullName as string;
      session.user.role = token?.role as string;
      session.user.id = token?.id as string; // Optionally include user ID
      return session;
    },
  },

  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
