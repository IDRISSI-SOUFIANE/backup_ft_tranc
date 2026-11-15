"use client"

export const colors = {
  primary: "#4F46E5",
  primaryHover: "#4338CA",
  secondary: "#64748B",
  success: "#16A34A",
  danger: "#DC2626",
  warning: "#D97706",
  info: "#0284C7",
  gray900: "#111827",
  gray600: "#4B5563",
  gray300: "#D1D5DB",
  gray100: "#F3F4F6",
  white: "#FFFFFF",
} as const;
 
export type ColorToken = keyof typeof colors;