import { v2 as cloudinary } from "cloudinary";

// Validate environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error("CLOUDINARY_CLOUD_NAME is not defined");
}
if (!process.env.CLOUDINARY_API_KEY) {
  console.error("CLOUDINARY_API_KEY is not defined");
}
if (!process.env.CLOUDINARY_API_SECRET) {
  console.error("CLOUDINARY_API_SECRET is not defined");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/* ────────────────────────────────────────────────────────────
   Helper utilities — ported from the reference repo pattern
   ──────────────────────────────────────────────────────────── */

/**
 * Extracts the Cloudinary public ID from a full URL.
 */
export const getPublicIdFromUrl = (url: string): string | null => {
  if (!url || !url.includes("res.cloudinary.com")) return null;

  try {
    const urlWithoutQuery = url.split("?")[0];
    const parts = urlWithoutQuery.split("/upload/");
    if (parts.length < 2) return null;

    const afterUpload = parts[1];
    const pathParts = afterUpload.split("/");

    // Find the LAST version segment (e.g. "v123456789")
    let versionIndex = -1;
    for (let i = pathParts.length - 1; i >= 0; i--) {
      if (pathParts[i].match(/^v\d+$/)) {
        versionIndex = i;
        break;
      }
    }

    const startIndex = versionIndex !== -1 ? versionIndex + 1 : 0;
    const publicIdWithExt = pathParts.slice(startIndex).join("/");
    const publicId = publicIdWithExt.split(".")[0];

    return publicId;
  } catch {
    return null;
  }
};

/**
 * Generates a secure Cloudinary URL from a public ID.
 */
export const getUrlFromPublicId = (
  publicId: string,
  customOptions: Record<string, any> = {},
): string | null => {
  if (!publicId) {
    console.log("getUrlFromPublicId: publicId is empty");
    return null;
  }
  if (publicId.startsWith("http")) {
    console.log("getUrlFromPublicId: publicId already is a URL:", publicId);
    return publicId;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dn4qntb9r";
  console.log("getUrlFromPublicId: cloudName =", cloudName);
  
  if (!cloudName) {
    console.error("CLOUDINARY_CLOUD_NAME not configured");
    return null;
  }

  // Manually construct the Cloudinary URL
  // Format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}
  const transformations = [];
  
  if (customOptions.quality) {
    transformations.push(`q_${customOptions.quality}`);
  }
  if (customOptions.width) {
    transformations.push(`w_${customOptions.width}`);
  }
  if (customOptions.height) {
    transformations.push(`h_${customOptions.height}`);
  }
  if (customOptions.crop) {
    transformations.push(`c_${customOptions.crop}`);
  }

  const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';
  
  const fullUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}${publicId}`;
  console.log("getUrlFromPublicId: Converting", publicId, "to", fullUrl);
  
  return fullUrl;
};

/**
 * Uploads a base64 image or file path to Cloudinary.
 */
export const uploadToCloudinary = async (
  file: string,
  folder = "sainandhini/images",
  customPublicId: string | null = null,
) => {
  try {
    // Ensure cloudinary is configured
    if (!cloudinary.config().cloud_name) {
      throw new Error("Cloudinary is not properly configured");
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    
    const options: Record<string, any> = {
      folder,
      resource_type: "auto",
      timestamp,
    };

    if (customPublicId) {
      options.public_id = customPublicId;
    }

    const result = await cloudinary.uploader.upload(file, options);
    const cleanPublicId = result.public_id
      ? result.public_id.split("?")[0]
      : result.public_id;

    return {
      secure_url: result.secure_url,
      public_id: cleanPublicId,
    };
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    throw new Error(error.message || "Failed to upload image to Cloudinary");
  }
};

/**
 * Deletes an asset from Cloudinary using its URL or public ID.
 */
export const deleteFromCloudinary = async (identifier: string) => {
  try {
    const publicId = identifier.startsWith("http")
      ? getPublicIdFromUrl(identifier)
      : identifier;

    if (publicId && !publicId.startsWith("/images/")) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
  }
};
