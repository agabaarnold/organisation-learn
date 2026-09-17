import { IconMail } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { buttonVariants } from "#/components/ui/button.tsx";

export const EmailVerificationAlert = () => (
	<div className="border-border bg-muted rounded-lg border p-4">
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-center gap-3">
				<IconMail className="text-muted-foreground size-5 shrink-0" />

				<span className="text-foreground text-sm">
					Please verify your email address to access all features.
				</span>
			</div>

			<Link
				className={buttonVariants({ variant: "outline", size: "sm" })}
				to="/verify-email"
			>
				Verify Email
			</Link>
		</div>
	</div>
);
