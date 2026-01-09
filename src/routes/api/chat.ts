import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getLLMModel, getLLMProvider } from "@/lib/ai";

export const Route = createFileRoute("/api/chat")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const { messages }: { messages: UIMessage[] } = await request.json();

				const provider = getLLMProvider();
				const modelId = getLLMModel();

				const result = streamText({
					model: provider(modelId),
					messages: await convertToModelMessages(messages),
				});

				return result.toUIMessageStreamResponse();
			},
		},
	},
});
