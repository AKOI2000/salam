import cloudinary from "./cloudinary";
import { startOfMonth, endOfMonth, format } from "date-fns";

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;

export async function uploadToCloudinary(file) {
  // Step 1: File → ArrayBuffer → Buffer (what Node.js/Cloudinary understands)
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Step 2: Wrap in a Promise because Cloudinary's SDK uses callbacks
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "Salam_Project", resource_type: "auto" },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url); // this is the URL we save to Supabase
        },
      )
      .end(buffer); // .end() is what actually triggers the upload
  });
}

export function getPublicIdFromUrl(url) {
  const afterUpload = url.split("/upload/")[1];
  const withoutVersion = afterUpload.replace(/v\d+\//, "");
  const publicId = withoutVersion.replace(/\.[^.]+$/, "");
  return publicId; // "Salam_Project/qjetdnm8g7k2zefpmref"
}

export async function deleteFromCloudinary(url, media_type) {
  const publicId = getPublicIdFromUrl(url);

  return cloudinary.uploader.destroy(publicId, {
    resource_type: media_type === "video" ? "video" : "image",
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
    const key = format(new Date(item.created_at), "yyyy-MM");

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