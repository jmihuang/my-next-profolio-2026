import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config";
import { verifyAdminPassword } from "./lib/admin-password";

const EMAIL_MAX_LENGTH = 254;
const PASSWORD_MIN_LENGTH = 12;
const PASSWORD_MAX_LENGTH = 256;

function parseAdminCredentials(raw) {
  if (raw == null || typeof raw !== "object") {
    return null;
  }

  const { email: rawEmail, password } = raw;
  if (typeof rawEmail !== "string" || typeof password !== "string") {
    return null;
  }

  const email = rawEmail.trim();
  if (
    email.length === 0 ||
    email.length > EMAIL_MAX_LENGTH ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return null;
  }

  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH
  ) {
    return null;
  }

  return { email, password };
}

const authOptions = {
  ...authConfig,
  session: {
    strategy: "jwt",
  },
};

authOptions.providers = [
    Credentials({
      name: "Admin login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = parseAdminCredentials(credentials);
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!parsedCredentials) {
          console.info("[admin-auth] rejected: invalid credentials format");
          return null;
        }

        if (!adminEmail || !passwordHash) {
          console.error("[admin-auth] rejected: missing runtime configuration");
          return null;
        }

        if (parsedCredentials.email.toLowerCase() !== adminEmail) {
          console.info("[admin-auth] rejected: email mismatch");
          return null;
        }

        if (!passwordHash.startsWith("pbkdf2-sha256$")) {
          console.error("[admin-auth] rejected: invalid PBKDF2 hash format");
          return null;
        }

        try {
          const passwordMatches = await verifyAdminPassword(
            parsedCredentials.password,
            passwordHash,
          );

          if (!passwordMatches) {
            console.info("[admin-auth] rejected: password mismatch");
            return null;
          }
        } catch (error) {
          console.error("[admin-auth] PBKDF2 verification error", error?.message || error?.name || "UnknownError");
          return null;
        }

        console.info("[admin-auth] accepted");

        return {
          id: "portfolio-admin",
          name: "Portfolio Admin",
          email: adminEmail,
        };
      },
    }),
  ];

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
