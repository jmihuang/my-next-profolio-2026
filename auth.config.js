/**
 * Edge-safe Auth.js configuration shared by middleware and the Node.js auth
 * handler. Keep credential verification in auth.js so middleware does not
 * bundle the native Argon2 module.
 */
const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname === "/admin/login") {
        return true;
      }

      return Boolean(auth?.user);
    },
  },
};

export default authConfig;
