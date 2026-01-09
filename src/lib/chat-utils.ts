import type { Message, MessageRole } from "@/types/chat";

export function createMessage(role: MessageRole, content: string): Message {
	return {
		id: crypto.randomUUID(),
		role,
		content,
		timestamp: new Date(),
	};
}

export function createErrorMessage(): Message {
	return createMessage(
		"assistant",
		"Sorry, I encountered an error. Please try again.",
	);
}

export function createPlaceholderResponse(userMessage: string): Message {
	return createMessage(
		"assistant",
		`This is a placeholder response to: "${userMessage}". In a real implementation, you would integrate with an AI API like OpenAI, Anthropic, or similar.`,
	);
}
