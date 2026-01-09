import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/unauthorized")({
	component: UnauthorizedPage,
});

function UnauthorizedPage() {
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await authClient.signOut();
		navigate({ to: "/login" });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 safe-area-inset-top safe-area-inset-bottom">
			<div className="w-full max-w-md space-y-6 sm:space-y-8 rounded-lg border bg-card p-6 sm:p-8 shadow-lg">
				<div className="text-center space-y-2">
					<div className="mx-auto mb-4 flex size-16 sm:size-20 items-center justify-center rounded-full bg-destructive/10">
						<svg
							className="size-8 sm:size-10 text-destructive"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							role="img"
							aria-label="Unauthorized"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h1 className="text-2xl sm:text-3xl font-bold">
						Acceso no autorizado
					</h1>
					<p className="text-sm sm:text-base text-muted-foreground">
						Tu cuenta no tiene permisos para acceder a esta aplicación. Por
						favor, contacta al administrador si crees que esto es un error.
					</p>
				</div>
				<div className="space-y-3">
					<Button
						onClick={handleSignOut}
						className="w-full"
						size="lg"
						variant="default"
					>
						Cerrar sesión
					</Button>
					<Button
						onClick={() => navigate({ to: "/login" })}
						className="w-full"
						size="lg"
						variant="outline"
					>
						Volver al inicio de sesión
					</Button>
				</div>
			</div>
		</div>
	);
}
