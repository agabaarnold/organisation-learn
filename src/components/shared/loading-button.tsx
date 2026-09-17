import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
	loading: boolean;
}

export const LoadingButton = ({
	loading,
	disabled,
	children,
	...props
}: LoadingButtonProps) => (
	<Button disabled={loading || disabled} {...props}>
		{loading ? <Spinner /> : children}
	</Button>
);
