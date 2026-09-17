import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "#/middleware.ts";

export const deleteApplication = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const { user } = context;
		if (user.role !== "admin") {
			throw new Error("FORBIDDEN");
		}

		// Delete app...

		await setTimeout(800, 0);
	});
