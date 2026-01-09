import { Loader2 } from "lucide-react";

export function LoadingIndicator() {
	return (
		<div className="flex justify-start mb-3 sm:mb-4">
			<div className="bg-muted rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3">
				<Loader2 className="size-4 sm:size-5 animate-spin text-muted-foreground" />
			</div>
		</div>
	);
}
