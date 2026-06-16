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
        success: <CircleCheckIcon className="size-4 text-primary" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "#162847",
          "--normal-text": "#ffffff",
          "--normal-border": "rgba(255,255,255,0.12)",
          "--success-bg": "#162847",
          "--success-text": "#ffffff",
          "--success-border": "rgba(255,255,255,0.25)",
          "--error-bg": "#162847",
          "--error-text": "#ffffff",
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
