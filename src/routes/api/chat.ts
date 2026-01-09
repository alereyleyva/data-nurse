import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getLLMModel } from "@/lib/ai";
import { getPDFContext } from "@/lib/pdf-server";

export const Route = createFileRoute("/api/chat")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const { messages }: { messages: UIMessage[] } = await request.json();

				const model = getLLMModel();

				const pdfContext = await getPDFContext();

				const systemMessage = pdfContext
					? `Actúa como un asistente especializado en enfermería. Tienes a tu disposición el contenido del siguiente PDF; úsalo para resolver dudas de manera clara y completa, asegurándote de que la información sea rigurosa.\n\n${pdfContext}`
					: undefined;

				const result = streamText({
					model,
					system: systemMessage,
					messages: await convertToModelMessages(messages),
				});

				return result.toUIMessageStreamResponse();
			},
		},
	},
});
