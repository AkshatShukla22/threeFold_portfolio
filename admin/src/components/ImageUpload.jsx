import { useState, useRef } from 'react';
import { uploadImage } from '../api/upload.api';
import './ImageUpload.css';

const ImageUpload = ({ value, onChange, label = 'Upload Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [preview,   setPreview]   = useState(value || '');
  const [error,     setError]     = useState('');
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const res = await uploadImage(file);
      const url = res.data.url;
      setPreview(url);
      onChange(url);
    } catch (err) {
      const msg = err.response?.data?.message || 'Upload failed. Check Cloudinary credentials in server/.env';
      setError(msg);
      console.error('Upload error:', err.response?.data || err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const clear = () => {
    setPreview('');
    setError('');
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="img-upload">
      {label && <label className="img-upload-label">{label}</label>}

      {preview ? (
        <div className="img-upload-preview">
          <img src={preview} alt="Preview" />
          <button type="button" className="img-upload-remove" onClick={clear}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ) : (
        <div
          className={`img-upload-zone ${uploading ? 'uploading' : ''}`}
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}>
          {uploading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <span>Click or drag to upload</span>
              <small>JPG, PNG, WebP · max 8 MB</small>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="img-upload-error">
          <i className="fa-solid fa-circle-xmark"></i> {error}
        </div>
      )}

      {/* Single file only — no multiple, calls handleFile not handleFiles */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        style={{ display: 'none' }}
        onChange={e => { handleFile(e.target.files[0]); e.target.value = ''; }}
      />

      <div className="img-upload-url">
        <input
          type="text"
          placeholder="Or paste an image URL directly..."
          value={preview}
          onChange={e => { setPreview(e.target.value); onChange(e.target.value); setError(''); }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;