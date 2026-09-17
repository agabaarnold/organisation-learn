import { revalidateLogic } from "@tanstack/react-form-start";
import { toast } from "react-hot-toast";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import { FieldGroup } from "#/components/ui/field.tsx";
import { useAppForm } from "#/hooks/form/use-form.ts";
import { authClient } from "#/lib/auth-client.ts";

import { changeEmailSchema } from "../../auth/schema";
import type { ChangeEmailInput } from "../../auth/schema";

interface ChangeEmailFormProps {
	currentEmail: string;
}

const defaultValues: ChangeEmailInput = { newEmail: "" };

const ChangeEmailForm = ({ currentEmail }: ChangeEmailFormProps) => {
	const form = useAppForm({
		defaultValues,
		onSubmit: async ({ value }) => {
			if (value.newEmail.toLowerCase() === currentEmail.toLowerCase()) {
				toast.error("Enter an email address different from your current one");
				return;
			}
			await authClient.changeEmail({
				newEmail: value.newEmail,
				callbackURL: "/profile",
				fetchOptions: {
					onError: ({ error }) => {
						toast.error(error.message);
					},
					onSuccess: () => {
						toast.success("Verification link sent to your new email address");
						form.reset();
					},
				},
			});
		},
		validationLogic: revalidateLogic({
			mode: "submit",
			modeAfterSubmission: "blur",
		}),
		validators: { onSubmit: changeEmailSchema },
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Change email address</CardTitle>
				<CardDescription>
					Current email: {currentEmail}. A verification link will be sent to the
					new address before the change takes effect.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.AppField name="newEmail">
							{(field) => (
								<field.FormInput
									label="New email address"
									placeholder="Enter your new email address"
									type="email"
								/>
							)}
						</form.AppField>

						<form.AppForm>
							<form.SubmitButton label="Send verification link" />
						</form.AppForm>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
};

export default ChangeEmailForm;
