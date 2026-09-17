import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth/minimal";
import { haveIBeenPwned, lastLoginMethod } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { render } from "react-email";

import { db } from "../db";
import { schema } from "../db/schema";
import { ResetPasswordEmail } from "../emails/reset-password-email";
import { VerificationEmail } from "../emails/verification-email";
import { env } from "../env";
import { sendEmail } from "./mailer";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg", schema, usePlural: true }),
	emailAndPassword: {
		enabled: true,
		resetPasswordTokenExpiresIn: 3600,
		revokeSessionsOnPasswordReset: true,
		sendResetPassword: async ({ user, url }) => {
			const [html, text] = await Promise.all([
				render(ResetPasswordEmail({ url, userName: user.name })),
				render(ResetPasswordEmail({ url, userName: user.name }), {
					plainText: true,
				}),
			]);
			await sendEmail({
				to: user.email,
				subject: "Reset your Lectern password",
				html,
				text,
			});
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			const [html, text] = await Promise.all([
				render(VerificationEmail({ url, userName: user.name })),
				render(VerificationEmail({ url, userName: user.name }), {
					plainText: true,
				}),
			]);
			await sendEmail({
				to: user.email,
				subject: "Verify your Lectern email address",
				html,
				text,
			});
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
	},
	plugins: [haveIBeenPwned(), lastLoginMethod(), tanstackStartCookies()],
});

export type User = typeof auth.$Infer.Session.user;
