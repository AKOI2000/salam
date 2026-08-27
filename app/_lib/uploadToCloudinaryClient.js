const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

export async function uploadToCloudinaryClient(file) {
  const isVideo = file.type?.startsWith("video/");
  const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

  if (file.size > maxSize) {
    const limitMb = maxSize / (1024 * 1024);
    throw new Error(
      `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is ${limitMb}MB.`
    );
  }

  let signatureRes;
  try {
    signatureRes = await fetch("/api/cloudinary-signature");
  } catch {
    throw new Error("Could not reach the server to start the upload. Check your internet connection.");
  }

  if (!signatureRes.ok) {
    throw new Error("Could not prepare the upload. Please try again.");
  }

  const { signature, timestamp, cloudName, apiKey } = await signatureRes.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("api_key", apiKey);
  formData.append("folder", "Salam_Project");

  let response;
  try {
    response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: "POST", body: formData }
    );
  } catch {
    throw new Error("Upload failed — your connection may have dropped. Please try again.");
  }

  const data = await response.json();

  if (data.error) {
    if (/too large|exceeds/i.test(data.error.message ?? "")) {
      throw new Error("File is too large for upload. Please use a smaller image or video.");
    }
    throw new Error(data.error.message || "Upload failed. Please try again.");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
  };
}