export type SectionId =
  | 'inicio'
  | 'modulo-1'
  | 'modulo-2'
  | 'modulo-3'
  | 'modulo-4'
  | 'modulo-5'
  | 'seletor-modelo'
  | 'biblioteca-prompts'
  | 'simulador'
  | 'glossario'
  | 'checklist';

export type ModuleId =
  | 'modulo-1'
  | 'modulo-2'
  | 'modulo-3'
  | 'modulo-4'
  | 'modulo-5';

export interface PersonaProfile {
  id: string;
  title: string;
  subtitle: string;
  goal: string;
  recommendedModule: ModuleId;
  recommendedTrackId?: string;
  exampleIdea: string;
  iconName: 'BarChart3' | 'Rocket' | 'GraduationCap';
}

export interface InterfaceZone {
  id: string;
  name: string;
  badge: string;
  tone: 'blue' | 'green' | 'amber' | 'neutral';
  shortRole: string;
  whatToDo: string;
  whatToIgnore: string;
  realExample: string;
}

export interface ModelProfile {
  id: 'gemini-pro' | 'gemini-flash' | 'hybrid';
  name: string;
  tag: string;
  tagline: string;
  tone: 'blue' | 'green' | 'amber';
  bestFor: string[];
  avoidWhen: string;
  analogy: string;
}

export interface GeminiSolutionCapability {
  id: string;
  title: string;
  businessUseCase: string;
  howToAsk: string;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  checklist: string[];
  goodPromptExample: string;
  avoidExample: string;
}

export interface DemandRecipe {
  id: string;
  title: string;
  summary: string;
  idealFor: string;
  steps: string[];
  readyPrompt: string;
  suggestedModel: string;
}

export interface DemandTrack {
  id: string;
  title: string;
  description: string;
  iconName: 'LayoutDashboard' | 'Sparkles' | 'FileSpreadsheet';
  recipes: DemandRecipe[];
}

export interface SurvivalScenario {
  id: string;
  category: 'erro' | 'visual' | 'seguranca';
  situation: string;
  symptom: string;
  calmExplanation: string;
  exactAction: string;
  readyPrompt: string;
}

export interface GuideModule {
  id: ModuleId;
  number: number;
  shortTitle: string;
  title: string;
  subtitle: string;
  readingTime: string;
  keyTakeaway: string;
  searchKeywords: string[];
}

export type PromptCategory =
  | 'Criar MVP'
  | 'Revisar Plano'
  | 'Integrar IA do Google'
  | 'Corrigir Bug'
  | 'Melhorar Design';

export interface PromptTemplate {
  id: string;
  title: string;
  category: PromptCategory;
  description: string;
  recommendedModel: string;
  template: string;
  placeholders: {
    key: string;
    label: string;
    example: string;
  }[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  aka?: string;
  category: 'Interface' | 'IA & Modelos' | 'Publicação & Segurança';
  plainMeaning: string;
  analogy: string;
  whereYouSeeIt: string;
}

export interface SimulatorStep {
  step: number;
  actor: 'Você (Diretor de Produto)' | 'Antigravity (Agente)' | 'Navegador (Resultado)';
  title: string;
  summary: string;
  detailTitle: string;
  detailLines: string[];
}

export interface SimulatorScenario {
  id: string;
  title: string;
  persona: string;
  userPrompt: string;
  modelUsed: string;
  steps: SimulatorStep[];
  previewMock: {
    appTitle: string;
    appSubtitle: string;
    fields: { label: string; value: string }[];
    resultLabel: string;
    resultValue: string;
    actionLabel: string;
  };
}

export interface ChecklistItem {
  id: string;
  phase: '1. Preparação & Briefing' | '2. Plano & Escolha de Modelo' | '3. Construção & Preview' | '4. Segurança & Organização';
  title: string;
  description: string;
  relatedSection: SectionId;
}

export interface SearchResultItem {
  id: string;
  type: 'Módulo' | 'Receita' | 'Prompt' | 'Glossário' | 'Ferramenta';
  title: string;
  subtitle: string;
  targetSection: SectionId;
  highlightId?: string;
}
