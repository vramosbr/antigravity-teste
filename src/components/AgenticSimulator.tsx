import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Monitor,
  PlayCircle,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { SIMULATOR_SCENARIOS } from '../data/simulator';

export function AgenticSimulator() {
  const [scenarioId, setScenarioId] = useState(SIMULATOR_SCENARIOS[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const [mockActionFeedback, setMockActionFeedback] = useState(false);

  const scenario =
    SIMULATOR_SCENARIOS.find((s) => s.id === scenarioId) ?? SIMULATOR_SCENARIOS[0];
  const currentStep = scenario.steps[stepIndex] ?? scenario.steps[0];

  function handleSelectScenario(id: string) {
    setScenarioId(id);
    setStepIndex(0);
    setMockActionFeedback(false);
  }

  function handleMockClick() {
    setMockActionFeedback(true);
    window.setTimeout(() => setMockActionFeedback(false), 1800);
  }

  const ActorIcon =
    currentStep.actor.startsWith('Você')
      ? User
      : currentStep.actor.startsWith('Navegador')
        ? Monitor
        : Bot;

  return (
    <div className="space-y-6">
      <header className="editorial-card rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-amber-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-amber)]">
          <PlayCircle className="h-3.5 w-3.5" />
          <span>Demonstração Passo a Passo</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          Simulador Interativo de Fluxo Agêntico
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Escolha um cenário real e avance pelas 4 etapas para enxergar como um pedido simples em português se transforma em Plano de Ação, Construção e Aplicativo no Navegador.
        </p>
      </header>

      {/* Scenario Selector */}
      <div className="grid gap-3 md:grid-cols-3">
        {SIMULATOR_SCENARIOS.map((item) => {
          const active = item.id === scenario.id;
          return (
            <button
              key={item.id}
              id={`sim-scenario-${item.id}`}
              type="button"
              onClick={() => handleSelectScenario(item.id)}
              className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                active
                  ? 'border-blue-600 bg-[var(--accent-blue-soft)]/55 shadow-sm dark:border-blue-400'
                  : 'border-[var(--border-default)] bg-[var(--surface-card)] hover:border-[var(--border-strong)]'
              }`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {item.persona}
              </span>
              <h2 className="mt-1 text-sm font-bold text-[var(--text-primary)]">
                {item.title}
              </h2>
              <p className="mt-1.5 text-xs text-[var(--accent-blue)] font-medium">
                {item.modelUsed}
              </p>
            </button>
          );
        })}
      </div>

      {/* Step Indicator */}
      <div className="editorial-card rounded-2xl p-5 space-y-6">
        <div className="grid gap-2 sm:grid-cols-4">
          {scenario.steps.map((st, idx) => {
            const isCurrent = idx === stepIndex;
            const isDone = idx < stepIndex;
            return (
              <button
                key={st.step}
                id={`sim-step-tab-${st.step}`}
                type="button"
                onClick={() => setStepIndex(idx)}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors cursor-pointer ${
                  isCurrent
                    ? 'border-blue-600 bg-[var(--accent-blue-soft)]/60 dark:border-blue-400'
                    : isDone
                      ? 'border-emerald-500/35 bg-[var(--accent-green-soft)]/40'
                      : 'border-[var(--border-default)] bg-[var(--surface-page)] hover:bg-[var(--surface-muted)]'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCurrent
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : isDone
                        ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                        : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : st.step}
                </span>
                <span className="truncate text-xs font-semibold text-[var(--text-primary)]">
                  {st.title.replace(/^\d+\.\s*/, '')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Content + Simulated Browser Preview */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Current Step Explanation */}
          <div className="space-y-4 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)]">
              <ActorIcon className="h-3.5 w-3.5 text-[var(--accent-blue)]" />
              <span>Responsável agora: {currentStep.actor}</span>
            </div>

            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              {currentStep.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {currentStep.summary}
            </p>

            {stepIndex === 0 && (
              <div className="rounded-xl border border-blue-500/30 bg-[var(--accent-blue-soft)]/40 p-4 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">
                  Prompt completo digitado no chat
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-primary)]">
                  "{scenario.userPrompt}"
                </p>
              </div>
            )}

            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {currentStep.detailTitle}
              </p>
              <ul className="space-y-2">
                {currentStep.detailLines.map((line, i) => (
                  <li key={i} className="text-sm leading-relaxed text-[var(--text-primary)]">
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* Step controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                id="sim-prev-step"
                type="button"
                disabled={stepIndex === 0}
                onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] disabled:opacity-40 hover:bg-[var(--surface-muted)] cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Anterior</span>
              </button>

              <button
                id="sim-next-step"
                type="button"
                disabled={stepIndex === scenario.steps.length - 1}
                onClick={() =>
                  setStepIndex((prev) => Math.min(scenario.steps.length - 1, prev + 1))
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>
                  {stepIndex === scenario.steps.length - 1 ? 'Fluxo Concluído' : 'Próxima Etapa'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right: Live Browser Preview Mock */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-page)] shadow-sm">
              {/* Browser top bar */}
              <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-muted)] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-md bg-[var(--surface-card)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-muted)] border border-[var(--border-default)]">
                  Preview: localhost:5173
                </span>
              </div>

              {/* Preview body depending on step */}
              <div className="p-5 space-y-4">
                {stepIndex < 2 ? (
                  <div className="flex min-h-60 flex-col items-center justify-center text-center space-y-2 px-4">
                    <Monitor className="h-8 w-8 text-[var(--text-muted)]" />
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {stepIndex === 0
                        ? 'Aguardando o envio do seu briefing'
                        : 'Aguardando você aprovar o Plano de Ação'}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      O aplicativo aparecerá aqui automaticamente assim que o Antigravity construir a primeira versão. Avance para as próximas etapas!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[var(--accent-green-soft)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--accent-green)]">
                        {stepIndex === 2 ? 'Construindo tela...' : 'Pronto para testar'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[var(--text-primary)]">
                        {scenario.previewMock.appTitle}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {scenario.previewMock.appSubtitle}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {scenario.previewMock.fields.map((f) => (
                        <div
                          key={f.label}
                          className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-card)] px-3 py-2"
                        >
                          <p className="text-[11px] text-[var(--text-muted)]">{f.label}</p>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">
                            {f.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl bg-[var(--accent-blue-soft)]/55 p-3.5 border border-[var(--border-default)]">
                      <p className="text-[11px] font-semibold text-[var(--accent-blue)]">
                        {scenario.previewMock.resultLabel}
                      </p>
                      <p className="mt-1 text-base font-bold text-[var(--text-primary)]">
                        {scenario.previewMock.resultValue}
                      </p>
                    </div>

                    <button
                      id="sim-preview-mock-btn"
                      type="button"
                      onClick={handleMockClick}
                      className="w-full rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer transition-colors"
                    >
                      {mockActionFeedback
                        ? 'Ação simulada com sucesso!'
                        : scenario.previewMock.actionLabel}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
