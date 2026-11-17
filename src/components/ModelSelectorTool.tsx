import { CheckCircle2, Cpu, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { useState } from 'react';
import {
  getModelRecommendation,
  type PriorityOption,
  type ProjectPhaseOption,
  type TaskTypeOption,
} from '../data/models';

const TASK_OPTIONS: { id: TaskTypeOption; title: string; desc: string }[] = [
  {
    id: 'new-structure',
    title: 'Criar estrutura ou regras de negócio',
    desc: 'Começar um app, definir cálculos, fluxos com várias telas ou regras detalhadas.',
  },
  {
    id: 'visual-tweaks',
    title: 'Ajustes visuais e de texto',
    desc: 'Trocar cores, melhorar espaçamentos, mudar títulos ou ajustar botões.',
  },
  {
    id: 'integrate-ai',
    title: 'Conectar IA do Google (API Gemini)',
    desc: 'Fazer o aplicativo ler textos, PDFs, imagens ou classificar mensagens.',
  },
  {
    id: 'hard-bug',
    title: 'Resolver erro ou comportamento difícil',
    desc: 'Investigar algo que quebrou ou um erro que já tentou corrigir sem sucesso.',
  },
];

const PHASE_OPTIONS: { id: ProjectPhaseOption; title: string; desc: string }[] = [
  {
    id: 'starting',
    title: 'Começando do zero',
    desc: 'Ainda vou enviar o briefing inicial ou aprovar o primeiro plano.',
  },
  {
    id: 'building',
    title: 'Em construção (versão funcionando)',
    desc: 'A base já abre no navegador e estou adicionando funções aos poucos.',
  },
  {
    id: 'polishing',
    title: 'Acabamento e refino final',
    desc: 'Tudo já funciona e quero apenas deixar mais bonito e claro.',
  },
];

const PRIORITY_OPTIONS: { id: PriorityOption; title: string; desc: string }[] = [
  {
    id: 'depth',
    title: 'Profundidade e precisão máxima',
    desc: 'Prefiro que o agente pense com calma para acertar a estrutura de primeira.',
  },
  {
    id: 'speed',
    title: 'Velocidade e economia de cota',
    desc: 'Quero respostas quase instantâneas para testar várias mudanças seguidas.',
  },
];

export function ModelSelectorTool() {
  const [taskType, setTaskType] = useState<TaskTypeOption>('new-structure');
  const [phase, setPhase] = useState<ProjectPhaseOption>('starting');
  const [priority, setPriority] = useState<PriorityOption>('depth');

  const recommendation = getModelRecommendation(taskType, phase, priority);

  const badgeStyle =
    recommendation.badgeTone === 'blue'
      ? 'bg-[var(--accent-blue-soft)] text-[var(--accent-blue)]'
      : recommendation.badgeTone === 'green'
        ? 'bg-[var(--accent-green-soft)] text-[var(--accent-green)]'
        : 'bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]';

  const ResultIcon =
    recommendation.badgeTone === 'green'
      ? Zap
      : recommendation.badgeTone === 'amber'
        ? Sparkles
        : Cpu;

  function handleReset() {
    setTaskType('new-structure');
    setPhase('starting');
    setPriority('depth');
  }

  return (
    <div className="space-y-8">
      <header className="editorial-card rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-green-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-green)]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Assistente Rápido • 3 Perguntas</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          Qual modelo Google escolher no Antigravity?
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Marque o momento atual do seu projeto abaixo para receber a recomendação ideal entre raciocínio profundo (Gemini Pro), agilidade (Gemini Flash) ou a estratégia de alternância.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* Questions */}
        <div className="space-y-6 lg:col-span-7">
          {/* Q1 */}
          <section className="editorial-card rounded-2xl p-5 space-y-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              1. Qual é o tipo de tarefa agora?
            </h2>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {TASK_OPTIONS.map((opt) => {
                const selected = taskType === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`quiz-task-${opt.id}`}
                    type="button"
                    onClick={() => setTaskType(opt.id)}
                    className={`rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                      selected
                        ? 'border-blue-600 bg-[var(--accent-blue-soft)]/50 dark:border-blue-400'
                        : 'border-[var(--border-default)] bg-[var(--surface-page)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {opt.title}
                      </span>
                      {selected && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-blue)]" />
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Q2 */}
          <section className="editorial-card rounded-2xl p-5 space-y-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              2. Em que fase o projeto está?
            </h2>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {PHASE_OPTIONS.map((opt) => {
                const selected = phase === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`quiz-phase-${opt.id}`}
                    type="button"
                    onClick={() => setPhase(opt.id)}
                    className={`rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                      selected
                        ? 'border-blue-600 bg-[var(--accent-blue-soft)]/50 dark:border-blue-400'
                        : 'border-[var(--border-default)] bg-[var(--surface-page)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {opt.title}
                      </span>
                      {selected && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-blue)]" />
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Q3 */}
          <section className="editorial-card rounded-2xl p-5 space-y-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              3. Qual é a sua prioridade neste pedido?
            </h2>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {PRIORITY_OPTIONS.map((opt) => {
                const selected = priority === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`quiz-priority-${opt.id}`}
                    type="button"
                    onClick={() => setPriority(opt.id)}
                    className={`rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                      selected
                        ? 'border-blue-600 bg-[var(--accent-blue-soft)]/50 dark:border-blue-400'
                        : 'border-[var(--border-default)] bg-[var(--surface-page)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {opt.title}
                      </span>
                      {selected && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-blue)]" />
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Live Recommendation Panel */}
        <aside className="editorial-card sticky top-24 rounded-2xl p-6 space-y-5 lg:col-span-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Recomendação Ideal
            </span>
            <button
              id="quiz-reset-btn"
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>

          <div className="flex items-start gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${badgeStyle}`}
            >
              <ResultIcon className="h-5 w-5" />
            </div>
            <div>
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badgeStyle}`}
              >
                Perfil sugerido no seletor
              </span>
              <h3
                id="quiz-recommended-model"
                className="mt-1.5 text-xl font-extrabold text-[var(--text-primary)]"
              >
                {recommendation.recommendedModel}
              </h3>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              Por que escolher este perfil
            </p>
            <p className="text-sm leading-relaxed text-[var(--text-primary)]">
              {recommendation.justification}
            </p>
          </div>

          <div className="rounded-xl bg-[var(--surface-muted)] p-4">
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {recommendation.practicalTip}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
