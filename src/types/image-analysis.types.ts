/**
 * Tipos e interfaces para funcionalidade de análise de imagem
 */

/**
 * Tipos de análise disponíveis
 */
export enum AnalysisType {
  FULL = 'full',
  BASIC = 'basic',
  TEXT_ONLY = 'text-only',
  LAYOUT_ONLY = 'layout-only',
}

/**
 * Interface para requisição de análise de imagem
 */
export interface ImageAnalysisRequest {
  imageUrl?: string;
  imageFile?: Express.Multer.File;
  analysisType?: AnalysisType;
}

/**
 * Interface para análise de cores detectadas na imagem
 */
export interface ColorAnalysis {
  dominant: string[];
  palette: string[];
  mood: string;
}

/**
 * Interface para elementos detectados na imagem
 */
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

/**
 * Interface para análise de layout/composição
 */
export interface LayoutAnalysis {
  composition: string;
  balance: string;
  focalPoints: string[];
  orientation: 'landscape' | 'portrait' | 'square';
}

/**
 * Interface para metadados da imagem
 */
export interface ImageMetadata {
  width?: number;
  height?: number;
  format?: string;
  size?: number;
  analyzedAt: Date;
}

/**
 * Interface completa para resposta de análise de imagem
 */
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

/**
 * Interface para relatório Markdown gerado
 */
export interface MarkdownReport {
  title: string;
  content: string;
  timestamp: Date;
  imageMetadata: ImageMetadata;
}

/**
 * Interface para erro de análise
 */
export interface AnalysisError {
  code: string;
  message: string;
  details?: string;
}
