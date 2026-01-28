/**
 * Serviço de Análise de Imagem utilizando OpenAI Vision API
 */

import { randomUUID } from 'crypto';
import type {
  ImageAnalysisResponse,
  ColorAnalysis,
  DetectedElement,
  LayoutAnalysis,
  ImageMetadata,
  AnalysisType,
} from '../types/image-analysis.types.js';
import { getOpenAIClient } from '../config/openai.config.js';
import { generateMarkdownReport } from '../utils/markdown-generator.util.js';

/**
 * Classe responsável pela análise de imagens
 */
export class ImageAnalysisService {
  private cache = new Map<string, ImageAnalysisResponse>();

  /**
   * Analisa imagem a partir de uma URL
   */
  async analyzeFromUrl(imageUrl: string, analysisType: AnalysisType = 'full'): Promise<ImageAnalysisResponse> {
    // Verificar cache
    const cacheKey = `url-${imageUrl}-${analysisType}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const openai = getOpenAIClient();

      const prompt = this.buildPrompt(analysisType);

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_VISION_MODEL || 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1500,
      });

      const analysisContent = response.choices[0]?.message?.content || '';
      const analysis = this.parseAnalysisResponse(analysisContent, imageUrl);

      // Salvar no cache
      this.cache.set(cacheKey, analysis);

      return analysis;
    } catch (error) {
      console.error('Erro ao analisar imagem da URL:', error);
      throw new Error(
        `Falha ao analisar imagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  /**
   * Analisa imagem a partir de um buffer de arquivo
   */
  async analyzeFromFile(
    imageBuffer: Buffer,
    mimeType: string,
    analysisType: AnalysisType = 'full'
  ): Promise<ImageAnalysisResponse> {
    // Verificar cache (hash simples do buffer)
    const cacheKey = `file-${imageBuffer.length}-${analysisType}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const openai = getOpenAIClient();

      const prompt = this.buildPrompt(analysisType);

      const base64Image = imageBuffer.toString('base64');

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_VISION_MODEL || 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1500,
      });

      const analysisContent = response.choices[0]?.message?.content || '';
      const analysis = this.parseAnalysisResponse(analysisContent, 'uploaded-file', {
        format: mimeType.split('/')[1],
        size: imageBuffer.length,
      });

      // Salvar no cache
      this.cache.set(cacheKey, analysis);

      return analysis;
    } catch (error) {
      console.error('Erro ao analisar arquivo de imagem:', error);
      throw new Error(
        `Falha ao analisar imagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  /**
   * Constrói o prompt para análise baseado no tipo de análise
   */
  private buildPrompt(analysisType: AnalysisType): string {
    const basePrompt = `Analise esta imagem e forneça uma resposta detalhada em formato JSON com a seguinte estrutura:
{
  "description": "descrição detalhada da imagem em português",
  "summary": "resumo conciso em 2-3 frases",
  "elements": [{"label": "objeto", "confidence": 0.95}],
  "colors": {
    "dominant": ["cor1", "cor2"],
    "palette": ["cor1", "cor2", "cor3", "cor4", "cor5"],
    "mood": "descrição da atmosfera/emoo da imagem"
  },
  "text": "texto extraído da imagem (se houver, ou vazio)",
  "layout": {
    "composition": "descrição da composição",
    "balance": "descrição do equilíbrio visual",
    "focalPoints": ["ponto1", "ponto2"],
    "orientation": "landscape ou portrait ou square"
  },
  "tags": ["tag1", "tag2", "tag3"]
}`;

    switch (analysisType) {
      case 'text-only':
        return 'Extraia apenas o texto visível nesta imagem. Retorne em formato JSON: {"text": "texto extraído"}';
      case 'layout-only':
        return 'Analise apenas a composição e layout desta imagem. Retorne em formato JSON: {"layout": {...}}';
      case 'basic':
        return `Forneça uma análise básica da imagem. ${basePrompt}`;
      case 'full':
      default:
        return `${basePrompt}

Seja específico e detalhado em sua análise. Inclua:
- Descrição visual completa do que é mostrado
- Todos os elementos/objetos principais detectados
- Análise de cores com hexadecimal quando apropriado
- Qualquer texto presente na imagem
- Composição, equilíbrio e pontos focais
- Tags descritivas relevantes`;
    }
  }

  /**
   * Parse da resposta da API para estrutura tipada
   */
  private parseAnalysisResponse(
    content: string,
    source: string,
    metadata?: Partial<ImageMetadata>
  ): ImageAnalysisResponse {
    try {
      // Tentar extrair JSON da resposta
      let jsonStr = content.trim();

      // Remover marcações de código markdown se presentes
      if (jsonStr.startsWith('```')) {
        const lines = jsonStr.split('\n');
        jsonStr = lines
          .slice(1, lines.length - 1)
          .join('\n')
          .replace(/^json\s*/, '');
      }

      const parsed = JSON.parse(jsonStr);

      // Construir objeto de análise
      const analysis: ImageAnalysisResponse = {
        id: randomUUID(),
        description:
          parsed.description || 'Descrição não disponível',
        summary:
          parsed.summary || 'Resumo não disponível',
        elements:
          parsed.elements?.map((el: any) => ({
            label: el.label || 'Elemento',
            confidence: el.confidence || 0.5,
            boundingBox: el.boundingBox,
          })) || [],
        colors: this.parseColorAnalysis(parsed.colors),
        text: parsed.text || '',
        layout: this.parseLayoutAnalysis(parsed.layout),
        metadata: {
          width: metadata?.width,
          height: metadata?.height,
          format: metadata?.format,
          size: metadata?.size,
          analyzedAt: new Date(),
        },
        tags: parsed.tags || [],
        markdownReport: '', // Será gerado abaixo
      };

      // Gerar relatório Markdown
      analysis.markdownReport = generateMarkdownReport(analysis);

      return analysis;
    } catch (error) {
      console.error('Erro ao fazer parse da resposta:', error);

      // Retornar análise básica em caso de erro no parse
      const fallbackAnalysis: ImageAnalysisResponse = {
        id: randomUUID(),
        description: content || 'Análise não disponível',
        summary: 'Análise gerada automaticamente',
        elements: [],
        colors: {
          dominant: ['Desconhecido'],
          palette: [],
          mood: 'Não identificado',
        },
        text: '',
        layout: {
          composition: 'Não analisado',
          balance: 'Não analisado',
          focalPoints: [],
          orientation: 'landscape',
        },
        metadata: {
          analyzedAt: new Date(),
        },
        tags: [],
        markdownReport: '',
      };

      fallbackAnalysis.markdownReport =
        generateMarkdownReport(fallbackAnalysis);

      return fallbackAnalysis;
    }
  }

  /**
   * Parse e validação de análise de cores
   */
  private parseColorAnalysis(colors: any): ColorAnalysis {
    return {
      dominant: Array.isArray(colors?.dominant)
        ? colors.dominant
        : ['Desconhecido'],
      palette: Array.isArray(colors?.palette)
        ? colors.palette
        : [],
      mood: colors?.mood || 'Não identificado',
    };
  }

  /**
   * Parse e validação de análise de layout
   */
  private parseLayoutAnalysis(layout: any): LayoutAnalysis {
    return {
      composition: layout?.composition || 'Não analisado',
      balance: layout?.balance || 'Não analisado',
      focalPoints: Array.isArray(layout?.focalPoints)
        ? layout.focalPoints
        : [],
      orientation: layout?.orientation || 'landscape',
    };
  }

  /**
   * Limpa o cache de análises
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Retorna tamanho do cache
   */
  getCacheSize(): number {
    return this.cache.size;
  }
}

// Instância singleton do serviço
export const imageAnalysisService = new ImageAnalysisService();

export default imageAnalysisService;
