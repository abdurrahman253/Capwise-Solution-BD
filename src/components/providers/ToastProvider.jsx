"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={3}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}