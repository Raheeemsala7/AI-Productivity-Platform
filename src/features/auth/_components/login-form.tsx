"use client"
import { LoginFormValues, loginSchema } from '../schema/auth.schema';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isPending, startTransition] = useTransition()
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    /**
 * Submit login form
 */
    const onSubmit = async (data: LoginFormValues) => {
        console.log(data);
        startTransition(async () => {

            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                remember: data.remember,
                redirect: false
            })

            if (res?.error === "Invalid credentials") {
                toast.error("Invalid credentials")
                return
            }
            toast.success("Login successful")
            window.location.href = "/dashboard"
        })

    };
    return (
        <div>
            <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* Email */}
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Work email</FieldLabel>

                            <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />

                                <input
                                    type="email"
                                    placeholder="founder@company.com"
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

                {/* Password */}
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Password</FieldLabel>

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

                {/* Remember me */}
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
                        Keep me signed in
                    </label>

                    <span className="cursor-pointer text-primary/90 hover:text-primary">
                        Forgot password?
                    </span>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold disabled:opacity-70"
                >
                    {isPending ? "Signing in..." : "Sign in"}
                    {!isPending && (
                        <ArrowRight className="h-4 w-4" />
                    )}
                </button>
            </form>

            {/* <Divider /> */}

            <div className="grid gap-2 sm:grid-cols-2">
                {/* <SocialButton label="Google" />
                <SocialButton label="Microsoft" /> */}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                New to ORICO?{" "}
                <Link
                    href="/auth/register"
                    className="font-medium text-primary hover:text-primary-glow"
                >
                    Create an account
                </Link>
            </p>
        </div>
    )
}
