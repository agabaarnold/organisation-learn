import { IconCalendarEvent, IconShield, IconUser } from "@tabler/icons-react";
import { format } from "date-fns";

import { UserAvatar } from "#/components/shared/user-avatar.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import type { User } from "#/lib/auth.ts";

interface ProfileInformationProps {
	user: User;
}

export const ProfileInformation = ({ user }: ProfileInformationProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<IconUser className="size-5" />
				Profile Information
			</CardTitle>

			<CardDescription>Your account details and current status</CardDescription>
		</CardHeader>

		<CardContent>
			<div className="flex flex-col gap-6 sm:flex-row sm:items-start">
				<div className="flex flex-col items-center gap-3">
					<UserAvatar
						name={user.name}
						image={user.image}
						className="size-32 sm:size-24"
					/>

					{user.role && (
						<Badge>
							<IconShield className="size-3" />
							{user.role}
						</Badge>
					)}
				</div>

				<div className="flex-1 space-y-4">
					<div>
						<h3 className="text-2xl font-semibold">{user.name}</h3>
						<p className="text-muted-foreground">{user.email}</p>
					</div>

					<div className="space-y-2">
						<div className="text-muted-foreground flex items-center gap-2 text-sm">
							<IconCalendarEvent className="size-4" />
							Member Since
						</div>

						<p className="font-medium">
							{format(user.createdAt, "MMMM d, yyyy")}
						</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
