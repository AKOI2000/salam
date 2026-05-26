// app/providers/PostHogProvider.jsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export default function PostHogProvider({ children }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

    if (!key) {
      console.warn(
        "PostHog: NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is missing. Check your .env.local file.",
      );
      return;
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2026-01-30",
      capture_pageview: false, // we handle this manually — see File 2
      capture_pageleave: true,
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
