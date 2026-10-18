"use client";

import React, { useRef } from "react";
import { Image as ImageIcon, Paperclip, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { SUPPORTED_ATTACHMENT_EXTENSIONS } from "../constant/chat.attachment";

const IMAGE_ACCEPT = ["png", "jpg", "jpeg", "gif", "webp", "bmp"]
  .map((ext) => `.${ext}`)
  .join(",");

const FILE_ACCEPT = SUPPORTED_ATTACHMENT_EXTENSIONS.map((ext) => `.${ext}`).join(",");

interface ChatAttachmentDropdownProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export default function ChatAttachmentDropdown({
  onFilesSelected,
  disabled = false,
}: ChatAttachmentDropdownProps) {
  const t = useTranslations("Chat");
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePick = (list: FileList | null) => {
    if (list && list.length > 0) {
      onFilesSelected(Array.from(list));
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t("attachFile")}
          disabled={disabled}
          className="mb-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 md:size-7"
          render={(props) => <button type="button" {...props} />}
        >
          <Plus size={15} />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" side="top" sideOffset={8} className="min-w-44 p-1.5">
          <DropdownMenuItem onClick={() => imageInputRef.current?.click()}>
            <ImageIcon size={15} strokeWidth={1.75} />
            {t("addImage")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
            <Paperclip size={15} strokeWidth={1.75} />
            {t("addFile")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={imageInputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        multiple
        hidden
        onChange={(e) => handlePick(e.target.files)}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept={FILE_ACCEPT}
        multiple
        hidden
        onChange={(e) => handlePick(e.target.files)}
      />
    </>
  );
}
