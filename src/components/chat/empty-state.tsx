export function EmptyState() {
	return (
		<div className="flex items-center justify-center h-full min-h-[400px]">
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-semibold text-foreground">
					Start a conversation
				</h2>
				<p className="text-muted-foreground">
					Type a message below to begin chatting
				</p>
			</div>
		</div>
	);
}
