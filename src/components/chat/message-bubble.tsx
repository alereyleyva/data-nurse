import type { UIMessage } from "ai";
import { cn } from "@/lib/utils";
import { MemoizedMarkdown } from "./memoized-markdown";

interface MessageBubbleProps {
	message: UIMessage;
}

function getBubbleStyles(isUser: boolean) {
	return cn(
		"max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3",
		isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
	);
}

function getContainerStyles(isUser: boolean) {
	return cn(
		"flex w-full mb-3 sm:mb-4",
		isUser ? "justify-end" : "justify-start",
	);
}

export function MessageBubble({ message }: MessageBubbleProps) {
	const isUser = message.role === "user";

	return (
		<div className={getContainerStyles(isUser)}>
			<div className={getBubbleStyles(isUser)}>
				<div
					className={cn(
						"text-sm sm:text-base prose prose-sm max-w-none wrap-break-word",
						isUser
							? "prose-invert **:text-primary-foreground!"
							: "dark:prose-invert **:text-foreground!",
					)}
				>
					{message.parts.map((part) => {
						if (part.type === "text") {
							return (
								<MemoizedMarkdown
									key={`${message.id}-text`}
									id={message.id}
									content={part.text}
								/>
							);
						}
						return null;
					})}
				</div>
			</div>
		</div>
	);
}
