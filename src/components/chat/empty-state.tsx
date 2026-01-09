export function EmptyState() {
	return (
		<div className="flex items-center justify-center h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] px-4">
			<div className="text-center space-y-2 sm:space-y-3 max-w-md">
				<h2 className="text-xl sm:text-2xl font-semibold text-foreground">
					Start a conversation
				</h2>
				<p className="text-sm sm:text-base text-muted-foreground">
					Type a message below to begin chatting
				</p>
			</div>
		</div>
	);
}
