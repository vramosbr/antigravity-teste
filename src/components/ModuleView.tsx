import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Cpu,
  Eye,
  FileSpreadsheet,
  LayoutDashboard,
  Lightbulb,
  MessageSquare,
  Monitor,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Terminal,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { GEMINI_IN_APP_CAPABILITIES, MODEL_PROFILES } from '../data/models';
import {
  CHATBOT_VS_AGENT_COMPARISON,
  DEMAND_TRACKS,
  GUIDE_MODULES,
  INTERFACE_ZONES,
  SURVIVAL_SCENARIOS,
  WORKFLOW_STEPS,
} from '../data/modules';
import type { ModuleId, SectionId } from '../types/guide';
import { CopyButton } from './CopyButton';

interface ModuleViewProps {
  moduleId: ModuleId;
  initialHighlightId?: string;
  onNavigate: (section: SectionId, highlightId?: string) => void;
}

const ZONE_ICONS = {
  chat: MessageSquare,
  artefatos: CheckCircle2,
  preview: Monitor,
  terminal: Terminal,
} as const;

const TRACK_ICONS = {
  LayoutDashboard,
  Sparkles,
  FileSpreadsheet,
} as const;

const TONE_BADGE_CLASSES = {
  blue: 'bg-[var(--accent-blue-soft)] text-[var(--accent-blue)]',
  green: 'bg-[var(--accent-green-soft)] text-[var(--accent-green)]',
  amber: 'bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]',
  neutral: 'bg-[var(--surface-muted)] text-[var(--text-secondary)]',
} as const;

export function ModuleView({ moduleId, initialHighlightId, onNavigate }: ModuleViewProps) {
  const modIndex = GUIDE_MODULES.findIndex((m) => m.id === moduleId);
  const currentModule = GUIDE_MODULES[modIndex] ?? GUIDE_MODULES[0];
  const prevModule = modIndex > 0 ? GUIDE_MODULES[modIndex - 1] : null;
  const nextModule = modIndex < GUIDE_MODULES.length - 1 ? GUIDE_MODULES[modIndex + 1] : null;

  const [selectedZoneId, setSelectedZoneId] = useState<string>(INTERFACE_ZONES[0].id);
  const [selectedTrackId, setSelectedTrackId] = useState<string>(
    initialHighlightId && DEMAND_TRACKS.some((t) => t.id === initialHighlightId)
      ? initialHighlightId
      : DEMAND_TRACKS[0].id
  );
  const [survivalFilter, setSurvivalFilter] = useState<'todos' | 'erro' | 'visual' | 'seguranca'>('todos');

  const activeZone =
    INTERFACE_ZONES.find((z) => z.id === selectedZoneId) ?? INTERFACE_ZONES[0];
  const activeTrack =
    DEMAND_TRACKS.find((t) => t.id === selectedTrackId) ?? DEMAND_TRACKS[0];

  const filteredSurvival =
    survivalFilter === 'todos'
      ? SURVIVAL_SCENARIOS
      : SURVIVAL_SCENARIOS.filter((s) => s.category === survivalFilter);

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <header className="editorial-card rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--accent-blue-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-blue)]">
            Módulo {currentModule.number} de 5
          </span>
          <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
            Leitura estimada: {currentModule.readingTime}
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          {currentModule.title}
        </h1>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          {currentModule.subtitle}
        </p>

        <div className="flex items-start gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-4">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-amber)]" />
          <p className="text-sm leading-relaxed text-[var(--text-primary)]">
            <strong>Ideia central:</strong> {currentModule.keyTakeaway}
          </p>
        </div>
      </header>

      {/* MODULE 1 */}
      {moduleId === 'modulo-1' && (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Chatbot Comum vs. Ambiente Agêntico (Antigravity)
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Se você já usou um chat de IA comum, talvez tenha se frustrado ao receber um texto enorme cheio de código sem saber onde colar. No Antigravity a lógica é outra: ele trabalha como um construtor completo.
            </p>

            <div className="grid gap-4">
              {CHATBOT_VS_AGENT_COMPARISON.map((row) => (
                <div
                  key={row.aspect}
                  className="editorial-card rounded-xl p-5 grid gap-4 md:grid-cols-12 md:items-start"
                >
                  <div className="md:col-span-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Comparativo
                    </span>
                    <h3 className="mt-1 text-base font-bold text-[var(--text-primary)]">
                      {row.aspect}
                    </h3>
                  </div>

                  <div className="md:col-span-4 rounded-xl bg-[var(--surface-page)] p-3.5 border border-[var(--border-default)]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)]">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Chatbot comum</span>
                    </div>
                    <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {row.chatbot}
                    </p>
                  </div>

                  <div className="md:col-span-5 rounded-xl bg-[var(--accent-blue-soft)]/60 p-3.5 border border-[var(--border-default)]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-blue)]">
                      <Bot className="h-3.5 w-3.5" />
                      <span>Google Antigravity</span>
                    </div>
                    <p className="mt-1.5 text-sm text-[var(--text-primary)] leading-relaxed">
                      {row.antigravity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Interface Map */}
          <section className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Mapa da Interface para Não Programadores
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Clique em cada área da tela do Antigravity para descobrir exatamente onde olhar e o que ignorar sem culpa.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('simulador')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-blue)] hover:underline cursor-pointer"
              >
                <PlayCircle className="h-4 w-4" />
                <span>Ver no Simulador</span>
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {INTERFACE_ZONES.map((zone) => {
                const Icon = ZONE_ICONS[zone.id as keyof typeof ZONE_ICONS] ?? Monitor;
                const isSelected = zone.id === activeZone.id;
                return (
                  <button
                    key={zone.id}
                    id={`interface-zone-btn-${zone.id}`}
                    type="button"
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-[var(--accent-blue-soft)]/50 shadow-sm dark:border-blue-400'
                        : 'border-[var(--border-default)] bg-[var(--surface-card)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Icon className="h-4 w-4 text-[var(--accent-blue)]" />
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TONE_BADGE_CLASSES[zone.tone]}`}
                      >
                        {zone.badge}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-sm font-bold text-[var(--text-primary)]">
                      {zone.name}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {zone.shortRole}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Zone Detail */}
            <div className="editorial-card rounded-2xl p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-default)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {activeZone.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{activeZone.shortRole}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${TONE_BADGE_CLASSES[activeZone.tone]}`}
                >
                  {activeZone.badge}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--accent-green)]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>O que fazer aqui</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
                    {activeZone.whatToDo}
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">
                    <Eye className="h-4 w-4" />
                    <span>O que você pode ignorar</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {activeZone.whatToIgnore}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)]">Na prática:</strong>{' '}
                {activeZone.realExample}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* MODULE 2 */}
      {moduleId === 'modulo-2' && (
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Guia de Escolha de Modelos Google no Seletor
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Você não precisa entender parâmetros técnicos de IA — basta saber qual perfil combina com o momento do seu projeto.
                </p>
              </div>
              <button
                id="m2-open-quiz"
                type="button"
                onClick={() => onNavigate('seletor-modelo')}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Abrir Seletor Interativo</span>
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {MODEL_PROFILES.map((profile) => (
                <article
                  key={profile.id}
                  className="editorial-card flex flex-col justify-between rounded-2xl p-5 space-y-4"
                >
                  <div className="space-y-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${TONE_BADGE_CLASSES[profile.tone]}`}
                    >
                      {profile.tag}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      {profile.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {profile.tagline}
                    </p>

                    <div className="space-y-2 pt-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Quando escolher
                      </p>
                      <ul className="space-y-1.5">
                        {profile.bestFor.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-[var(--text-primary)]"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-green)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-[var(--border-default)] pt-4">
                    <p className="text-xs text-[var(--text-secondary)]">
                      <strong className="text-[var(--text-primary)]">Evite quando:</strong>{' '}
                      {profile.avoidWhen}
                    </p>
                    <p className="rounded-lg bg-[var(--surface-page)] p-3 text-xs text-[var(--text-secondary)] border border-[var(--border-default)]">
                      <strong className="text-[var(--text-primary)]">Analogia:</strong>{' '}
                      {profile.analogy}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Using Google Models Inside Created Apps */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-[var(--accent-blue)]" />
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Usando Modelos Google Dentro das Soluções Criadas
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Além de usar o Gemini para construir o projeto, você pode pedir ao Antigravity para colocar a inteligência do Gemini <strong>dentro</strong> do seu aplicativo, atendendo seus clientes ou analisando arquivos automaticamente.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {GEMINI_IN_APP_CAPABILITIES.map((cap) => (
                <div key={cap.id} className="editorial-card rounded-xl p-5 space-y-3">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{cap.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {cap.businessUseCase}
                  </p>
                  <div className="rounded-lg bg-[var(--surface-page)] p-3 text-xs text-[var(--text-primary)] border border-[var(--border-default)]">
                    {cap.howToAsk}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* MODULE 3 */}
      {moduleId === 'modulo-3' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Fluxo em 4 Passos: Da Ideia ao Aplicativo Validado
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Seguir esta ordem evita retrabalho, mantém o projeto estável e garante que você nunca perca o controle do que o agente está construindo.
            </p>
          </div>

          <div className="space-y-5">
            {WORKFLOW_STEPS.map((step) => (
              <article key={step.stepNumber} className="editorial-card rounded-2xl p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white dark:bg-blue-500">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{step.title}</h3>
                    <p className="text-xs font-medium text-[var(--text-muted)]">{step.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {step.summary}
                </p>

                <div className="rounded-xl bg-[var(--surface-page)] p-4 border border-[var(--border-default)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    O que conferir nesta etapa
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {step.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-green)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-emerald-500/30 bg-[var(--accent-green-soft)]/45 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-green)]">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Como fazer bem</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
                      "{step.goodPromptExample}"
                    </p>
                  </div>

                  <div className="rounded-xl border border-red-500/25 bg-[var(--accent-red-soft)]/40 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-red)]">
                      <XCircle className="h-4 w-4" />
                      <span>Evite assim</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      "{step.avoidExample}"
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 4 */}
      {moduleId === 'modulo-4' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Escolha sua Trilha por Tipo de Demanda
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Cada receita abaixo traz o passo a passo de planejamento e um prompt pronto para copiar e adaptar para a sua realidade.
            </p>
          </div>

          {/* Track selector tabs */}
          <div className="grid gap-3 md:grid-cols-3">
            {DEMAND_TRACKS.map((track) => {
              const Icon = TRACK_ICONS[track.iconName];
              const isSelected = track.id === activeTrack.id;
              return (
                <button
                  key={track.id}
                  id={`track-tab-${track.id}`}
                  type="button"
                  onClick={() => setSelectedTrackId(track.id)}
                  className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-[var(--accent-blue-soft)]/55 shadow-sm dark:border-blue-400'
                      : 'border-[var(--border-default)] bg-[var(--surface-card)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-5 w-5 text-[var(--accent-blue)]" />
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {track.title}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {track.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Recipes for selected track */}
          <div className="space-y-5">
            {activeTrack.recipes.map((recipe, index) => (
              <article key={recipe.id} className="editorial-card rounded-2xl p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-[var(--accent-blue)]">
                      Receita {index + 1} de {activeTrack.recipes.length}
                    </span>
                    <h3 className="mt-0.5 text-lg font-bold text-[var(--text-primary)]">
                      {recipe.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[var(--accent-amber-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-amber)]">
                    {recipe.suggestedModel}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {recipe.summary}
                </p>

                <p className="text-xs text-[var(--text-muted)]">
                  <strong className="text-[var(--text-primary)]">Ideal para:</strong>{' '}
                  {recipe.idealFor}
                </p>

                <div className="rounded-xl bg-[var(--surface-page)] p-4 border border-[var(--border-default)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Como conduzir no Antigravity
                  </p>
                  <ol className="space-y-1.5 list-decimal list-inside text-sm text-[var(--text-primary)]">
                    {recipe.steps.map((s, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)]/60 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                      Prompt Pronto (substitua os campos entre colchetes)
                    </span>
                    <CopyButton
                      id={`copy-recipe-${recipe.id}`}
                      text={recipe.readyPrompt}
                      size="sm"
                    />
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-primary)]">
                    {recipe.readyPrompt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 5 */}
      {moduleId === 'modulo-5' && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Resolução Rápida de Problemas (Sem Código)
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Filtre pela situação que está acontecendo agora e copie a frase exata para resolver no chat.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'erro', label: 'Mensagens de Erro' },
                { id: 'visual', label: 'Visual / Layout' },
                { id: 'seguranca', label: 'Segurança & Backup' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`survival-filter-${tab.id}`}
                  type="button"
                  onClick={() =>
                    setSurvivalFilter(tab.id as 'todos' | 'erro' | 'visual' | 'seguranca')
                  }
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    survivalFilter === tab.id
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredSurvival.map((item) => {
              const Icon =
                item.category === 'erro'
                  ? AlertTriangle
                  : item.category === 'visual'
                    ? Eye
                    : ShieldCheck;

              const badgeClass =
                item.category === 'erro'
                  ? 'bg-[var(--accent-red-soft)] text-[var(--accent-red)]'
                  : item.category === 'visual'
                    ? 'bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]'
                    : 'bg-[var(--accent-green-soft)] text-[var(--accent-green)]';

              const categoryLabel =
                item.category === 'erro'
                  ? 'Erro / Comportamento'
                  : item.category === 'visual'
                    ? 'Aparência & Print'
                    : 'Segurança & Boas Práticas';

              return (
                <article key={item.id} className="editorial-card rounded-2xl p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      {item.situation}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{categoryLabel}</span>
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Sinal na tela:</strong>{' '}
                    {item.symptom}
                  </p>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl bg-[var(--surface-page)] p-4 border border-[var(--border-default)]">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Fique tranquilo(a)
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.calmExplanation}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[var(--surface-page)] p-4 border border-[var(--border-default)]">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">
                        O que fazer agora
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-primary)]">
                        {item.exactAction}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-muted)]/60 p-4 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                        Frase pronta para enviar no chat
                      </span>
                      <CopyButton
                        id={`copy-survival-${item.id}`}
                        text={item.readyPrompt}
                        size="sm"
                      />
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--text-primary)]">
                      {item.readyPrompt}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Module Footer Navigation */}
      <nav
        aria-label="Navegação entre módulos"
        className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-default)] pt-6"
      >
        {prevModule ? (
          <button
            id="module-prev-btn"
            type="button"
            onClick={() => onNavigate(prevModule.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Módulo {prevModule.number}: {prevModule.shortTitle}</span>
          </button>
        ) : (
          <button
            id="module-back-home-btn"
            type="button"
            onClick={() => onNavigate('inicio')}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Início</span>
          </button>
        )}

        {nextModule ? (
          <button
            id="module-next-btn"
            type="button"
            onClick={() => onNavigate(nextModule.id)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
          >
            <span>Próximo: Módulo {nextModule.number}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            id="module-finish-checklist-btn"
            type="button"
            onClick={() => onNavigate('checklist')}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 cursor-pointer"
          >
            <span>Validar no Checklist do Criador</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </nav>
    </div>
  );
}
