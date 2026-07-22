"use client";

import ThemeProvider from "./ThemeProvider";
import MotionProvider from "./MotionProvider";
import SmoothScrollProvider from "./SmoothScrollProvider";
import ToastProvider from "./ToastProvider";
import SupportAssistant from "@/components/support/SupportAssistant";
import RouteTransitionLoader from "@/components/navigation/RouteTransitionLoader";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <RouteTransitionLoader />
      <MotionProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <SupportAssistant />
      </MotionProvider>
      <ToastProvider />
    </ThemeProvider>
  );
}