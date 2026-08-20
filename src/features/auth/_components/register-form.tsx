"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { registerSchema } from '../schema/auth.schema';
import { RegisterFormValues } from '../types/auth';
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { useRegisterMutation } from '../hooks/auth.hook';
import { useTranslations } from 'next-intl';
import { AuthDivider } from './auth-divider';
import { GoogleSignInButton } from './google-sign-in-button';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/utils/get-error-message';

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isPending, startTransition] = useTransition()
    const t = useTranslations("Auth")

    const { mutateAsync } = useRegisterMutation()
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),

        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        startTransition(async () => {
            try {
                const res = await mutateAsync(data);
                if (res.status) {
                    toast.success(res.message)
                    form.reset()
                }
            } catch (error) {
                toast.error(getErrorMessage(error, t("registerError")));
            }
        });
    };

    return (
        <div>
            <GoogleSignInButton variant="signUp" />
            <AuthDivider />

            <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>{t("fullName")}</FieldLabel>

                            <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                                <User className="h-4 w-4 text-muted-foreground" />

                                <input
                                    {...field}
                                    type="text"
                                    placeholder={t("namePlaceholder")}
                                    className="w-full bg-transparent py-3 text-sm outline-none"
                                />
                            </div>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>{t("workEmail")}</FieldLabel>

                            <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />

                                <input
                                    {...field}
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    className="w-full bg-transparent py-3 text-sm outline-none"
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
                            <FieldLabel>{t("password")}</FieldLabel>

                            <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                                <Lock className="h-4 w-4 text-muted-foreground" />

                                <input
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent py-3 text-sm outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
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

                <Controller
                    name="password_confirmation"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>{t("confirmPassword")}</FieldLabel>

                            <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                                <Lock className="h-4 w-4 text-muted-foreground" />

                                <input
                                    {...field}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent py-3 text-sm outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((v) => !v)
                                    }
                                >
                                    {showConfirmPassword ? (
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

                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold disabled:opacity-70"
                >
                    {isPending ? t("signingUp") : t("signUp")}

                    {!isPending && (
                        <ArrowRight className="h-4 w-4" />
                    )}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                    {t("alreadyHaveAccount")}{" "}
                    <Link
                        href="/auth/login"
                        className="font-medium text-primary hover:text-primary-glow"
                    >
                        {t("signIn")}
                    </Link>
                </p>
            </form>
        </div>
    )
}
