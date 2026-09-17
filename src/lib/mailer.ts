import { createTransport } from "nodemailer";

import { env } from "#/env.ts";

const transporter = createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: env.SMTP_PORT === 465,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS,
	},
});

interface SendEmailOptions {
	to: string;
	subject: string;
	html: string;
	text: string;
}

export const sendEmail = async ({
	to,
	subject,
	html,
	text,
}: SendEmailOptions) => {
	try {
		await transporter.sendMail({
			from: `"Lectern" <${env.SMTP_FROM}>`,
			to,
			subject,
			text,
			html,
		});
	} catch (error) {
		throw new Error(
			`Failed to send email to ${to}: ${error instanceof Error ? error.message : "Unknown error"}`,
			{ cause: error }
		);
	}
};
