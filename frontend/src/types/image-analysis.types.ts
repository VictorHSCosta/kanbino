/**
 * Tipos para funcionalidade de análise de imagem
 */

export type AnalysisType = 'full' | 'basic' | 'text-only' | 'layout-only';

export interface ColorAnalysis {
  dominant: string[];
  palette: string[];
  mood: string;
}

export interface DetectedElement {
  label: string;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface LayoutAnalysis {
  composition: string;
  balance: string;
  focalPoints: string[];
  orientation: 'landscape' | 'portrait' | 'square';
}

export interface ImageMetadata {
  width?: number;
  height?: number;
  format?: string;
  size?: number;
  analyzedAt: string;
}

export interface ImageAnalysisResponse {
  id: string;
  description: string;
  summary: string;
  elements: DetectedElement[];
  colors: ColorAnalysis;
  text?: string;
  layout: LayoutAnalysis;
  metadata: ImageMetadata;
  tags: string[];
  markdownReport: string;
}

export interface ImageAnalysisRequest {
  imageUrl?: string;
  analysisType?: AnalysisType;
}

export interface ImageAnalysisSuccessResponse {
  success: true;
  data: ImageAnalysisResponse;
}

export interface ImageAnalysisErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: string;
}

export type ImageAnalysisApiResponse =
  | ImageAnalysisSuccessResponse
  | ImageAnalysisErrorResponse;
