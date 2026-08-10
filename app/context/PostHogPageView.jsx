'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { useEffect, useRef } from 'react'

export default function PostHogPageView() {
  const pathname     = usePathname()
  const searchParams = useSearchParams()
  const posthog      = usePostHog()
  const lastPath     = useRef(null)  // ← tracks last fired path

  useEffect(() => {
    if (!pathname || !posthog) return

    const url = window.location.origin + pathname +
      (searchParams.toString() ? `?${searchParams.toString()}` : '')

    // Only fire if the path actually changed
    if (lastPath.current === url) return
    lastPath.current = url

    posthog.capture('$pageview', { $current_url: url })

  }, [pathname, searchParams, posthog])

  return null
}