"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Plus, User, Mail, Lock, Coins, Shield, Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { createUserSchema, CreateUserFormType } from "../schema/user.schema";
import { createUserAction } from "../apis/users.action";
import { SubscriptionPlan } from "../types/user";

interface CreateUserDialogProps {
  plans?: SubscriptionPlan[];
}

export function CreateUserDialog({ plans = [] }: CreateUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("AdminUsers");

  const form = useForm<CreateUserFormType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      credits: 1000,
      status: 1,
      role: "user",
      subscription: "",
    },
  });

  const onSubmit = (values: CreateUserFormType) => {
    startTransition(async () => {
      try {
        const res = await createUserAction(values);
        if (res.success) {
          toast.success(t("createUserSuccess") || "User created successfully");
          form.reset();
          setOpen(false);
          router.refresh();
        } else {
          toast.error(res.message || "Failed to create user");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>{t("addUser")}</span>
          </Button>
        }
      />

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("createUserTitle") || "Create New User"}</DialogTitle>
          <DialogDescription>
            {t("createUserSubtitle") || "Fill in the details below to create a new user and assign a plan."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <User className="h-4 w-4 text-primary" />
                    <span>{t("name") || "Full Name"}</span>
                  </FieldLabel>
                  <Input
                    placeholder={t("namePlaceholder") || "John Doe"}
                    disabled={isPending}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{t("email") || "Email"}</span>
                  </FieldLabel>
                  <Input
                    type="email"
                    placeholder={t("emailPlaceholder") || "user@example.com"}
                    disabled={isPending}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Password & Password Confirmation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>{t("password") || "Password"}</span>
                  </FieldLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    disabled={isPending}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password_confirmation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>{t("passwordConfirmation") || "Confirm Password"}</span>
                  </FieldLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    disabled={isPending}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Status & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>{t("table.status") || "Status"}</span>
                  </FieldLabel>
                  <select
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={isPending}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value={1}>{t("status.active") || "Active"}</option>
                    <option value={0}>{t("status.inactive") || "Inactive"}</option>
                  </select>
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>{t("role") || "Role"}</span>
                  </FieldLabel>
                  <select
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={isPending}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="user">{t("roleUser") || "User"}</option>
                    <option value="admin">{t("roleAdmin") || "Admin"}</option>
                  </select>
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Credits & Subscription Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="credits"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Coins className="h-4 w-4 text-primary" />
                    <span>{t("table.credits") || "Initial Credits"}</span>
                  </FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    disabled={isPending}
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="subscription"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Crown className="h-4 w-4 text-primary" />
                    <span>{t("table.subscription") || "Plan"}</span>
                  </FieldLabel>
                  <select
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={isPending}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">{t("noSubscription") || "No Plan"}</option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              {t("cancel") || "Cancel"}
            </Button>
            <Button type="submit" disabled={isPending} className="min-w-28 gap-2">
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isPending ? t("saving") || "Saving..." : t("createUserBtn") || "Create User"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
