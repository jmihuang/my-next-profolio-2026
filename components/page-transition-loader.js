"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import logo from "@/app/assets/image/logo.png";

const MINIMUM_VISIBLE_TIME = 360;
const SAFETY_TIMEOUT = 6000;

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const startedAtRef = useRef(0);
  const safetyTimerRef = useRef(null);

  useEffect(() => {
    function finishLoading() {
      if (!startedAtRef.current) return;

      const remainingTime = Math.max(0, MINIMUM_VISIBLE_TIME - (Date.now() - startedAtRef.current));
      window.setTimeout(() => {
        window.clearTimeout(safetyTimerRef.current);
        startedAtRef.current = 0;
        setIsLoading(false);
      }, remainingTime);
    }

    function startLoading() {
      if (startedAtRef.current) return;

      startedAtRef.current = Date.now();
      setIsLoading(true);
      safetyTimerRef.current = window.setTimeout(finishLoading, SAFETY_TIMEOUT);
    }

    function handleInternalNavigation(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      const isSamePage = destination.pathname === current.pathname;

      if (destination.origin !== current.origin || isSamePage) return;
      startLoading();
    }

    document.addEventListener("click", handleInternalNavigation, true);
    window.addEventListener("pageshow", finishLoading);

    return () => {
      document.removeEventListener("click", handleInternalNavigation, true);
      window.removeEventListener("pageshow", finishLoading);
      window.clearTimeout(safetyTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (startedAtRef.current) {
      const remainingTime = Math.max(0, MINIMUM_VISIBLE_TIME - (Date.now() - startedAtRef.current));
      const timer = window.setTimeout(() => {
        window.clearTimeout(safetyTimerRef.current);
        startedAtRef.current = 0;
        setIsLoading(false);
      }, remainingTime);
      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div
      aria-live="polite"
      aria-busy={isLoading}
      className={`fixed inset-0 z-[1200] grid place-items-center bg-[#F7F6F2]/92 backdrop-blur-sm transition-opacity duration-300 ${isLoading ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="flex flex-col items-center gap-7">
        <Image
          src={logo}
          alt="Jamie Studio"
          width={300}
          height={40}
          className="h-auto w-[220px] animate-pulse"
          priority
        />
        <div className="h-px w-24 overflow-hidden bg-black/10">
          <span className="block h-full w-1/2 animate-[loading-bar_0.9s_ease-in-out_infinite] bg-[#5FA391]" />
        </div>
        <span className="sr-only">Loading next page</span>
      </div>
    </div>
  );
}
