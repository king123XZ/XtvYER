import CredentialsProvider from "next-auth/providers/credentials";


export const adminEmails = [
  "oroscoyerson2019@gmail.com",
  "angelejrv@gmail.com",
  "oroscoyeferson@gmail.com"
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo", type: "text", placeholder: "correo@ejemplo.com" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials: Record<string, unknown> | undefined) {
        const email = typeof credentials?.email === 'string' ? credentials.email : undefined;
        const password = typeof credentials?.password === 'string' ? credentials.password : undefined;
        const user = adminEmails.find(e => e === email);
        if (user && password === "XanTv!2025$Panel#") {
          return { id: user, email: user };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/login",
    error: "/admin/login?error=custom"
  },
  callbacks: {
    async signIn({ user }: { user: { email?: string } }) {
      if (user?.email && adminEmails.includes(user.email)) {
        return true;
      }
      return false;
    },
    async session({ session, token }: { session: { user?: { email?: string } }, token: { email?: string } }) {
      if (session?.user && token?.email) {
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }: { token: { email?: string }, user: { email?: string } }) {
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    }
  }
};
