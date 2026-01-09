import type { UIMessage } from "ai";
import { cn } from "@/lib/utils";
import { MemoizedMarkdown } from "./memoized-markdown";

interface MessageBubbleProps {
	message: UIMessage;
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
				<div
					className={cn(
						"text-sm prose prose-sm max-w-none",
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
