import cloudinary from "./cloudinary";
import { startOfMonth, endOfMonth, format } from "date-fns";

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;

// helpers.js
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

export async function uploadToCloudinary(file) {
  const isVideo = file.type?.startsWith("video/");
  const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

  if (file.size > maxSize) {
    const limitMb = maxSize / (1024 * 1024);
    throw new Error(
      `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is ${limitMb}MB.`
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "Salam_Project", resource_type: "auto" },
        (error, result) => {
          if (error || !result) {
            reject(new Error(translateCloudinaryError(error)));
            return;
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: result.resource_type,
          });
        }
      )
      .end(buffer);
  });
}

function translateCloudinaryError(error) {
  if (!error) return "Upload failed for an unknown reason. Please try again.";

  // Cloudinary's own file-size rejection (in case it slips past our own check)
  if (error.http_code === 400 && /too large|exceeds/i.test(error.message ?? "")) {
    return "File is too large for upload. Please use a smaller image or video.";
  }

  // network-level failures (fetch/stream aborted, DNS, etc.)
  if (error.message?.includes("ECONNRESET") || error.message?.includes("ETIMEDOUT")) {
    return "The upload was interrupted, likely due to a network issue. Please check your connection and try again.";
  }

  if (error.http_code === 401 || error.http_code === 403) {
    return "Upload was rejected — there may be a configuration issue. Please contact support.";
  }

  if (error.http_code === 420 || error.http_code === 429) {
    return "Too many uploads at once. Please wait a moment and try again.";
  }

  // fallback — still readable, not raw SDK internals
  return error.message || "Upload failed. Please try again.";
}

// kept for any legacy URLs saved before this change — new uploads
// should always use the publicId stored at upload time instead
export function getPublicIdFromUrl(url) {
  const afterUpload = url.split("/upload/")[1];
  const withoutVersion = afterUpload.replace(/v\d+\//, "");
  const publicId = withoutVersion.replace(/\.[^.]+$/, "");
  return publicId;
}

export async function deleteFromCloudinary(publicId, resourceType) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType === "video" ? "video" : "image",
  });
}

export const calcChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

// ─────────────────────────────────────────────
// HELPER: run a HogQL query
// ─────────────────────────────────────────────
export async function fetchHogQL(sql) {
  const res = await fetch(`${POSTHOG_HOST}/api/projects/${PROJECT_ID}/query/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query: sql } }),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HogQL error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const cols = data.columns ?? [];
  return (data.results ?? []).map((row) =>
    Object.fromEntries(cols.map((col, i) => [col, row[i]])),
  );
}

// ─────────────────────────────────────────────
// HELPER: date range
// ─────────────────────────────────────────────
export function getMonthRange(date) {
  return {
    from: format(startOfMonth(date), "yyyy-MM-dd"),
    to: format(endOfMonth(date), "yyyy-MM-dd"),
  };
}



export function groupByMonth(items) {
  return items.reduce((acc, item) => {
    const key = format(new Date(item?.createdAt), "yyyy-MM");

    acc[key] = (acc[key] || 0) + 1;

    return acc;
  }, {});
}


  // export async function getDashboardChart() {
  //   const res = await fetch("/api/dashboardChart");

  //   if (!res.ok) {
  //     throw new Error("Failed to fetch dashboard chart");
  //   }

  //   return res.json();
  // }