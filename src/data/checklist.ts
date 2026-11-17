import type { ChecklistItem } from '../types/guide';

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-1',
    phase: '1. Preparação & Briefing',
    title: 'Entendi meu papel como Diretor de Produto',
    description: 'Sei que não preciso ler ou escrever código: meu foco é explicar o objetivo do negócio e validar a experiência na tela.',
    relatedSection: 'modulo-1',
  },
  {
    id: 'chk-2',
    phase: '1. Preparação & Briefing',
    title: 'Defini objetivo, público, entradas e saídas da minha ideia',
    description: 'Antes de abrir o chat, listei quem vai usar o app, o que a pessoa digita e o resultado que aparece na tela.',
    relatedSection: 'modulo-3',
  },
  {
    id: 'chk-3',
    phase: '1. Preparação & Briefing',
    title: 'Preparei um briefing inicial claro (ou adaptei um template)',
    description: 'Usei um prompt estruturado da Biblioteca de Prompts mantendo a primeira versão enxuta (MVP, sem login desnecessário).',
    relatedSection: 'biblioteca-prompts',
  },
  {
    id: 'chk-4',
    phase: '2. Plano & Escolha de Modelo',
    title: 'Escolhi o modelo Google adequado no seletor',
    description: 'Comecei com um modelo de raciocínio profundo (linha Gemini Pro) para estruturar a ideia e planejar a lógica.',
    relatedSection: 'seletor-modelo',
  },
  {
    id: 'chk-5',
    phase: '2. Plano & Escolha de Modelo',
    title: 'Li e validei o Plano de Implementação (Artefato)',
    description: 'Conferi se todas as regras do meu negócio estavam no plano antes de aprovar, cortando excessos.',
    relatedSection: 'modulo-3',
  },
  {
    id: 'chk-6',
    phase: '3. Construção & Preview',
    title: 'Testei o aplicativo no Browser Preview com dados reais',
    description: 'Cliquei em todos os botões, testei campos vazios ou valores extremos e verifiquei no tamanho de celular e computador.',
    relatedSection: 'modulo-3',
  },
  {
    id: 'chk-7',
    phase: '3. Construção & Preview',
    title: 'Apliquei a "Troca Inteligente" para ajustes visuais',
    description: 'Troquei para o modelo rápido (linha Gemini Flash) para refinar cores, textos e espaçamentos pedindo uma melhoria por vez.',
    relatedSection: 'modulo-2',
  },
  {
    id: 'chk-8',
    phase: '3. Construção & Preview',
    title: 'Usei print ou descrição clara caso algo tenha dado errado',
    description: 'Em vez de tentar mexer em arquivos técnicos, enviei a mensagem de erro ou um print no chat para o agente corrigir.',
    relatedSection: 'modulo-5',
  },
  {
    id: 'chk-9',
    phase: '4. Segurança & Organização',
    title: 'Garanti proteção da API Key (se o app usar IA do Gemini)',
    description: 'Pedi explicitamente ao agente para guardar chaves secretas em variáveis de ambiente e nunca visíveis na tela.',
    relatedSection: 'modulo-5',
  },
  {
    id: 'chk-10',
    phase: '4. Segurança & Organização',
    title: 'Registrei um ponto de restauração da versão estável',
    description: 'Quando o aplicativo ficou funcionando bem, pedi ao Antigravity para salvar um ponto de restauração (commit).',
    relatedSection: 'modulo-5',
  },
];
