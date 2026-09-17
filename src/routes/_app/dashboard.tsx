// oxlint-disable react/function-component-definition func-style
import { createFileRoute } from "@tanstack/react-router";

import { EmailVerificationAlert } from "#/features/dashboard/components/email-verification-alert.tsx";
import { ProfileInformation } from "#/features/dashboard/components/profile-information.tsx";

export const Route = createFileRoute("/_app/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();

	return (
		<main className="mx-auto w-full max-w-6xl px-4 py-12">
			<div className="space-y-6">
				<div className="space-y-2">
					<h1 className="text-2xl font-semibold">Dashboard</h1>
					<p className="text-muted-foreground">
						Welcome back! Here&apos;s your account overview.
					</p>
				</div>

				{!user.emailVerified && <EmailVerificationAlert />}

				<ProfileInformation user={user} />
			</div>
		</main>
	);
}
