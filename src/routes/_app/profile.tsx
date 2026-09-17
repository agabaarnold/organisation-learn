// oxlint-disable react/function-component-definition func-style
import { createFileRoute } from "@tanstack/react-router";

import { EmailVerificationAlert } from "#/features/dashboard/components/email-verification-alert.tsx";
import { ProfileInformation } from "#/features/dashboard/components/profile-information.tsx";
import ChangeEmailForm from "#/features/profile/components/change-email-form.tsx";
import LinkedAccounts from "#/features/profile/components/linked-accounts.tsx";

export const Route = createFileRoute("/_app/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();

	return (
		<main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-12">
			<div className="space-y-2">
				<h1 className="text-2xl font-semibold">Profile</h1>
				<p className="text-muted-foreground">
					Manage your personal information and sign-in methods.
				</p>
			</div>

			{!user.emailVerified && <EmailVerificationAlert />}

			<ProfileInformation user={user} />

			<ChangeEmailForm currentEmail={user.email} />

			<LinkedAccounts />
		</main>
	);
}
