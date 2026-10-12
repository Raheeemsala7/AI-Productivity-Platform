"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { deleteUserAction } from "../apis/users.action";

interface DeleteUserButtonProps {
  userId: number | string;
  userName?: string;
}

export function DeleteUserButton({ userId, userName }: DeleteUserButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("AdminUsers");

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deleteUserAction(userId);
        if (res.status) {
          toast.success(t("deleteSuccess") || "User deleted successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(res.message || "Failed to delete user");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
            title={t("delete") || "Delete"}
          />
        }
      >
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("deleteDialogTitle") || "Delete User"}</DialogTitle>
          <DialogDescription>
            {t("deleteDialogDesc", { name: userName || "" }) ||
              `Are you sure you want to delete ${userName ? `"${userName}"` : "this user"}? This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose
            render={
              <Button variant="outline" disabled={isPending}>
                {t("cancel") || "Cancel"}
              </Button>
            }
          />
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="gap-2"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("confirmDelete") || "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
