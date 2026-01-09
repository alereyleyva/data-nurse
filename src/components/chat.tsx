import { useChat } from "@ai-sdk/react";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { ChatInput } from "./chat/chat-input";
import { MessageList } from "./chat/message-list";

export function Chat() {
	const { messages, status, sendMessage } = useChat();

	const scrollAreaRef = useAutoScroll([messages, status]);

	const isLoading = status === "submitted" || status === "streaming";

	return (
		<div className="flex flex-col h-dvh bg-background">
			<MessageList
				messages={messages}
				isLoading={isLoading}
				scrollAreaRef={scrollAreaRef}
			/>
			<ChatInput
				onSend={(message) => sendMessage({ text: message })}
				isLoading={isLoading}
				status={status}
			/>
		</div>
	);
}
