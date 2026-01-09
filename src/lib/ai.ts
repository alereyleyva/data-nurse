import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { createOpenAI } from "@ai-sdk/openai";
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

	return createOpenAI({
		apiKey: env.OPENROUTER_API_KEY,
		baseURL: "https://openrouter.ai/api/v1",
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

export function getLLMModel(provider: LLMProvider = env.LLM_PROVIDER): string {
	switch (provider) {
		case "openrouter":
			return env.OPENROUTER_MODEL;
		case "bedrock":
			return env.AWS_BEDROCK_MODEL;
		default:
			throw new Error(`Unsupported LLM provider: ${provider}`);
	}
}
