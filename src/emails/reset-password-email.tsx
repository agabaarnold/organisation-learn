// oxlint-disable shadcn/no-raw-colors
import { Button, Link, Section, Text } from "react-email";

import { EmailLayout } from "./email-layout";

interface ResetPasswordEmailProps {
	userName?: string;
	url: string;
}

export const ResetPasswordEmail = ({
	userName,
	url,
}: ResetPasswordEmailProps) => (
	<EmailLayout
		heading="Reset your password"
		preview="Reset your Lectern password"
	>
		<Text className="text-base text-gray-800">
			{userName ? `Hi ${userName},` : "Hi,"} we received a request to reset your
			Lectern password.
		</Text>
		<Text className="text-base text-gray-800">
			Click the button below to choose a new password. This link expires in 1
			hour and can only be used once.
		</Text>

		<Section className="text-center">
			<Button
				className="bg-brand box-border block px-5 py-3 text-center text-white no-underline"
				href={url}
			>
				Reset password
			</Button>
		</Section>

		<Text className="text-sm text-gray-600">
			If the button doesn&apos;t work, copy and paste this link into your
			browser:
		</Text>
		<Link className="text-brand text-sm break-all underline" href={url}>
			{url}
		</Link>
	</EmailLayout>
);

ResetPasswordEmail.PreviewProps = {
	userName: "Jane Doe",
	url: "https://example.com/reset-password?token=abc123",
} satisfies ResetPasswordEmailProps;
