import { useCallback, useState } from "react";
import {
	createErrorMessage,
	createMessage,
	createPlaceholderResponse,
} from "@/lib/chat-utils";
import type { Message } from "@/types/chat";

const PLACEHOLDER_DELAY_MS = 1000;

async function simulateApiCall(content: string): Promise<Message> {
	await new Promise((resolve) => setTimeout(resolve, PLACEHOLDER_DELAY_MS));
	return createPlaceholderResponse(content);
}

export function useChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const sendMessage = useCallback(async (content: string) => {
		const userMessage = createMessage("user", content);
		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		try {
			const assistantMessage = await simulateApiCall(content);
			setMessages((prev) => [...prev, assistantMessage]);
		} catch (_error) {
			const errorMessage = createErrorMessage();
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		messages,
		isLoading,
		sendMessage,
	};
}
