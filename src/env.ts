import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const allowedUsersSchema = z.preprocess((val) => {
	if (!val) return [];

	if (typeof val === "string") {
		return val.split(",");
	}

	return val;
}, z.array(z.string()));

export const env = createEnv({
	server: {
		LLM_PROVIDER: z.enum(["openrouter", "bedrock"]).default("openrouter"),
		OPENROUTER_API_KEY: z.string().min(1).optional(),
		OPENROUTER_MODEL: z.string().default("openai/gpt-4o-mini"),
		AWS_ACCESS_KEY_ID: z.string().min(1).optional(),
		AWS_SECRET_ACCESS_KEY: z.string().min(1).optional(),
		AWS_REGION: z.string().min(1).optional(),
		AWS_BEDROCK_MODEL: z
			.string()
			.default("anthropic.claude-3-5-sonnet-20241022-v2:0"),
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		ALLOWED_USERS: allowedUsersSchema,
	},

	/**
	 * What object holds the environment variables at runtime. This is usually
	 * `process.env` or `import.meta.env`.
	 */
	runtimeEnv: process.env,

	/**
	 * By default, this library will feed the environment variables directly to
	 * the Zod validator.
	 *
	 * This means that if you have an empty string for a value that is supposed
	 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
	 * it as a type mismatch violation. Additionally, if you have an empty string
	 * for a value that is supposed to be a string with a default value (e.g.
	 * `DOMAIN=` in an ".env" file), the default value will never be applied.
	 *
	 * In order to solve these issues, we recommend that all new projects
	 * explicitly specify this option as true.
	 */
	emptyStringAsUndefined: true,
});
