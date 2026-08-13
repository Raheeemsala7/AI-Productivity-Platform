
"use client";

import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { SidebarMenuButton } from "../ui/sidebar";

export default function SignOutButton() {
    const [isPending, startTransition] = useTransition();
    const t = useTranslations("Auth");

    const handleSignOut = async () => {
        startTransition(async () => await signOut({
            callbackUrl: "/auth/login",
        }));
    }
    return (
        <SidebarMenuButton
            tooltip={t("signOut")}
            className="text-muted-foreground cursor-pointer"
            disabled={isPending}
            onClick={handleSignOut}
        >
            {isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
            <span>{t("signOut")}</span>
        </SidebarMenuButton>
    )
}
