import { useState, useRef } from 'react';
import { apiService } from '../services/api';

interface ProfilePhotoUploaderProps {
  currentPhoto?: string;
  onPhotoUpdate: (photoUrl: string) => void;
  onPhotoRemove: () => void;
}

export default function ProfilePhotoUploader({
  currentPhoto,
  onPhotoUpdate,
  onPhotoRemove,
}: ProfilePhotoUploaderProps) {
  const [preview, setPreview] = useState<string | undefined>(currentPhoto);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setSuccess(null);

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Tipo de arquivo inválido. Use JPEG, PNG ou WebP.');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('Arquivo muito grande. Tamanho máximo: 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await apiService.uploadPhoto(selectedFile);
      setSuccess(result.message);
      onPhotoUpdate(result.photoUrl);
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(currentPhoto);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await apiService.deletePhoto();
      setSuccess(result.message);
      setPreview(undefined);
      onPhotoRemove();
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao remover foto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {preview ? (
          <img
            src={preview}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        id="avatar-upload"
      />

      <div className="flex flex-col sm:flex-row gap-2">
        {!selectedFile ? (
          <>
            <label
              htmlFor="avatar-upload"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors text-sm font-medium text-center"
            >
              Alterar Foto
            </label>
            {currentPhoto && (
              <button
                onClick={handleRemove}
                disabled={loading}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 transition-colors text-sm font-medium"
              >
                Remover
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={handleUpload}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm font-medium"
            >
              {loading ? 'Enviando...' : 'Salvar'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors text-sm font-medium"
            >
              Cancelar
            </button>
          </>
        )}
      </div>

      {error && (
        <div className="w-full max-w-xs p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 text-center">{error}</p>
        </div>
      )}

      {success && (
        <div className="w-full max-w-xs p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600 text-center">{success}</p>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center max-w-xs">
        Formatos aceitos: JPEG, PNG, WebP. Tamanho máximo: 5MB
      </p>
    </div>
  );
}
