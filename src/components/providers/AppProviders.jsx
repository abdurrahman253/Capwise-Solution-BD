"use client";

import FloatingContact from "@/components/layout/FloatingContact";
import SupportAssistant from "@/components/support/SupportAssistant";

import MotionProvider from "./MotionProvider";
import SmoothScrollProvider from "./SmoothScrollProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <MotionProvider><SmoothScrollProvider>{children}</SmoothScrollProvider></MotionProvider>
      <FloatingContact />
      <SupportAssistant />
      <ToastProvider />
    </ThemeProvider>
  );
}
