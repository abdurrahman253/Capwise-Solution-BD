"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

import useMounted from "@/hooks/useMounted";

export default function ToastProvider() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  if (!mounted) return null;

  return (
    <ToastContainer
      position="top-right"
      autoClose={4200}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      limit={3}
      className="capwise-toast-region"
      toastClassName="capwise-toast"
      progressClassName="capwise-toast-progress"
      aria-label="Website notifications"
    />
  );
}
