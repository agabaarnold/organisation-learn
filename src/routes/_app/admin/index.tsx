// oxlint-disable react/function-component-definition func-style
import { createFileRoute } from "@tanstack/react-router";

import { DeleteApplication } from "#/features/admin/components/delete-application.tsx";

export const Route = createFileRoute("/_app/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="mx-auto w-full max-w-6xl px-4 py-12">
			<div className="space-y-6">
				<div className="space-y-2">
					<h1 className="text-2xl font-semibold">Admin</h1>
					<p className="text-muted-foreground">
						You have administrator access.
					</p>
				</div>

				<DeleteApplication />
			</div>
		</main>
	);
}
