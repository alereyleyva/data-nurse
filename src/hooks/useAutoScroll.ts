import { useEffect, useRef } from "react";

const SCROLL_VIEWPORT_SELECTOR = '[data-slot="scroll-area-viewport"]';

export function useAutoScroll<T>(dependencies: T[]) {
	const scrollAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scrollToBottom = () => {
			if (!scrollAreaRef.current) return;

			const scrollContainer = scrollAreaRef.current.querySelector(
				SCROLL_VIEWPORT_SELECTOR,
			) as HTMLElement | null;

			if (scrollContainer) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight;
			}
		};

		const timeoutId = setTimeout(scrollToBottom, 0);
		return () => clearTimeout(timeoutId);
		// biome-ignore lint/correctness/useExhaustiveDependencies: dependencies are passed as parameter for flexibility
	}, dependencies);

	return scrollAreaRef;
}
