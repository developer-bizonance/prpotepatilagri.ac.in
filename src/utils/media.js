// src/utils/media.js
export const getMediaUrl = (imageId) => {
  // Vite ke liye 'import.meta.env.VITE_...' use hota hai
  const baseUrl = import.meta.env.VITE_MEDIA_DOWNLOAD_URL;

  console.log("Base URL:", baseUrl); // Debugging ke liye
  console.log("Image ID:", imageId);

  if (!imageId) return null;
  if (imageId.startsWith("http")) return imageId;

  return `${baseUrl}/${imageId}/bizonance`;
};