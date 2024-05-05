
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { getUserById } from "@/lib/user"
import { Role } from "@prisma/client"
import { prisma } from "./lib/db"
import NextAuth, { type DefaultSession } from "next-auth";

export const { 
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    // error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
  
        if (token.email) {
          session.user.email = token.email;
        }

        session.user.name = token.name;
        session.user.image = token.picture;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      return session
    },

    async jwt({ token, user }) {
      if (!token.sub) return token;

      if (user) {
        // User is available during sign-in
        //TODO: Verificar a extensão
        //@ts-ignore
        token.id = user.id;
        token.role = "DEFAULT";
      }

      const dbUser = await getUserById(token.sub);

      if (!dbUser) return token;

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.role = dbUser.role;

      return token;
    },
  },
  ...authConfig,
  // debug: process.env.NODE_ENV !== "production"
})



declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}