import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getLLMModel } from "@/lib/ai";
import { NURSING_SYSTEM_PROMPT } from "@/lib/utils";

export const Route = createFileRoute("/api/chat")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const { messages }: { messages: UIMessage[] } = await request.json();

				const model = getLLMModel();

				const result = streamText({
					model,
					system: NURSING_SYSTEM_PROMPT,
					messages: await convertToModelMessages(messages),
				});

				return result.toUIMessageStreamResponse();
			},
		},
	},
});
