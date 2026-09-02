import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import authConfig from "./auth.config";
import { verifyAdminPassword } from "./lib/admin-password";

const credentialsSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(12).max(256),
});

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
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!parsedCredentials.success) {
          console.info("[admin-auth] rejected: invalid credentials format");
          return null;
        }

        if (!adminEmail || !passwordHash) {
          console.error("[admin-auth] rejected: missing runtime configuration");
          return null;
        }

        if (parsedCredentials.data.email.toLowerCase() !== adminEmail) {
          console.info("[admin-auth] rejected: email mismatch");
          return null;
        }

        if (!passwordHash.startsWith("pbkdf2-sha256$")) {
          console.error("[admin-auth] rejected: invalid PBKDF2 hash format");
          return null;
        }

        try {
          const passwordMatches = await verifyAdminPassword(
            parsedCredentials.data.password,
            passwordHash,
          );

          if (!passwordMatches) {
            console.info("[admin-auth] rejected: password mismatch");
            return null;
          }
        } catch (error) {
          console.error("[admin-auth] PBKDF2 verification error", error?.name || "UnknownError");
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
