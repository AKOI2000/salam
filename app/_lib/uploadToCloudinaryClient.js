export async function uploadToCloudinaryClient(file) {
  // get signature from your server
  const { signature, timestamp, cloudName, apiKey } = await fetch(
    "/api/cloudinary-signature"
  ).then((r) => r.json());

  // upload directly to Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("api_key", apiKey);
  formData.append("folder", "Salam_Project");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.secure_url;
}