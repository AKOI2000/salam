// app/providers/PostHogProvider.jsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

let phInitialized = false;

export default function PostHogProvider({ children }) {
  useEffect(() => {
    if (phInitialized) return;

    const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

    if (!key) {
      console.warn(
        "PostHog: NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is missing. Check your .env.local file."
      );
      return;
    }

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2026-01-30",
      capture_pageview: false, // handled manually in PostHogPageView
      capture_pageleave: true,
    });

    phInitialized = true;
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}