import { useTransition } from "react";
import { toast } from "react-hot-toast";

import { LoadingButton } from "#/components/shared/loading-button.tsx";

import { deleteApplication } from "../functions";

export const DeleteApplication = () => {
	const [isPending, startTransition] = useTransition();

	const handleDeleteApplication = () => {
		startTransition(async () => {
			try {
				await deleteApplication();
				toast.success("Application deletion authorized successfully");
			} catch (error) {
				console.error(error);
				toast.error("Something went wrong");
			}
		});
	};

	return (
		<div className="max-w-md">
			<div className="border-destructive/20 bg-destructive/5 rounded-lg border p-4">
				<div className="space-y-3">
					<div>
						<h2 className="text-destructive font-medium">Delete Application</h2>
						<p className="text-muted-foreground text-sm">
							This action will delete the entire application. This cannot be
							undone.
						</p>
					</div>

					<LoadingButton
						loading={isPending}
						onClick={handleDeleteApplication}
						variant="destructive"
						className="w-full"
					>
						Delete Application
					</LoadingButton>
				</div>
			</div>
		</div>
	);
};
