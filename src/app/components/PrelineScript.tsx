"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { IStaticMethods } from "preline/preline";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    import("preline/preline");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }, [path]);

  return null;
}