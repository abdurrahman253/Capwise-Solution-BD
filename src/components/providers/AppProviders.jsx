"use client";

import ThemeProvider from "./ThemeProvider";
import MotionProvider from "./MotionProvider";
import SmoothScrollProvider from "./SmoothScrollProvider";
import ToastProvider from "./ToastProvider";
import SupportAssistant from "@/components/support/SupportAssistant";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <SupportAssistant />
      </MotionProvider>
      <ToastProvider />
    </ThemeProvider>
  );
}