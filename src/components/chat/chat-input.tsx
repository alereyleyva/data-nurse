import { Loader2, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
	onSend: (message: string) => void;
	isLoading: boolean;
	status?: "ready" | "submitted" | "streaming" | "error";
}

const INPUT_PLACEHOLDER = "Type your message...";
const ENTER_KEY = "Enter";

function isSubmitKey(key: string, shiftKey: boolean): boolean {
	return key === ENTER_KEY && !shiftKey;
}

export function ChatInput({
	onSend,
	isLoading,
	status = "ready",
}: ChatInputProps) {
	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = useCallback(() => {
		const trimmedInput = input.trim();
		if (!trimmedInput || isLoading) return;

		onSend(trimmedInput);
		setInput("");
		inputRef.current?.focus();
	}, [input, isLoading, onSend]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (isSubmitKey(e.key, e.shiftKey)) {
				e.preventDefault();
				handleSubmit();
			}
		},
		[handleSubmit],
	);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const isInputDisabled = status !== "ready";
	const isButtonDisabled = status !== "ready" || !input.trim();

	return (
		<div
			className="border-t bg-background p-3 sm:p-4"
			style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
		>
			<div className="flex gap-2 sm:gap-3 max-w-4xl mx-auto w-full">
				<Input
					ref={inputRef}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={INPUT_PLACEHOLDER}
					disabled={isInputDisabled}
					className="flex-1 min-w-0"
				/>
				<Button
					onClick={handleSubmit}
					disabled={isButtonDisabled}
					size="icon"
					className="shrink-0 min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px]"
				>
					{isLoading ? (
						<Loader2 className="size-4 sm:size-5 animate-spin" />
					) : (
						<Send className="size-4 sm:size-5" />
					)}
				</Button>
			</div>
		</div>
	);
}
