import { Loader2 } from "lucide-react";

export function LoadingIndicator() {
	return (
		<div className="flex justify-start mb-4">
			<div className="bg-muted rounded-2xl px-4 py-3">
				<Loader2 className="size-4 animate-spin text-muted-foreground" />
			</div>
		</div>
	);
}
