import { createFileRoute, Link } from "@tanstack/react-router";

import { Image } from "#/components/shared/image.tsx";
// oxlint-disable func-style react/function-component-definition
import { buttonVariants } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main className="flex min-h-svh items-center justify-center px-4">
			<div className="mx-auto max-w-3xl text-center">
				<div className="mb-8 flex items-center justify-center gap-4">
					<Image
						src="./coding_in_flow_logo.jpg"
						alt="Coding in Flow logo"
						width={80}
						height={80}
						className="border-muted rounded-full border"
					/>

					<span className="text-muted-foreground text-2xl font-bold">+</span>

					<Image
						src="./better_auth_logo.png"
						alt="Better Auth logo"
						width={80}
						height={80}
						className="border-muted rounded-full border"
					/>
				</div>

				<h1 className="text-3xl font-semibold sm:text-4xl">
					Better-Auth Tutorial
				</h1>

				<p className="text-muted-foreground mt-3 text-base text-balance sm:text-lg">
					Learn how to handle authentication in Next.js using Better-Auth with
					this tutorial by{" "}
					<Link
						to=".."
						href="https://www.youtube.com/c/codinginflow?sub_confirmation=1"
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:underline"
					>
						Coding in Flow
					</Link>
				</p>

				<div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
					<Link className={buttonVariants()} to="/dashboard">
						Go to Dashboard
					</Link>

					<Link className={buttonVariants()} to="/login">
						Sign In
					</Link>
				</div>
			</div>
		</main>
	);
}
