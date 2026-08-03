"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { registerSchema } from '../schema/auth.schema';
import { RegisterFormValues } from '../types/auth';
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { useRegisterMutation } from '../hooks/auth.hook';

export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isPending, startTransition] = useTransition()

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

    /**
     * Submit register form
     */
    const onSubmit = async (data: RegisterFormValues) => {
        startTransition(async () => {
            console.log(data);

            await mutateAsync(data);
        });
    };
    return (
        <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            {/* Name */}
            <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>Full name</FieldLabel>

                        <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                            <User className="h-4 w-4 text-muted-foreground" />

                            <input
                                {...field}
                                type="text"
                                placeholder="Karem Mostafa"
                                className="w-full bg-transparent py-3 text-sm outline-none"
                            />
                        </div>

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* Email */}
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>Email</FieldLabel>

                        <div className="flex items-center gap-2 rounded-xl border border-input px-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />

                            <input
                                {...field}
                                type="email"
                                placeholder="karem@gmail.com"
                                className="w-full bg-transparent py-3 text-sm outline-none"
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

            {/* Confirm Password */}
            <Controller
                name="password_confirmation"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>Confirm password</FieldLabel>

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

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className="btn-primary mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold disabled:opacity-70"
            >
                {isPending ? "Creating account..." : "Create account"}

                {!isPending && (
                    <ArrowRight className="h-4 w-4" />
                )}
            </button>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="font-medium text-primary hover:text-primary-glow"
                >
                    Sign in
                </Link>
            </p>
        </form>
    )
}
