import { GLOSSARY_TERMS } from '../data/glossary';
import { DEMAND_TRACKS, GUIDE_MODULES } from '../data/modules';
import { PROMPT_TEMPLATES } from '../data/prompts';
import type { SearchResultItem } from '../types/guide';

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const INTERACTIVE_TOOLS: SearchResultItem[] = [
  {
    id: 'tool-seletor',
    type: 'Ferramenta',
    title: 'Seletor Interativo de Modelo Google',
    subtitle: 'Responda 3 perguntas e descubra se deve usar Gemini Pro, Gemini Flash ou Troca Inteligente.',
    targetSection: 'seletor-modelo',
  },
  {
    id: 'tool-prompts',
    type: 'Ferramenta',
    title: 'Biblioteca de Prompts Copiáveis',
    subtitle: 'Templates prontos com campos [PREENCHA AQUI] e cópia com 1 clique.',
    targetSection: 'biblioteca-prompts',
  },
  {
    id: 'tool-simulador',
    type: 'Ferramenta',
    title: 'Simulador Interativo de Fluxo Agêntico',
    subtitle: 'Veja passo a passo como um pedido em português vira aplicativo no navegador.',
    targetSection: 'simulador',
  },
  {
    id: 'tool-glossario',
    type: 'Ferramenta',
    title: 'Glossário Tradutor (Tech -> Português Claro)',
    subtitle: 'Traduções e analogias para Artefato, API Key, Deploy, Localhost, Contexto e mais.',
    targetSection: 'glossario',
  },
  {
    id: 'tool-checklist',
    type: 'Ferramenta',
    title: 'Checklist de Progresso do Criador',
    subtitle: 'Acompanhe seus marcos de criação e validação salvos automaticamente.',
    targetSection: 'checklist',
  },
];

export function searchGuide(query: string): SearchResultItem[] {
  const q = normalizeText(query.trim());
  if (!q) return [];

  const results: SearchResultItem[] = [];

  for (const mod of GUIDE_MODULES) {
    const haystack = normalizeText(
      `${mod.title} ${mod.subtitle} ${mod.keyTakeaway} ${mod.searchKeywords.join(' ')}`
    );
    if (haystack.includes(q)) {
      results.push({
        id: `mod-${mod.id}`,
        type: 'Módulo',
        title: mod.title,
        subtitle: mod.subtitle,
        targetSection: mod.id,
      });
    }
  }

  for (const track of DEMAND_TRACKS) {
    for (const recipe of track.recipes) {
      const haystack = normalizeText(
        `${recipe.title} ${recipe.summary} ${recipe.idealFor} ${track.title}`
      );
      if (haystack.includes(q)) {
        results.push({
          id: `recipe-${recipe.id}`,
          type: 'Receita',
          title: recipe.title,
          subtitle: `${track.title} — ${recipe.summary}`,
          targetSection: 'modulo-4',
          highlightId: track.id,
        });
      }
    }
  }

  for (const prompt of PROMPT_TEMPLATES) {
    const haystack = normalizeText(
      `${prompt.title} ${prompt.category} ${prompt.description} ${prompt.template}`
    );
    if (haystack.includes(q)) {
      results.push({
        id: `prompt-${prompt.id}`,
        type: 'Prompt',
        title: prompt.title,
        subtitle: `${prompt.category} • ${prompt.description}`,
        targetSection: 'biblioteca-prompts',
        highlightId: prompt.id,
      });
    }
  }

  for (const term of GLOSSARY_TERMS) {
    const haystack = normalizeText(
      `${term.term} ${term.aka ?? ''} ${term.plainMeaning} ${term.analogy}`
    );
    if (haystack.includes(q)) {
      results.push({
        id: `term-${term.id}`,
        type: 'Glossário',
        title: term.aka ? `${term.term} (${term.aka})` : term.term,
        subtitle: term.plainMeaning,
        targetSection: 'glossario',
        highlightId: term.id,
      });
    }
  }

  for (const tool of INTERACTIVE_TOOLS) {
    const haystack = normalizeText(`${tool.title} ${tool.subtitle}`);
    if (haystack.includes(q)) {
      results.push(tool);
    }
  }

  return results.slice(0, 12);
}
