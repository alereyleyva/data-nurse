import { cn } from "@/lib/utils";
import type { Message } from "@/types/chat";

interface MessageBubbleProps {
	message: Message;
}

function getBubbleStyles(isUser: boolean) {
	return cn(
		"max-w-[80%] rounded-2xl px-4 py-3",
		isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
	);
}

function getContainerStyles(isUser: boolean) {
	return cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start");
}

export function MessageBubble({ message }: MessageBubbleProps) {
	const isUser = message.role === "user";

	return (
		<div className={getContainerStyles(isUser)}>
			<div className={getBubbleStyles(isUser)}>
				<p className="text-sm whitespace-pre-wrap wrap-break-word">
					{message.content}
				</p>
			</div>
		</div>
	);
}
