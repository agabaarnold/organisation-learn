import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { GithubIcon } from "#/components/shared/icons/github-icon.tsx";
import { GoogleIcon } from "#/components/shared/icons/google-icon.tsx";
import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import { authClient } from "#/lib/auth-client.ts";

interface LinkedAccount {
	id: string;
	providerId: string;
}

type SocialProvider = "google" | "github";

const SOCIAL_PROVIDERS: {
	provider: SocialProvider;
	label: string;
	Icon: (props: { size?: number }) => React.JSX.Element;
}[] = [
	{ provider: "google", label: "Google", Icon: GoogleIcon },
	{ provider: "github", label: "GitHub", Icon: GithubIcon },
];

const accountSchema = z.object({
	id: z.string(),
	providerId: z.string().optional(),
	provider: z.string().optional(),
});

type ListAccountsData = Awaited<
	ReturnType<typeof authClient.listAccounts>
>["data"];

const normalizeAccounts = (data: ListAccountsData): LinkedAccount[] => {
	const parsed = z.array(accountSchema).safeParse(data);
	if (!parsed.success) {
		return [];
	}
	return parsed.data.flatMap((item) => {
		const providerId = (item.providerId ?? item.provider ?? "").toLowerCase();
		return providerId ? [{ id: item.id, providerId }] : [];
	});
};

const LinkedAccounts = () => {
	const [accounts, setAccounts] = useState<LinkedAccount[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(
		null
	);
	const [pendingAccountId, setPendingAccountId] = useState<string | null>(null);

	const fetchAccounts = useCallback(async () => {
		const { data, error } = await authClient.listAccounts();
		if (error) {
			toast.error(error.message || "Could not load connected accounts");
			return;
		}
		setAccounts(normalizeAccounts(data));
	}, []);

	useEffect(() => {
		const load = async () => {
			setIsLoading(true);
			await fetchAccounts();
			setIsLoading(false);
		};
		void load();
	}, [fetchAccounts]);

	const handleLink = async (provider: SocialProvider) => {
		setPendingProvider(provider);
		await authClient.linkSocial({
			provider,
			callbackURL: "/profile",
			fetchOptions: {
				onError: ({ error }) => {
					toast.error(error.message);
					setPendingProvider(null);
				},
			},
		});
	};

	const handleUnlink = async (accountId: string) => {
		setPendingAccountId(accountId);
		await authClient.unlinkAccount({
			accountId,
			fetchOptions: {
				onError: ({ error }) => {
					toast.error(error.message);
					setPendingAccountId(null);
				},
				onSuccess: async () => {
					toast.success("Account disconnected");
					setPendingAccountId(null);
					await fetchAccounts();
				},
			},
		});
	};

	const hasPassword = accounts.some(
		(account) => account.providerId === "credential"
	);
	const isLastMethod = accounts.length <= 1;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Connected accounts</CardTitle>
				<CardDescription>
					Link your social accounts for faster sign-in. At least one sign-in
					method must remain.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col gap-3">
				<div className="border-border flex items-center justify-between gap-3 rounded-lg border p-3">
					<div>
						<p className="text-sm font-medium">Email & password</p>
						<p className="text-muted-foreground text-xs">
							{hasPassword
								? "Password sign-in is enabled"
								: "No password set for this account"}
						</p>
					</div>
					{hasPassword ? (
						<Badge variant="secondary">Linked</Badge>
					) : (
						<Button size="sm" variant="outline">
							<Link to="/forgot-password">Set password</Link>
						</Button>
					)}
				</div>

				{SOCIAL_PROVIDERS.map(({ provider, label, Icon }) => {
					const linked = accounts.find(
						(account) => account.providerId === provider
					);
					const isPending =
						pendingProvider === provider || pendingAccountId === linked?.id;

					return (
						<div
							key={provider}
							className="border-border flex items-center justify-between gap-3 rounded-lg border p-3"
						>
							<div className="flex items-center gap-3">
								<Icon />
								<div>
									<p className="text-sm font-medium">{label}</p>
									<p className="text-muted-foreground text-xs">
										{linked ? "Connected" : "Not connected"}
									</p>
								</div>
							</div>

							{linked ? (
								<Button
									disabled={isPending || isLastMethod}
									onClick={() => handleUnlink(linked.id)}
									size="sm"
									title={
										isLastMethod
											? "At least one sign-in method must remain"
											: undefined
									}
									variant="outline"
								>
									{isPending ? "Working…" : "Disconnect"}
								</Button>
							) : (
								<Button
									disabled={isPending || isLoading}
									onClick={() => handleLink(provider)}
									size="sm"
									variant="outline"
								>
									{isPending ? "Redirecting…" : "Connect"}
								</Button>
							)}
						</div>
					);
				})}

				{isLoading && (
					<p className="text-muted-foreground text-xs">
						Loading connected accounts…
					</p>
				)}
				</div>
			</CardContent>
		</Card>
	);
};

export default LinkedAccounts;
