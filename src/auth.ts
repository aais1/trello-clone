import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ profile }) {
      // console.log(profile);
      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      // console.log(session, token);
      session.user.id = token.sub;
      return session;
    },
  },
});
