

"use client";

import { Loader2, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useTransition } from "react";

export default function SignOutButton() {
    const [isPending, startTransition] = useTransition();
    const handleSignOut = async () => {
        startTransition(async () => await signOut({
            callbackUrl: "/auth/login",
        }));
    }
    return (
        <Button
            variant="ghost"
            className="w-full bg-transparent flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            disabled={isPending}
            onClick={handleSignOut}
        >
            {isPending && <Loader2 className="animate-spin transition-all" />}
            <LogOut className="h-4 w-4" />
            Sign out
        </Button>
    )
}
