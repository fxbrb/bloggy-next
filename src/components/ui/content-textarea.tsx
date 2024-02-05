"use client";

import clsx from "clsx";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useRef,
} from "react";
import { Textarea } from "@/components/ui/textarea";

export const ContentTextArea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(({ onChange, className, rows = 1, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  };

  return (
    <Textarea
      ref={ref}
      onChange={(e) => {
        handleChange(e);
        onChange?.(e);
      }}
      rows={rows}
      className={clsx(className, "resize-none")}
      {...props}
    />
  );
});

ContentTextArea.displayName = "ContentTextArea";
