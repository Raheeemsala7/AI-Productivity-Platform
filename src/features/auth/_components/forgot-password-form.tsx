"use client";

import { forgotPasswordAction } from "@/features/auth/apis/auth.action";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/features/auth/schema/auth.schema";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("ForgetPassword");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    startTransition(async () => {
      try {
        const res = await forgotPasswordAction(data);
        toast.success(res.message || t("forgotPasswordSuccess"));
        form.reset();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : t("forgotPasswordError");
        toast.error(message);
      }
    });
  };

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
                  placeholder={t("emailPlaceholder")}
                  className="w-full !bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60"
                  autoComplete="email"
                  {...field}
                />
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold disabled:opacity-70"
        >
          {isPending ? t("sendingResetLink") : t("sendResetLink")}
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
