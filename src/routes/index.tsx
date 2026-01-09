import { createFileRoute } from "@tanstack/react-router";
import { Chat } from "@/components/chat";
import { authMiddleware } from "@/middleware/auth";

export const Route = createFileRoute("/")({
	component: App,
	server: {
		middleware: [authMiddleware],
	},
});

function App() {
	return <Chat />;
}
