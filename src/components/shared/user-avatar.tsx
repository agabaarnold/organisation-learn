import { cn } from "cn";
import type { ComponentProps } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface UserAvatarProps extends ComponentProps<typeof Avatar> {
	name: string;
	image: string | null | undefined;
}

export const UserAvatar = ({
	name,
	image,
	className,
	...props
}: UserAvatarProps) => {
	const initials = name
		.split(" ")
		.filter(Boolean)
		.map((part) => part[0])
		.join("");

	return (
		<Avatar className={cn(className)} {...props}>
			<AvatarImage
				src={image ?? undefined}
				alt={name}
				className="aspect-square object-cover"
			/>

			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	);
};
