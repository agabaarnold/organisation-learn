import { Link, useRouteContext } from "@tanstack/react-router";

import { Image } from "./image";
import { UserDropdown } from "./user-dropdown";

export const Navbar = () => {
	const { user } = useRouteContext({ from: "/_app" });

	return (
		<header className="bg-background border-b">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
				<Link to="/dashboard" className="flex items-center gap-2 font-semibold">
					<Image
						src="./coding_in_flow_logo.jpg"
						alt="Coding in Flow logo"
						width={32}
						height={32}
						className="border-muted rounded-full border"
					/>
					Better-Auth Tutorial
				</Link>

				<div className="flex items-center gap-2">
					{/* <ModeToggle /> */}
					<UserDropdown user={user} />
				</div>
			</div>
		</header>
	);
};
