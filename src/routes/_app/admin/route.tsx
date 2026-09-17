// oxlint-disable react/function-component-definition func-style
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/admin")({
	beforeLoad: ({ context }) => {
		const { user } = context;
		if (user.role !== "admin") {
			throw new Error("FORBIDDEN");
		}
	},
});
