import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import AzureADProvider from "next-auth/providers/azure-ad";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-client-secret",
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID || "placeholder-client-id",
      clientSecret: process.env.APPLE_SECRET || "placeholder-client-secret",
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "placeholder-client-id",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "placeholder-client-secret",
      tenantId: process.env.AZURE_AD_TENANT_ID || "placeholder-tenant-id",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    newUser: "/auth/signup",
  },
});

export { handler as GET, handler as POST }; 