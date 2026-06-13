import cloudinary from "./cloudinary";

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
