import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          firstname: profile.given_name,
          lastname: profile.family_name,
          image: profile.picture,
          email: profile.email,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Les champs doivent être remplies");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("Aucun utilisateur est inscrit avec ce mail");
        }

        if (!user.password) {
          throw new Error(
            "Cet email a déja été utiliser avec la connexion Google."
          );
        }

        const passwordMatch = await compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Mot de passe incorrect");
        }

        return {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          image: user.image,
          email: user.email,
          emailVerified: false,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const userLikes = await prisma.like.findMany({
        where: {
          userId: token.id as string,
        },
      });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          firstname: token.firstname,
          lastname: token.lastname,
          role: token.role,
          likes: userLikes,
        },
      };
    },
  },
};
