// oxlint-disable shadcn/no-raw-colors
import type { ReactNode } from "react";
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
	pixelBasedPreset,
} from "react-email";

interface EmailLayoutProps {
	preview: string;
	heading: string;
	children: ReactNode;
}

export const EmailLayout = ({
	preview,
	heading,
	children,
}: EmailLayoutProps) => (
	<Html lang="en">
		<Tailwind
			config={{
				presets: [pixelBasedPreset],
				theme: {
					extend: {
						colors: {
							brand: "#1e293b",
							brandForeground: "#f8fafc",
							muted: "#f1f5f9",
						},
						fontFamily: {
							sans: ["Montserrat", "Arial", "sans-serif"],
						},
					},
				},
			}}
		>
			<Head />
			<Body className="bg-muted font-sans">
				<Preview>{preview}</Preview>
				<Container className="mx-auto max-w-xl bg-white p-5">
					<Section className="text-center">
						<Heading className="text-brand text-2xl font-semibold">
							Lectern
						</Heading>
						<Text className="m-0 text-sm text-gray-500">
							Learn. Organise. Succeed.
						</Text>
					</Section>

					<Hr className="border-solid border-gray-200" />

					<Heading as="h2" className="text-xl text-gray-800">
						{heading}
					</Heading>

					{children}

					<Hr className="border-solid border-gray-200" />

					<Section>
						<Text className="text-xs text-gray-500">
							If you didn&apos;t request this email, you can safely ignore it.
						</Text>
						<Text className="text-xs text-gray-500">
							© {new Date().getFullYear()} Lectern. All rights reserved.{" "}
							<Link
								className="text-gray-500 underline"
								href="https://lectern.com"
							>
								lectern.com
							</Link>
						</Text>
					</Section>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);
