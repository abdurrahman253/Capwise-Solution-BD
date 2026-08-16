"use client";

import RouteTransitionLoader from "@/components/navigation/RouteTransitionLoader";
import SupportAssistant from "@/components/support/SupportAssistant";
import CustomCursor from "@/components/ui/CustomCursor";

import MotionProvider from "./MotionProvider";
import SmoothScrollProvider from "./SmoothScrollProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <RouteTransitionLoader />
      <CustomCursor />
      <MotionProvider><SmoothScrollProvider>{children}</SmoothScrollProvider></MotionProvider>
      <SupportAssistant />
      <ToastProvider />
    </ThemeProvider>
  );
}
