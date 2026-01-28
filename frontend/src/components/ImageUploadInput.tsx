/**
 * Componente de Upload de Imagem
 * Permite upload de arquivo ou entrada de URL
 */

import { useState } from 'react';

interface ImageUploadInputProps {
  onImageSelected: (file: File | string) => void;
  disabled?: boolean;
}

export function ImageUploadInput({
  onImageSelected,
  disabled = false,
}: ImageUploadInputProps) {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Formato inválido. Use JPEG, PNG, WEBP ou GIF.');
      return;
    }

    // Validar tamanho (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 10MB.');
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Criar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    onImageSelected(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setError(null);
  };

  const handleLoadUrl = () => {
    if (!imageUrl.trim()) {
      setError('Digite uma URL válida.');
      return;
    }

    try {
      new URL(imageUrl);
      setPreviewUrl(imageUrl);
      setError(null);
      setSelectedFile(null);
      onImageSelected(imageUrl);
    } catch {
      setError('URL inválida.');
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImageUrl('');
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Enviar Imagem para Análise
      </h2>

      {/* Tabs para selecionar método */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => {
            setUploadMethod('file');
            handleClear();
          }}
          disabled={disabled}
          className={`flex-1 py-3 px-4 font-medium transition-colors ${
            uploadMethod === 'file'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Upload de Arquivo
        </button>
        <button
          onClick={() => {
            setUploadMethod('url');
            handleClear();
          }}
          disabled={disabled}
          className={`flex-1 py-3 px-4 font-medium transition-colors ${
            uploadMethod === 'url'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          URL da Imagem
        </button>
      </div>

      {uploadMethod === 'file' ? (
        /* Upload por arquivo */
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              previewUrl
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <input
              type="file"
              onChange={handleFileSelect}
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              disabled={disabled}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={`cursor-pointer ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="space-y-2">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600 hover:text-blue-500">
                    Clique para selecionar
                  </span>{' '}
                  ou arraste uma imagem aqui
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP ou GIF (máx. 10MB)
                </p>
              </div>
            </label>
          </div>

          {selectedFile && (
            <div className="text-sm text-gray-600">
              Arquivo selecionado:{' '}
              <span className="font-medium">{selectedFile.name}</span>
            </div>
          )}
        </div>
      ) : (
        /* Upload por URL */
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={imageUrl}
              onChange={handleUrlChange}
              disabled={disabled}
              placeholder="https://exemplo.com/imagem.jpg"
              className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
            <button
              onClick={handleLoadUrl}
              disabled={disabled || !imageUrl.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Carregar
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Cole a URL pública de uma imagem
          </p>
        </div>
      )}

      {/* Preview da imagem */}
      {previewUrl && (
        <div className="mt-6 space-y-3">
          <div className="text-sm font-medium text-gray-700">Preview:</div>
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-96 mx-auto rounded-lg shadow-md"
            />
            <button
              onClick={handleClear}
              disabled={disabled}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Remover imagem"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mensagem de erro */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
