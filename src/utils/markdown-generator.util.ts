/**
 * Utilitário para geração de relatórios em Markdown
 */

import type {
  ImageAnalysisResponse,
  MarkdownReport,
} from '../types/image-analysis.types.js';

/**
 * Gera um relatório estruturado em Markdown a partir da análise da imagem
 */
export function generateMarkdownReport(
  analysis: ImageAnalysisResponse
): string {
  const lines: string[] = [];

  // Cabeçalho
  lines.push(`# Relatório de Análise de Imagem`);
  lines.push('');
  lines.push(`**ID:** ${analysis.id}`);
  lines.push(`**Data:** ${new Date(analysis.metadata.analyzedAt).toLocaleString('pt-BR')}`);
  lines.push('');

  // Resumo
  lines.push(`## 📝 Resumo`);
  lines.push('');
  lines.push(analysis.summary);
  lines.push('');

  // Descrição Detalhada
  lines.push(`## 🔍 Descrição Detalhada`);
  lines.push('');
  lines.push(analysis.description);
  lines.push('');

  // Layout e Composição
  lines.push(`## 📐 Layout e Composição`);
  lines.push('');
  lines.push(`- **Orientação:** ${analysis.layout.orientation}`);
  lines.push(`- **Composição:** ${analysis.layout.composition}`);
  lines.push(`- **Equilíbrio:** ${analysis.layout.balance}`);
  if (analysis.layout.focalPoints.length > 0) {
    lines.push(`- **Pontos Focais:** ${analysis.layout.focalPoints.join(', ')}`);
  }
  lines.push('');

  // Elementos Detectados
  if (analysis.elements.length > 0) {
    lines.push(`## 🎯 Elementos Detectados`);
    lines.push('');
    lines.push(`| Elemento | Confiança |`);
    lines.push(`|----------|-----------|`);
    analysis.elements.forEach((element) => {
      const confidence = `${(element.confidence * 100).toFixed(1)}%`;
      lines.push(`| ${element.label} | ${confidence} |`);
    });
    lines.push('');
  }

  // Análise de Cores
  lines.push(`## 🎨 Análise de Cores`);
  lines.push('');
  lines.push(`### Cores Dominantes`);
  lines.push('');
  analysis.colors.dominant.forEach((color) => {
    lines.push(`- **${color}**`);
  });
  lines.push('');

  lines.push(`### Paleta de Cores`);
  lines.push('');
  analysis.colors.palette.forEach((color) => {
    lines.push(`- ${color}`);
  });
  lines.push('');

  lines.push(`### Atmosfera/Emoji`);
  lines.push('');
  lines.push(analysis.colors.mood);
  lines.push('');

  // Texto Extraído (se houver)
  if (analysis.text && analysis.text.length > 0) {
    lines.push(`## 📄 Texto Extraído`);
    lines.push('');
    lines.push(`\`\`\``);
    lines.push(analysis.text);
    lines.push(`\`\`\``);
    lines.push('');
  }

  // Metadados
  lines.push(`## 📊 Metadados`);
  lines.push('');
  lines.push(`- **Formato:** ${analysis.metadata.format || 'N/A'}`);
  lines.push(
    `- **Dimensões:** ${
      analysis.metadata.width && analysis.metadata.height
        ? `${analysis.metadata.width}x${analysis.metadata.height}`
        : 'N/A'
    }`
  );
  lines.push(
    `- **Tamanho:** ${
      analysis.metadata.size
        ? `${(analysis.metadata.size / 1024).toFixed(2)} KB`
        : 'N/A'
    }`
  );
  lines.push('');

  // Tags
  if (analysis.tags.length > 0) {
    lines.push(`## 🏷️ Tags`);
    lines.push('');
    analysis.tags.forEach((tag) => {
      lines.push(`- ${tag}`);
    });
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Cria objeto de relatório Markdown com metadados
 */
export function createMarkdownReport(
  analysis: ImageAnalysisResponse
): MarkdownReport {
  return {
    title: `Relatório de Análise - ${analysis.id}`,
    content: generateMarkdownReport(analysis),
    timestamp: new Date(),
    imageMetadata: analysis.metadata,
  };
}

export default {
  generateMarkdownReport,
  createMarkdownReport,
};
