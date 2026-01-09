import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { env } from "@/env";

export type LLMProvider = "openrouter" | "bedrock";

export interface LLMConfig {
	provider: LLMProvider;
	model: string;
}

function createOpenRouterProvider() {
	if (!env.OPENROUTER_API_KEY) {
		throw new Error(
			"OPENROUTER_API_KEY is required when using OpenRouter provider",
		);
	}

	return createOpenRouter({
		apiKey: env.OPENROUTER_API_KEY,
	});
}

function createBedrockProvider() {
	if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY || !env.AWS_REGION) {
		throw new Error(
			"AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION are required when using Bedrock provider",
		);
	}

	return createAmazonBedrock({
		region: env.AWS_REGION,
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
	});
}

export function getLLMProvider(provider: LLMProvider = env.LLM_PROVIDER) {
	switch (provider) {
		case "openrouter":
			return createOpenRouterProvider();
		case "bedrock":
			return createBedrockProvider();
		default:
			throw new Error(`Unsupported LLM provider: ${provider}`);
	}
}

export function getLLMModel(provider: LLMProvider = env.LLM_PROVIDER) {
	switch (provider) {
		case "openrouter": {
			const openRouter = createOpenRouterProvider();

			return openRouter.chat(env.OPENROUTER_MODEL);
		}
		case "bedrock": {
			const bedrock = createBedrockProvider();

			return bedrock(env.AWS_BEDROCK_MODEL);
		}
		default:
			throw new Error(`Unsupported LLM provider: ${provider}`);
	}
}
