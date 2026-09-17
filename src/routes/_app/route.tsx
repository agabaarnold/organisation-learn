// oxlint-disable react/function-component-definition func-style
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getUserSession } from "#/features/auth/functions/index.ts";
import { Navbar } from "#/components/shared/navbar.tsx";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
	beforeLoad: async ({ location }) => {
		const { session } = await getUserSession();
		if (!session) {
			throw redirect({ to: "/login", search: { redirect: location.href } });
		}

		return { user: session.user };
	},
});

function RouteComponent() {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	);
}
