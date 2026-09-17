import { IconLogout, IconUser } from "@tabler/icons-react";
import { Link, useRouter } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

import { authClient } from "#/lib/auth-client.ts";
import type { User } from "#/lib/auth.ts";

import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Image } from "./image";

interface UserDropdownProps {
	user: User;
}

const SignOutItem = () => {
	const router = useRouter();

	const handleSignOut = async () => {
		const { error } = await authClient.signOut();
		if (error) {
			toast.error(error.message || "Something went wrong");
		} else {
			toast.success("Signed out successfully");
			router.navigate({ to: "/login" });
		}
	};

	return (
		<DropdownMenuItem onClick={handleSignOut}>
			<IconLogout className="size-4" /> <span>Sign out</span>
		</DropdownMenuItem>
	);
};

const ProfileItem = () => (
	<DropdownMenuItem
		render={
			<Link to="/profile">
				<IconUser className="size-4" /> <span>Profile</span>
			</Link>
		}
	/>
);

export const UserDropdown = ({ user }: UserDropdownProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger
			render={
				<Button variant="outline">
					{user.image ? (
						<Image
							src={user.image}
							alt={user.name}
							width={16}
							height={16}
							className="rounded-full object-cover"
						/>
					) : (
						<IconUser />
					)}
					<span className="max-w-48 truncate">{user.name}</span>
				</Button>
			}
		/>

		<DropdownMenuContent align="end" className="w-56">
			<DropdownMenuGroup>
				<DropdownMenuLabel>{user.email}</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<ProfileItem />

				<SignOutItem />
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
);
