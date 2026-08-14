"use client"
import { LoginFormValues, loginSchema } from '../schema/auth.schema';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { useState, useTransition } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { AuthDivider } from './auth-divider';
import { GoogleSignInButton } from './google-sign-in-button';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const t = useTranslations("Auth")

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        startTransition(async () => {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                remember: data.remember,
                redirect: false
            })
            console.log("res", res)

            if (res?.error === "Invalid credentials") {
                toast.error(t("invalidCredentials"))
                return
            }
            toast.success(t("loginSuccess"))
            window.location.href = "/dashboard"
        })
    };

    return (
        <div>
            <GoogleSignInButton variant="signIn" />
            <AuthDivider />

            <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
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
                                    autoComplete="off"
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
                            <FieldLabel>{t("password")}</FieldLabel>

                            <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                                <Lock className="h-4 w-4 text-muted-foreground" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full !bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60"
                                    autoComplete="off"
                                    {...field}
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

                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-muted-foreground">
                        <Controller
                            name="remember"
                            control={form.control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    className="h-3.5 w-3.5 accent-[color:var(--primary)]"
                                />
                            )}
                        />
                        {t("rememberMe")}
                    </label>

                    <Link
                        href="/auth/forgot-password"
                        className="text-primary/90 hover:text-primary"
                    >
                        {t("forgotPassword")}
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold disabled:opacity-70"
                >
                    {isPending ? t("signingIn") : t("signIn")}
                    {!isPending && (
                        <ArrowRight className="h-4 w-4" />
                    )}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                {t("newToOrico")}{" "}
                <Link
                    href="/auth/register"
                    className="font-medium text-primary hover:text-primary-glow"
                >
                    {t("createAccount")}
                </Link>
            </p>
        </div>
    )
}
