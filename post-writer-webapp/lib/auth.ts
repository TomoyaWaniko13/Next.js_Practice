import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

// https://next-auth.js.org/getting-started/example#add-api-route
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // https://next-auth.js.org/configuration/options#pages
  pages: {
    signIn: '/login',
  },
  // https://next-auth.js.org/configuration/options#callbacks
  callbacks: {
    //  the session callback is called whenever a session is checked
    //  (e.g., on page load or when calling the useSession hook):
    async session({ token, session }) {
      // if token exists, add user id(=ユーザーが正常に認証され、認証トークンが生成されているいたら)
      // ,add name, email, and image to session
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};
export default NextAuth(authOptions);
