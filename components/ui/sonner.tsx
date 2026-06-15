"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-gold" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "#1a1714",
          "--normal-text": "#f7f3ec",
          "--normal-border": "rgba(232,226,217,0.12)",
          "--success-bg": "#1a1714",
          "--success-text": "#f7f3ec",
          "--success-border": "rgba(196,154,101,0.35)",
          "--error-bg": "#1a1714",
          "--error-text": "#f7f3ec",
          "--error-border": "rgba(179,38,30,0.45)",
          "--border-radius": "0.875rem",
          "--font-family": "var(--font-lato, sans-serif)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
