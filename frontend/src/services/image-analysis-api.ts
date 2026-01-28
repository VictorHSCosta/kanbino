/**
 * Image Analysis API Service
 * Serviço para comunicação com a API de análise de imagem
 */

import type {
  ImageAnalysisResponse,
  ImageAnalysisRequest,
  ImageAnalysisSuccessResponse,
  ImageAnalysisErrorResponse,
} from '../types/image-analysis.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ImageAnalysisApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Analisa imagem enviada como arquivo
   */
  async analyzeImage(
    file: File,
    analysisType: 'full' | 'basic' | 'text-only' | 'layout-only' = 'full'
  ): Promise<ImageAnalysisResponse> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('analysisType', analysisType);

    try {
      const response = await fetch(`${this.baseUrl}/image-analysis/analyze`, {
        method: 'POST',
        body: formData,
      });

      const result: ImageAnalysisSuccessResponse | ImageAnalysisErrorResponse =
        await response.json();

      if (!response.ok || !result.success) {
        const error = result as ImageAnalysisErrorResponse;
        throw new Error(error.message || error.error || 'Falha ao analisar imagem');
      }

      return (result as ImageAnalysisSuccessResponse).data;
    } catch (error) {
      console.error('Erro ao analisar imagem:', error);
      throw error;
    }
  }

  /**
   * Analisa imagem a partir de URL
   */
  async analyzeFromUrl(
    imageUrl: string,
    analysisType: 'full' | 'basic' | 'text-only' | 'layout-only' = 'full'
  ): Promise<ImageAnalysisResponse> {
    const requestBody: ImageAnalysisRequest = {
      imageUrl,
      analysisType,
    };

    try {
      const response = await fetch(`${this.baseUrl}/image-analysis/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result: ImageAnalysisSuccessResponse | ImageAnalysisErrorResponse =
        await response.json();

      if (!response.ok || !result.success) {
        const error = result as ImageAnalysisErrorResponse;
        throw new Error(error.message || error.error || 'Falha ao analisar imagem');
      }

      return (result as ImageAnalysisSuccessResponse).data;
    } catch (error) {
      console.error('Erro ao analisar imagem da URL:', error);
      throw error;
    }
  }

  /**
   * Download do relatório em Markdown
   */
  async downloadReport(id: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/image-analysis/report/${id}`
      );

      if (!response.ok) {
        throw new Error('Falha ao baixar relatório');
      }

      // Criar blob e fazer download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-analise-${id}.md`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar relatório:', error);
      throw error;
    }
  }

  /**
   * Obter histórico de análises
   */
  async getHistory(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/image-analysis/history`);

      if (!response.ok) {
        throw new Error('Falha ao obter histórico');
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Erro ao obter histórico:', error);
      throw error;
    }
  }

  /**
   * Limpar cache de análises
   */
  async clearCache(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/image-analysis/cache`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao limpar cache');
      }
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
      throw error;
    }
  }

  /**
   * Obter informações do cache
   */
  async getCacheInfo(): Promise<{ cacheSize: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/image-analysis/cache/info`);

      if (!response.ok) {
        throw new Error('Falha ao obter informações do cache');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao obter informações do cache:', error);
      throw error;
    }
  }
}

export const imageAnalysisApi = new ImageAnalysisApiService();
