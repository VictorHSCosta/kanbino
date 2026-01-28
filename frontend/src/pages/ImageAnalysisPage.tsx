/**
 * Página de Análise de Imagem
 * Permite upload/URL de imagem, visualização de análise e relatório Markdown
 */

import { useState } from 'react';
import { ImageUploadInput } from '../components/ImageUploadInput';
import { MarkdownReportViewer } from '../components/MarkdownReportViewer';
import { imageAnalysisApi } from '../services/image-analysis-api';
import type { ImageAnalysisResponse } from '../types/image-analysis.types';

interface ImageAnalysisPageProps {
  onBack: () => void;
}

export function ImageAnalysisPage({ onBack }: ImageAnalysisPageProps) {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(null);
  const [analysisType, setAnalysisType] = useState<
    'full' | 'basic' | 'text-only' | 'layout-only'
  >('full');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<ImageAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (image: File | string) => {
    setSelectedImage(image);
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Selecione uma imagem primeiro.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result: ImageAnalysisResponse;

      if (typeof selectedImage === 'string') {
        // Análise por URL
        result = await imageAnalysisApi.analyzeFromUrl(selectedImage, analysisType);
      } else {
        // Análise por arquivo
        result = await imageAnalysisApi.analyzeImage(selectedImage, analysisType);
      }

      setAnalysisResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao analisar imagem'
      );
      console.error('Erro na análise:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </button>
          <h1 className="text-4xl font-bold text-gray-800">
            Análise de Imagem com IA
          </h1>
          <p className="mt-2 text-gray-600">
            Faça upload ou cole a URL de uma imagem para obter uma análise
            detalhada com relatório em Markdown
          </p>
        </div>

        {!analysisResult ? (
          <>
            {/* Seleção de tipo de análise */}
            <div className="mb-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Tipo de Análise
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(
                  [
                    'full',
                    'basic',
                    'text-only',
                    'layout-only',
                  ] as const
                ).map((type) => (
                  <button
                    key={type}
                    onClick={() => setAnalysisType(type)}
                    disabled={loading}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      analysisType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium text-sm">
                      {type === 'full' && 'Completa'}
                      {type === 'basic' && 'Básica'}
                      {type === 'text-only' && 'Texto'}
                      {type === 'layout-only' && 'Layout'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload de imagem */}
            <ImageUploadInput
              onImageSelected={handleImageSelected}
              disabled={loading}
            />

            {/* Botão de análise */}
            {selectedImage && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className={`px-8 py-4 text-lg font-semibold text-white rounded-lg shadow-md transition-all ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg
                        className="animate-spin h-5 w-5"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analisando imagem...
                    </span>
                  ) : (
                    'Analisar Imagem'
                  )}
                </button>
              </div>
            )}

            {/* Mensagem de erro */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-red-800">Erro</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Resultado da análise */}
            <div className="space-y-6">
              {/* Resumo */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Resumo da Análise
                  </h2>
                  <button
                    onClick={handleNewAnalysis}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Nova Análise
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {analysisResult.summary}
                </p>
              </div>

              {/* Detalhes da análise */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Descrição */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Descrição Detalhada
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {analysisResult.description}
                  </p>
                </div>

                {/* Layout */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Layout e Composição
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">
                        Orientação:
                      </span>{' '}
                      <span className="text-gray-800">
                        {analysisResult.layout.orientation}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Composição:
                      </span>{' '}
                      <span className="text-gray-800">
                        {analysisResult.layout.composition}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Equilíbrio:
                      </span>{' '}
                      <span className="text-gray-800">
                        {analysisResult.layout.balance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cores */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Análise de Cores
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">
                        Dominantes:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {analysisResult.colors.dominant.map((color, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 rounded-full text-gray-800"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        Atmosfera:
                      </span>
                      <p className="text-gray-800 mt-1">
                        {analysisResult.colors.mood}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Elementos */}
                {analysisResult.elements.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Elementos Detectados
                    </h3>
                    <div className="space-y-2 text-sm">
                      {analysisResult.elements.slice(0, 5).map((el, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-800">{el.label}</span>
                          <span className="text-xs text-gray-500">
                            {Math.round(el.confidence * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {analysisResult.tags.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Relatório Markdown */}
              <div className="mt-8">
                <MarkdownReportViewer
                  markdownContent={analysisResult.markdownReport}
                  fileName={`relatorio-analise-${analysisResult.id}.md`}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
