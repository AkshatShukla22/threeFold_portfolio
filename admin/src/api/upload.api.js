import API from './axios';

/**
 * Upload a single image to Cloudinary via the server.
 * The server uses multer-storage-cloudinary which expects
 * the field name to be exactly "image".
 */
export const uploadImage = (file) => {
  const fd = new FormData();
  fd.append('image', file);   // field name MUST match upload.single('image') in route
  return API.post('/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * Upload multiple images (field name "images").
 */
export const uploadMultiple = (files) => {
  const fd = new FormData();
  Array.from(files).forEach(f => fd.append('images', f));
  return API.post('/upload/multiple', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
