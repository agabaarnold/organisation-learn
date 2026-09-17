// oxlint-disable shadcn/no-raw-colors
import { Button, Link, Section, Text } from "react-email";

import { EmailLayout } from "./email-layout";

interface VerificationEmailProps {
	userName?: string;
	url: string;
}

export const VerificationEmail = ({
	userName,
	url,
}: VerificationEmailProps) => (
	<EmailLayout
		heading="Verify your email address"
		preview="Verify your Lectern email address"
	>
		<Text className="text-base text-gray-800">
			{userName ? `Hi ${userName},` : "Hi,"} welcome to Lectern! Please verify
			your email address to get the most out of your account.
		</Text>
		<Text className="text-base text-gray-800">
			Click the button below to verify. This link expires in 1 hour.
		</Text>

		<Section className="text-center">
			<Button
				className="bg-brand box-border block px-5 py-3 text-center text-white no-underline"
				href={url}
			>
				Verify email
			</Button>
		</Section>

		<Text className="text-sm text-gray-600">
			If the button doesn&apos;t work, copy and paste this link into your
			browser:
		</Text>
		<Link className="text-brand text-sm break-all underline" href={url}>
			{url}
		</Link>

		<Text className="text-sm text-gray-600">
			You can still log in before verifying — we&apos;ll remind you on your
			dashboard.
		</Text>
	</EmailLayout>
);

VerificationEmail.PreviewProps = {
	userName: "Jane Doe",
	url: "https://example.com/api/auth/verify-email?token=abc123&callbackURL=/email-verified",
} satisfies VerificationEmailProps;
