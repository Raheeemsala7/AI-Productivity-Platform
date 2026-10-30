"use client";

import React, { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { AvatarUploader } from "@/shared/components/ui/avatar-uploader";
import { toast } from "sonner";
import { Loader2, Save, User as UserIcon, Mail, Palette, Sparkles, Check } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

interface ProfileInfoFormProps {
  user: User | null;
}

const PRESET_COLORS = [
  { name: "Blue", value: "#42a5f5" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Dark", value: "#334155" },
];

export function ProfileInfoForm({ user }: ProfileInfoFormProps) {
  const t = useTranslations("Settings");
  const router = useRouter();
  const queryClient = useQueryClient();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar ?? null
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      slogan: user?.slogan || "",
      avatar_color: user?.avatar_color || "#42a5f5",
    },
  });

  const selectedColor = watch("avatar_color");
  const currentName = watch("name");

  // React Query mutation wrapping Server Action
  const mutation = useMutation({
    mutationFn: async (values: UpdateProfileSchemaType) => {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.slogan) {
        formData.append("slogan", values.slogan);
      }
      formData.append("avatar_color", values.avatar_color);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await updateProfileAction(formData);
      if (!res.success) {
        throw new Error(res.message || "Failed to update profile");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || t("profileForm.successMessage"));
      // Invalidate global React Query profile cache immediately
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

  const handleImageChange = (file: File, previewUrl: string) => {
    setAvatarFile(file);
    setAvatarPreview(previewUrl);
  };

  const handleImageRemove = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
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
    <Card className="border-border/80 shadow-xs">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <UserIcon className="size-4" />
          </span>
          <CardTitle className="text-lg font-bold">
            {t("profileForm.title")}
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          {t("profileForm.description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar & Color Picker Section */}
          <div className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-4">
            <Label className="text-xs font-semibold text-foreground">
              {t("profileForm.avatarLabel")}
            </Label>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Uploader Preview */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <AvatarUploader
                  imageUrl={avatarPreview}
                  fallbackText={getInitials(currentName)}
                  borderColor={selectedColor}
                  glowColor={selectedColor}
                  size="md"
                  onImageChange={handleImageChange}
                  onImageRemove={handleImageRemove}
                  showRemoveButton={Boolean(avatarPreview)}
                />
                <span className="text-[11px] text-muted-foreground text-center">
                  {t("profileForm.avatarUploadHint")}
                </span>
              </div>

              {/* Color Presets */}
              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Palette className="size-3.5" />
                  <span>{t("profileForm.chooseColor")}</span>
                </div>

                <div className="flex flex-wrap gap-2.5 items-center">
                  {PRESET_COLORS.map((color) => {
                    const isSelected =
                      selectedColor.toLowerCase() === color.value.toLowerCase();
                    return (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setValue("avatar_color", color.value, { shouldDirty: true })}
                        className={cn(
                          "size-7 rounded-full transition-all relative flex items-center justify-center hover:scale-110 focus:outline-hidden",
                          isSelected
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
                            : "opacity-80 hover:opacity-100"
                        )}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {isSelected && (
                          <Check className="size-3.5 text-white drop-shadow-xs" />
                        )}
                      </button>
                    );
                  })}

                  {/* Custom Color Input */}
                  <div className="flex items-center gap-1.5 ms-2">
                    <input
                      type="color"
                      id="customColor"
                      value={selectedColor}
                      onChange={(e) =>
                        setValue("avatar_color", e.target.value, { shouldDirty: true })
                      }
                      className="size-7 cursor-pointer rounded-full border border-border bg-transparent p-0 overflow-hidden"
                    />
                    <Label
                      htmlFor="customColor"
                      className="text-[11px] text-muted-foreground cursor-pointer font-mono"
                    >
                      {selectedColor}
                    </Label>
                  </div>
                </div>

                {errors.avatar_color && (
                  <p className="text-xs text-destructive">
                    {errors.avatar_color.message}
                  </p>
                )}
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
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
            <Button
              type="submit"
              disabled={mutation.isPending || (!isDirty && !avatarFile)}
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
  );
}

