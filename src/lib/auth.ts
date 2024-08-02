/* eslint-disable react-hooks/rules-of-hooks */
import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
// import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { getDb } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";


export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        // const dbUser = await prisma.user.findFirst({
        //   where: { email: credentials.email },
        // });
        const db = await getDb();
        const dbUser = await db.select().from(users).where(eq(users.email, credentials.email))

        if (!dbUser[0]) {
          throw new Error('Invalid Email');
        }
        // const isMatched = await compare(credentials.password, dbUser[0]?.password);
        // console.log('first password of email in credential  ',isMatched,credentials.password === dbUser[0].password, credentials.password, dbUser[0].password);
        // if(credentials.password !== dbUser[0].password){
        // if (!isMatched ) {
        //     throw new Error('Password did not match hash '); 
        //   }
        // }
        //Verify Password here
        //We are going to use a simple === operator
        //In production DB, passwords should be encrypted using something like bcrypt...
        console.log('dbUser[0].password === credentials.password   ', dbUser[0].password === credentials.password,dbUser[0].password , credentials.password)
        if (dbUser[0] && dbUser[0].password === credentials.password) {
          const { password, createdAt, ...dbUserWithoutPassword } = dbUser[0] as any
          return dbUserWithoutPassword as User;
        }else{
            throw new Error('Password did not match');
        }
        return null;
      },
    }),
    
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // }),
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
};