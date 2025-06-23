import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { USer } from "@/api/model/usermodel";
import { connectDb } from "@/api/route";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:any):Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          await connectDb();

          const user = await USer.findOne({
            $or: [{ email: credentials.email }, { name: credentials?.name }],
            isVerified: true,
          });

          if (!user) {
            return Response.json({
              message: "User not found",
              success: false,
            });
         
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            return Response.json({
              message: "Invalid password",
              success: false,
            });
          }

          return  user;


        } catch (error) {
           return Response.json({
            message: `Authentication error: ${error instanceof Error ? error.message : "Unknown error"}`,
            success: false,
          });
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string;
        session.user.name  = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
