/**
 * Configuração do OpenAI Vision API
 */

import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

/**
 * Inicializa e retorna o cliente OpenAI
 */
export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY não está configurada nas variáveis de ambiente'
      );
    }

    openaiClient = new OpenAI({
      apiKey: apiKey,
    });
  }

  return openaiClient;
}

/**
 * Verifica se o cliente OpenAI está configurado corretamente
 */
export function isConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY;
}

export default getOpenAIClient;
