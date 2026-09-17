import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: [".env.local", ".env"] });

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema/*.schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		// oxlint-disable-next-line anti-slop/require-safety-comment-for-type-assertion
		url: process.env.DATABASE_URL as string,
	},
});
