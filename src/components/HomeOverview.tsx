import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckSquare,
  Compass,
  GraduationCap,
  MessageSquareCode,
  PlayCircle,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { GUIDE_MODULES, PERSONAS } from '../data/modules';
import type { SectionId } from '../types/guide';

interface HomeOverviewProps {
  onNavigate: (section: SectionId, highlightId?: string) => void;
  checklistDone: number;
  checklistTotal: number;
}

const PERSONA_ICONS = {
  BarChart3,
  Rocket,
  GraduationCap,
} as const;

export function HomeOverview({
  onNavigate,
  checklistDone,
  checklistTotal,
}: HomeOverviewProps) {
  const progressPercent =
    checklistTotal > 0 ? Math.round((checklistDone / checklistTotal) * 100) : 0;

  return (
    <div className="space-y-10">
      {/* Editorial Hero */}
      <section className="editorial-card rounded-2xl p-6 sm:p-10">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-blue-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-blue)]">
            <Compass className="h-3.5 w-3.5" />
            <span>Guia Prático para Criadores Não Técnicos</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl leading-tight">
            Antigravity Sem Código: tire ideias do papel com modelos Google
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
            Você não precisa saber programar para construir aplicativos, automações e soluções com
            Inteligência Artificial. Neste guia, você aprende a atuar como{' '}
            <strong className="font-semibold text-[var(--text-primary)]">
              Diretor de Produto do agente
            </strong>
            : o que pedir em português claro, como revisar planos, qual modelo Gemini escolher e como
            validar tudo clicando na tela.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              id="hero-start-module-1"
              type="button"
              onClick={() => onNavigate('modulo-1')}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
            >
              <span>Começar pelo Módulo 1</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              id="hero-open-simulator"
              type="button"
              onClick={() => onNavigate('simulador')}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-card)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-muted)] cursor-pointer"
            >
              <PlayCircle className="h-4 w-4 text-[var(--accent-blue)]" />
              <span>Ver Simulador na Prática</span>
            </button>

            <button
              id="hero-open-model-selector"
              type="button"
              onClick={() => onNavigate('seletor-modelo')}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-muted)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-[var(--accent-green)]" />
              <span>Qual modelo escolher?</span>
            </button>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Qual é o seu perfil de criação?
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Escolha o caminho mais próximo da sua rotina para ir direto a exemplos práticos.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PERSONAS.map((persona) => {
            const Icon = PERSONA_ICONS[persona.iconName];
            return (
              <button
                key={persona.id}
                id={`persona-card-${persona.id}`}
                type="button"
                onClick={() =>
                  onNavigate(persona.recommendedModule, persona.recommendedTrackId)
                }
                className="editorial-card-interactive flex flex-col justify-between rounded-2xl p-5 text-left cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-blue-soft)] text-[var(--accent-blue)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">
                      {persona.subtitle}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {persona.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {persona.goal}
                  </p>
                </div>

                <div className="mt-4 border-t border-[var(--border-default)] pt-3">
                  <p className="text-xs text-[var(--text-muted)]">
                    <strong className="text-[var(--text-primary)]">Exemplo:</strong>{' '}
                    {persona.exampleIdea}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-blue)]">
                    <span>Ir para trilha recomendada</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Interactive Tools Strip */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Ferramentas Interativas do Guia
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Recursos vivos para consultar durante a criação real dos seus projetos no Antigravity.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button
            id="home-tool-seletor"
            type="button"
            onClick={() => onNavigate('seletor-modelo')}
            className="editorial-card-interactive flex items-start gap-3.5 rounded-xl p-4 text-left cursor-pointer"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-green-soft)] text-[var(--accent-green)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Seletor de Modelo Google
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                3 perguntas rápidas para escolher entre Gemini Pro, Flash ou Troca Inteligente.
              </p>
            </div>
          </button>

          <button
            id="home-tool-prompts"
            type="button"
            onClick={() => onNavigate('biblioteca-prompts')}
            className="editorial-card-interactive flex items-start gap-3.5 rounded-xl p-4 text-left cursor-pointer"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-blue-soft)] text-[var(--accent-blue)]">
              <MessageSquareCode className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Biblioteca de Prompts
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                Templates prontos para copiar com campos [PREENCHA AQUI] destacados.
              </p>
            </div>
          </button>

          <button
            id="home-tool-simulador"
            type="button"
            onClick={() => onNavigate('simulador')}
            className="editorial-card-interactive flex items-start gap-3.5 rounded-xl p-4 text-left cursor-pointer"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]">
              <PlayCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Simulador de Fluxo Agêntico
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                Veja passo a passo como um pedido vira Plano → Construção → Preview.
              </p>
            </div>
          </button>

          <button
            id="home-tool-glossario"
            type="button"
            onClick={() => onNavigate('glossario')}
            className="editorial-card-interactive flex items-start gap-3.5 rounded-xl p-4 text-left cursor-pointer"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-muted)] text-[var(--text-primary)]">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Glossário Tradutor
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                Traduza termos como Artefato, Localhost, Deploy e API Key com analogias.
              </p>
            </div>
          </button>

          <button
            id="home-tool-checklist"
            type="button"
            onClick={() => onNavigate('checklist')}
            className="editorial-card-interactive flex items-start gap-3.5 rounded-xl p-4 text-left sm:col-span-2 lg:col-span-2 cursor-pointer"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-blue-soft)] text-[var(--accent-blue)]">
              <CheckSquare className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Checklist de Progresso do Criador
                </h3>
                <span className="text-xs font-semibold text-[var(--accent-blue)]">
                  {progressPercent}% concluído
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                {checklistDone} de {checklistTotal} marcos concluídos — salvo automaticamente neste navegador.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 5 Modules Overview */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Os 5 Módulos do Guia
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Leia na sequência ou consulte diretamente a necessidade do seu momento.
          </p>
        </div>

        <div className="space-y-3">
          {GUIDE_MODULES.map((mod) => (
            <button
              key={mod.id}
              id={`home-module-card-${mod.id}`}
              type="button"
              onClick={() => onNavigate(mod.id)}
              className="editorial-card-interactive flex w-full flex-col gap-3 rounded-xl p-5 text-left sm:flex-row sm:items-center sm:justify-between cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[var(--accent-blue-soft)] px-2 py-0.5 text-xs font-bold text-[var(--accent-blue)]">
                    Módulo {mod.number}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    Leitura: {mod.readingTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {mod.title.replace(`Módulo ${mod.number}: `, '')}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{mod.subtitle}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--accent-blue)]">
                <span>Abrir</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
