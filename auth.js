import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { argon2Verify } from "hash-wasm";
import { z } from "zod";
import authConfig from "./auth.config";

const credentialsSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(12).max(256),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [
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

        if (!parsedCredentials.success || !adminEmail || !passwordHash) {
          return null;
        }

        if (
          parsedCredentials.data.email.toLowerCase() !== adminEmail ||
          !passwordHash.startsWith("$argon2id$")
        ) {
          return null;
        }

        try {
          const passwordMatches = await argon2Verify({
            hash: passwordHash,
            password: parsedCredentials.data.password,
          });

          if (!passwordMatches) {
            return null;
          }
        } catch {
          return null;
        }

        return {
          id: "portfolio-admin",
          name: "Portfolio Admin",
          email: adminEmail,
        };
      },
    }),
  ],
});
