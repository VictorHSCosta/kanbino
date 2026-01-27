/**
 * ProfilePhotoUploader Component
 * Handles profile photo upload with preview
 */

import { useState, useRef } from 'react';
import { apiService } from '../services/api';

interface ProfilePhotoUploaderProps {
  currentPhoto?: string;
  onPhotoUpdated: (photoUrl: string) => void;
}

export default function ProfilePhotoUploader({
  currentPhoto,
  onPhotoUpdated,
}: ProfilePhotoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Arquivo muito grande. Tamanho máximo: 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Tipo de arquivo inválido. Selecione uma imagem.');
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      const response = await apiService.uploadProfilePhoto(selectedFile);

      if (response.success) {
        onPhotoUpdated(response.photoUrl);
        setPreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer upload';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayPhoto = preview || currentPhoto;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Photo preview/current photo */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-tech-surfaceLight border-4 border-tech-primary shadow-lg shadow-tech-primary/30">
          {displayPhoto ? (
            <img
              src={displayPhoto}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-tech-textMuted">
              <svg
                className="w-16 h-16"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* File input */}
      <div className="w-full">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id="photo-upload"
        />
        <label
          htmlFor="photo-upload"
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-tech-primary to-tech-secondary hover:from-tech-primary/90 hover:to-tech-secondary/90 cursor-pointer transition-all duration-300 ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Enviando...
            </>
          ) : (
            'Selecionar Foto'
          )}
        </label>
      </div>

      {/* Action buttons */}
      {selectedFile && (
        <div className="flex space-x-3 w-full">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`flex-1 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-tech-success hover:bg-tech-success/90 transition-all duration-300 ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Confirmar Upload
          </button>
          <button
            onClick={handleCancel}
            disabled={uploading}
            className={`flex-1 px-4 py-2 border border-tech-surfaceLight rounded-lg shadow-sm text-sm font-medium text-tech-text bg-tech-surfaceLight hover:bg-tech-surfaceLight/80 transition-all duration-300 ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="w-full p-3 bg-red-950/50 border border-red-900 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Info text */}
      <p className="text-xs text-tech-textMuted text-center">
        Formatos aceitos: JPEG, PNG, WEBP, GIF
        <br />
        Tamanho máximo: 5MB
      </p>
    </div>
  );
}
