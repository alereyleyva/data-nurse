import type { UIMessage } from "ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "./empty-state";
import { LoadingIndicator } from "./loading-indicator";
import { MessageBubble } from "./message-bubble";

interface MessageListProps {
	messages: UIMessage[];
	isLoading: boolean;
	scrollAreaRef: React.RefObject<HTMLDivElement | null>;
}

export function MessageList({
	messages,
	isLoading,
	scrollAreaRef,
}: MessageListProps) {
	const hasMessages = messages.length > 0;

	return (
		<div className="flex-1 overflow-hidden">
			<ScrollArea className="h-full" ref={scrollAreaRef}>
				<div className="max-w-4xl mx-auto p-3 sm:p-4 w-full">
					{!hasMessages ? (
						<EmptyState />
					) : (
						<div className="py-3 sm:py-4">
							{messages.map((message) => (
								<MessageBubble key={message.id} message={message} />
							))}
							{isLoading && <LoadingIndicator />}
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
}
