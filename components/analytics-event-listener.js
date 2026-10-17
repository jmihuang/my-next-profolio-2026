"use client";

import { useEffect } from "react";

export default function AnalyticsEventListener() {
  useEffect(() => {
    function trackClick(event) {
      const target = event.target.closest("[data-analytics-event]");
      if (!target || typeof window.gtag !== "function") return;

      window.gtag("event", target.dataset.analyticsEvent, {
        link_url: target.href,
        link_text: target.dataset.analyticsLabel || target.textContent?.trim(),
      });
    }

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  return null;
}
