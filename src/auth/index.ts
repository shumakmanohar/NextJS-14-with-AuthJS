import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
var bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				if (!credentials.email || !credentials.password) {
					return null;
				}

				let user = null;
				user = await prisma.user.findFirst({
					where: {
						email: credentials.email!,
					},
				});

				if (!user) {
					throw new Error("User not found.");
				}

				const pwdMatch = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!pwdMatch) {
					return null;
				}
				return user;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
});
