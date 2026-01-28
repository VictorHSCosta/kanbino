/**
 * Controller de Análise de Imagem
 * Gerencia requisições de análise de imagem
 */

import { Request, Response } from 'express';
import { imageAnalysisService } from '../services/image-analysis.service.js';
import type { AnalysisType } from '../types/image-analysis.types.js';
import { logger } from '../utils/logger.js';

// Formatos suportados
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

// Tamanho máximo (padrão: 10MB)
const MAX_FILE_SIZE = parseInt(process.env.MAX_IMAGE_SIZE || '10485760', 10);

/**
 * Analisa imagem enviada via upload ou URL
 */
export async function analyzeImage(req: Request, res: Response): Promise<void> {
  try {
    const { imageUrl, analysisType } = req.body;
    const uploadedFile = req.file;

    // Validar que pelo menos uma fonte foi fornecida
    if (!uploadedFile && !imageUrl) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'É necessário fornecer uma imagem (upload ou URL)',
      });
      return;
    }

    // Validar tipo de análise
    const validAnalysisTypes: AnalysisType[] = ['full', 'basic', 'text-only', 'layout-only'];
    const selectedAnalysisType: AnalysisType =
      analysisType && validAnalysisTypes.includes(analysisType)
        ? analysisType
        : 'full';

    let result;

    if (uploadedFile) {
      // Validar formato do arquivo
      if (!SUPPORTED_FORMATS.includes(uploadedFile.mimetype)) {
        res.status(400).json({
          error: 'Bad Request',
          message: `Formato não suportado. Formatos aceitos: ${SUPPORTED_FORMATS.join(', ')}`,
        });
        return;
      }

      // Validar tamanho do arquivo
      if (uploadedFile.size > MAX_FILE_SIZE) {
        res.status(400).json({
          error: 'Bad Request',
          message: `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        });
        return;
      }

      logger.info(`Analisando arquivo de imagem: ${uploadedFile.originalname}, tipo: ${selectedAnalysisType}`);

      // Analisar arquivo
      result = await imageAnalysisService.analyzeFromFile(
        uploadedFile.buffer,
        uploadedFile.mimetype,
        selectedAnalysisType
      );
    } else if (imageUrl) {
      // Validar URL
      try {
        new URL(imageUrl);
      } catch {
        res.status(400).json({
          error: 'Bad Request',
          message: 'URL inválida',
        });
        return;
      }

      logger.info(`Analisando imagem da URL: ${imageUrl}, tipo: ${selectedAnalysisType}`);

      // Analisar URL
      result = await imageAnalysisService.analyzeFromUrl(imageUrl, selectedAnalysisType);
    } else {
      res.status(400).json({
        error: 'Bad Request',
        message: 'É necessário fornecer uma imagem',
      });
      return;
    }

    // Retornar resultado
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Erro ao analisar imagem:', error);

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro ao processar análise da imagem',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}

/**
 * Download de relatório Markdown
 */
export async function downloadReport(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'ID da análise é obrigatório',
      });
      return;
    }

    // NOTA: Em uma implementação completa, você buscaria a análise
    // no banco de dados ou cache. Por enquanto, retornamos erro
    // indicando que a funcionalidade precisa de persistência.

    res.status(404).json({
      error: 'Not Found',
      message: 'Relatório não encontrado. Implemente persistência para habilitar esta funcionalidade.',
    });
  } catch (error) {
    logger.error('Erro ao baixar relatório:', error);

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro ao baixar relatório',
    });
  }
}

/**
 * Retorna histórico de análises (opcional - requer persistência)
 */
export async function getHistory(req: Request, res: Response): Promise<void> {
  try {
    res.status(501).json({
      error: 'Not Implemented',
      message: 'Histórico não disponível. Implemente persistência para habilitar esta funcionalidade.',
    });
  } catch (error) {
    logger.error('Erro ao buscar histórico:', error);

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro ao buscar histórico',
    });
  }
}

/**
 * Limpa o cache de análises
 */
export async function clearCache(req: Request, res: Response): Promise<void> {
  try {
    imageAnalysisService.clearCache();

    res.status(200).json({
      success: true,
      message: 'Cache limpo com sucesso',
    });
  } catch (error) {
    logger.error('Erro ao limpar cache:', error);

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro ao limpar cache',
    });
  }
}

/**
 * Retorna informações sobre o cache
 */
export async function getCacheInfo(req: Request, res: Response): Promise<void> {
  try {
    const cacheSize = imageAnalysisService.getCacheSize();

    res.status(200).json({
      success: true,
      cacheSize,
      message: `${cacheSize} análises em cache`,
    });
  } catch (error) {
    logger.error('Erro ao buscar informações do cache:', error);

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erro ao buscar informações do cache',
    });
  }
}
