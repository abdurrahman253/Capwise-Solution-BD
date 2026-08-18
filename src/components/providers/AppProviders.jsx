"use client";

import FloatingContact from "@/components/layout/FloatingContact";
import RouteTransitionLoader from "@/components/navigation/RouteTransitionLoader";
import SupportAssistant from "@/components/support/SupportAssistant";

import MotionProvider from "./MotionProvider";
import SmoothScrollProvider from "./SmoothScrollProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <RouteTransitionLoader />
      <MotionProvider><SmoothScrollProvider>{children}</SmoothScrollProvider></MotionProvider>
      <FloatingContact />
      <SupportAssistant />
      <ToastProvider />
    </ThemeProvider>
  );
}
