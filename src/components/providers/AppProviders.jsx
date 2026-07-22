"use client";

import RouteTransitionLoader from "@/components/navigation/RouteTransitionLoader";
import SupportAssistant from "@/components/support/SupportAssistant";

import SmoothScrollProvider from "./SmoothScrollProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <RouteTransitionLoader />
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
      <SupportAssistant />
      <ToastProvider />
    </ThemeProvider>
  );
}
