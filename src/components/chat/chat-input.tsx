import { Loader2, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
	onSend: (message: string) => void;
	isLoading: boolean;
}

const INPUT_PLACEHOLDER = "Type your message...";
const ENTER_KEY = "Enter";

function isSubmitKey(key: string, shiftKey: boolean): boolean {
	return key === ENTER_KEY && !shiftKey;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
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

	const isInputDisabled = isLoading;
	const isButtonDisabled = isLoading || !input.trim();

	return (
		<div className="border-t bg-background p-4">
			<div className="flex gap-2 max-w-4xl mx-auto">
				<Input
					ref={inputRef}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={INPUT_PLACEHOLDER}
					disabled={isInputDisabled}
					className="flex-1"
				/>
				<Button onClick={handleSubmit} disabled={isButtonDisabled} size="icon">
					{isLoading ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						<Send className="size-4" />
					)}
				</Button>
			</div>
		</div>
	);
}
