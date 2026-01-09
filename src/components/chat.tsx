import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useChat } from "@/hooks/useChat";
import { ChatInput } from "./chat/chat-input";
import { MessageList } from "./chat/message-list";

export function Chat() {
	const { messages, isLoading, sendMessage } = useChat();
	const scrollAreaRef = useAutoScroll([messages, isLoading]);

	return (
		<div className="flex flex-col h-screen bg-background">
			<MessageList
				messages={messages}
				isLoading={isLoading}
				scrollAreaRef={scrollAreaRef}
			/>
			<ChatInput onSend={sendMessage} isLoading={isLoading} />
		</div>
	);
}
