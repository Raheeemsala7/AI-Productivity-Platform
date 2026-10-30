"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/features/auth/types/auth";
import {
  updateProfileSchema,
  UpdateProfileSchemaType,
} from "../schema/settings.schema";
import { updateProfileAction } from "../apis/settings.action";
import { USER_PROFILE_QUERY_KEY } from "@/features/auth/hooks/use-user-profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  User as UserIcon,
  Mail,
  Eye,
  Sparkles,
} from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ProfileInfoFormProps {
  user: User | null;
}

export function ProfileInfoForm({ user }: ProfileInfoFormProps) {
  const t = useTranslations("Settings");
  const router = useRouter();
  const queryClient = useQueryClient();

  const avatarColor = user?.avatar_color || "#42a5f5";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      slogan: user?.slogan || "",
    },
  });

  const currentName = watch("name") || user?.name || "User";
  const currentSlogan = watch("slogan") || user?.slogan || "";

  // React Query mutation wrapping Server Action
  const mutation = useMutation({
    mutationFn: async (values: UpdateProfileSchemaType) => {
      const res = await updateProfileAction({
        name: values.name,
        slogan: values.slogan,
      });

      if (!res.success) {
        throw new Error(res.message || "Failed to update profile");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || t("profileForm.successMessage"));
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
      router.refresh();
    },
    onError: (err: any) => {
      toast.error(err.message || t("profileForm.errorMessage"));
    },
  });

  const onSubmit = (values: UpdateProfileSchemaType) => {
    mutation.mutate(values);
  };

  const getInitials = (name?: string) =>
    name
      ? name
          .trim()
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Form Left Side (2 cols) */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-border/80 shadow-xs">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserIcon className="size-4" />
              </span>
              <CardTitle className="text-base font-bold">
                {t("profileForm.title")}
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              {t("profileForm.description")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Dynamic Color Avatar Banner */}
              <div className="rounded-xl border border-border/70 bg-muted/20 p-5 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative shrink-0">
                  <Avatar className="size-16 ring-3 ring-border/80 shadow-xs transition-transform duration-300">
                    <AvatarFallback
                      className="text-xl font-bold text-white transition-all duration-300"
                      style={{ backgroundColor: avatarColor }}
                    >
                      {getInitials(currentName)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="absolute -bottom-1 -end-1 size-4.5 rounded-full ring-2 ring-card"
                    style={{ backgroundColor: avatarColor }}
                  />
                </div>

                <div className="space-y-1 text-center sm:text-start flex-1">
                  <span className="text-xs font-semibold text-foreground flex items-center justify-center sm:justify-start gap-1.5">
                    <Sparkles className="size-3.5 text-brand" />
                    <span>{t("profileForm.avatarLabel")}</span>
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {t("profileForm.avatarSystemNote")}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-muted-foreground">
                    <span>لون الحساب:</span>
                    <span className="font-mono font-semibold" style={{ color: avatarColor }}>
                      {avatarColor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-medium">
                    {t("profileForm.name")} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder={t("profileForm.namePlaceholder")}
                    {...register("name")}
                    className="h-9 text-sm"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="text-xs font-medium">
                      {t("profileForm.email")}
                    </Label>
                    <span className="text-[10px] text-muted-foreground">
                      {t("profileForm.emailNotice")}
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      id="email"
                      value={user?.email || ""}
                      disabled
                      readOnly
                      className="h-9 text-sm bg-muted/50 ps-8 text-muted-foreground cursor-not-allowed"
                    />
                    <Mail className="size-3.5 text-muted-foreground absolute start-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Slogan / Bio */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="slogan" className="text-xs font-medium">
                    {t("profileForm.slogan")}
                  </Label>
                  <Input
                    id="slogan"
                    placeholder={t("profileForm.sloganPlaceholder")}
                    {...register("slogan")}
                    className="h-9 text-sm"
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {t("profileForm.sloganHelp")}
                  </span>
                  {errors.slogan && (
                    <p className="text-xs text-destructive">{errors.slogan.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Action */}
              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <span className="text-xs text-muted-foreground">
                  {isDirty ? "لديك تعديلات غير محفوظة" : "البيانات متزامنة بالكامل"}
                </span>

                <Button
                  type="submit"
                  disabled={mutation.isPending || !isDirty}
                  className="gap-2 px-5 text-xs h-9"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>{t("profileForm.saving")}</span>
                    </>
                  ) : (
                    <>
                      <Save className="size-3.5" />
                      <span>{t("profileForm.saveChanges")}</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Live Platform Preview Card (1 col) */}
      <div className="space-y-4">
        <Card className="border-border/80 bg-gradient-to-br from-card via-card/95 to-muted/30 shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Eye className="size-4" />
              </span>
              <CardTitle className="text-sm font-bold">
                {t("profileForm.previewTitle")}
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              {t("profileForm.previewDesc")}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Header / Sidebar Footer Preview */}
            <div className="rounded-xl border border-border/80 bg-background p-3.5 shadow-2xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2.5">
                معاينة شريط المحادثة والسايدبار
              </span>
              <div className="flex items-center gap-3">
                <Avatar className="size-11 ring-2 ring-border/80 shadow-2xs">
                  <AvatarFallback
                    style={{ backgroundColor: avatarColor }}
                    className="text-xs font-bold text-white transition-colors duration-300"
                  >
                    {getInitials(currentName)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-foreground truncate">
                      {currentName}
                    </span>
                    <span className="rounded-md bg-brand/10 px-1.5 py-0.5 text-[9px] font-semibold text-brand border border-brand/20">
                      {user?.plan?.name || "Starter"}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground truncate block">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Slogan preview chip */}
            {currentSlogan && (
              <div className="rounded-xl border border-border/80 bg-background p-3 shadow-2xs">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                  الشعار التعريفي
                </span>
                <span className="inline-block rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground border border-border/60">
                  {currentSlogan}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
