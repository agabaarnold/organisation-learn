import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { betterAuth } from "better-auth/minimal";
import { haveIBeenPwned, lastLoginMethod } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { render } from "react-email";

import { db } from "../db";
import { schema } from "../db/schema";
import { ResetPasswordEmail } from "../emails/reset-password-email";
import { VerificationEmail } from "../emails/verification-email";
import { env } from "../env";
import { passwordSchema } from "../features/auth/schema";
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
	hooks: {
		// oxlint-disable-next-line require-await
		before: createAuthMiddleware(async (ctx) => {
			if (
				ctx.path === "/sign-up/email" ||
				ctx.path === "/reset-password" ||
				ctx.path === "/change-password"
			) {
				const password = ctx.body.password || ctx.body.newPassword;

				const { error } = passwordSchema.safeParse(password);
				if (error) {
					throw new APIError("BAD_REQUEST", {
						message: "Password not strong enough",
					});
				}
			}
		}),
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
	user: { additionalFields: { role: { type: "string", input: false } } },
});

export type User = typeof auth.$Infer.Session.user;
