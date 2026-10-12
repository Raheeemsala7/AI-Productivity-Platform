"use client";

import { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { User, Mail, Coins, ShieldCheck, FileText, ArrowLeft, Loader2, Crown, Shield } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { updateUserSchema, UpdateUserFormType } from "../schema/user.schema";
import { updateUserAction } from "../apis/users.action";
import { SubscriptionPlan, UserAdmin } from "../types/user";

interface EditUserFormProps {
  user: UserAdmin;
  currentPlan?: string | null;
  plans?: SubscriptionPlan[];
}

export function EditUserForm({ user, currentPlan, plans = [] }: EditUserFormProps) {
  const router = useRouter();
  const t = useTranslations("AdminUsers");
  const [isPending, startTransition] = useTransition();

  console.log(user);


  const form = useForm<UpdateUserFormType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      status: user?.status ?? 1,
      credits: user?.credits ?? 0,
      role: user?.role || "user",
      subscription: currentPlan,
    },
  });

  function onSubmit(values: UpdateUserFormType) {
    startTransition(async () => {
      try {
        const res = await updateUserAction(user.id, values);

        if (!res.success) {
          toast.error(res.message || "Failed to update user");
          return;
        }

        toast.success(t("updateSuccess") || "User updated successfully");
        router.push("/admin/users");
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            {t("editUserTitle") || "Edit User"}
          </CardTitle>
          <Link
            href="/admin/users"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            )}
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            <span>{t("back") || "Back"}</span>
          </Link>
        </div>
        <CardDescription>
          {t("editUserSubtitle") || "Update user account information, settings, and subscription plan."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="flex items-center gap-1.5 font-medium">
                  <User className="h-4 w-4 text-primary" />
                  <span>{t("name") || "Name"}</span>
                </FieldLabel>
                <Input
                  placeholder={t("namePlaceholder") || "Enter full name"}
                  disabled={isPending}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-500 text-xs"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          {/* Email Field */}
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
                  <FieldError
                    className="text-red-500 text-xs"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status Field */}
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="h-4 w-4 text-primary" />
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
                    <FieldError
                      className="text-red-500 text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* Role Field */}
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
                    value={field.value || "user"}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={isPending}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="user">{t("roleUser") || "User"}</option>
                    <option value="admin">{t("roleAdmin") || "Admin"}</option>
                  </select>
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Credits Field */}
            <Controller
              name="credits"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="flex items-center gap-1.5 font-medium">
                    <Coins className="h-4 w-4 text-primary" />
                    <span>{t("table.credits") || "Credits"}</span>
                  </FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    disabled={isPending}
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* Subscription Plan Field */}
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
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={isPending}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">{t("noSubscription") || "No Plan"}</option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={String(plan.id)}>
                        {plan.name} {plan.price ? `(${plan.price}$)` : ""}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError
                      className="text-red-500 text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </div>


          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Link
              href="/admin/users"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t("cancel") || "Cancel"}
            </Link>
            <Button type="submit" disabled={isPending} className="min-w-28 gap-2">
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isPending ? t("saving") || "Saving..." : t("saveChanges") || "Save Changes"}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
