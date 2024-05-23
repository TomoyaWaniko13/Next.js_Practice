import NextAuth from 'next-auth';

export const { handlers, auth } = NextAuth({
  pages: {
    signIn: '/auth/signin',
  },
  providers: [],
  callbacks: {
    authorized: (params) => {
      console.log('in authorized');
      return false;
    },
  },
});
