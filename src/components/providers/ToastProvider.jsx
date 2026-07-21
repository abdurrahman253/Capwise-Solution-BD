"use client";

import { useTheme } from "next-themes";
import { CheckCircle2, CircleAlert, Info, LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";

import useMounted from "@/hooks/useMounted";

export default function ToastProvider() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={10}
      containerClassName="capwise-toast-region"
      containerStyle={{ top: 18, right: 18, zIndex: 120 }}
      toastOptions={{
        duration: 3800,
        className: "capwise-toast",
        icon: <Info aria-hidden="true" size={19} color="#14b8a6" />,
        style: {
          background:
            resolvedTheme === "dark"
              ? "rgba(11, 31, 51, 0.96)"
              : "rgba(255, 255, 255, 0.96)",
          color: resolvedTheme === "dark" ? "#eaf2f7" : "#0f172a",
          border:
            resolvedTheme === "dark"
              ? "1px solid rgba(94, 234, 212, 0.18)"
              : "1px solid rgba(15, 118, 110, 0.14)",
          boxShadow:
            resolvedTheme === "dark"
              ? "0 24px 70px rgba(0, 0, 0, 0.4)"
              : "0 24px 70px rgba(11, 31, 51, 0.16)",
        },
        success: {
          icon: <CheckCircle2 aria-hidden="true" size={19} color="#14b8a6" />,
        },
        error: {
          duration: 4800,
          icon: <CircleAlert aria-hidden="true" size={19} color="#ef4444" />,
        },
        loading: {
          duration: Infinity,
          icon: (
            <LoaderCircle
              aria-hidden="true"
              size={19}
              color="#14b8a6"
              className="animate-spin motion-reduce:animate-none"
            />
          ),
        },
      }}
    />
  );
}