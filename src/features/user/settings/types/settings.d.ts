import { z } from "zod";
import { User } from "@/features/auth/types/auth";
import { updateProfileSchema } from "../schema/settings.schema";

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export interface ColorPreset {
  name: string;
  value: string;
  border: string;
}

export interface SettingsViewProps {
  initialUser: User | null;
}

