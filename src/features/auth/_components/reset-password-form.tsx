"use client";

import { resetPasswordAction } from "@/features/auth/apis/auth.action";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/features/auth/schema/auth.schema";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type ResetPasswordFormProps = {
  token?: string;
  email?: string;
};

export default function ResetPasswordForm({
  token = "",
  email = "",
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("Auth");

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      token,
      password: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    startTransition(async () => {
      try {
        const res = await resetPasswordAction(data);
        toast.success(res.message || t("resetPasswordSuccess"));
        router.push("/auth/login");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : t("resetPasswordError");
        toast.error(message);
      }
    });
  };

  if (!token || !email) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          {t("resetPasswordInvalidLink")}
        </p>
        <Link
          href="/auth/forgot-password"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-glow"
        >
          {t("requestNewResetLink")}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>{t("workEmail")}</FieldLabel>

              <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                <Mail className="h-4 w-4 text-muted-foreground" />

                <input
                  type="email"
                  readOnly
                  className="w-full !bg-transparent py-3 text-sm outline-none text-muted-foreground"
                  {...field}
                />
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>{t("newPassword")}</FieldLabel>

              <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                <Lock className="h-4 w-4 text-muted-foreground" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full !bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60"
                  autoComplete="new-password"
                  {...field}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <input type="hidden" {...form.register("token")} />

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold disabled:opacity-70"
        >
          {isPending ? t("resettingPassword") : t("resetPasswordAction")}
          {!isPending && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary-glow"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToSignIn")}
        </Link>
      </p>
    </div>
  );
}
