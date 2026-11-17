import { ArrowRight, Award, CheckSquare, RotateCcw, Square } from 'lucide-react';
import { CHECKLIST_ITEMS } from '../data/checklist';
import type { SectionId } from '../types/guide';

interface CreatorChecklistProps {
  completedIds: string[];
  onToggleItem: (id: string) => void;
  onReset: () => void;
  onNavigate: (section: SectionId) => void;
}

const PHASES = [
  '1. Preparação & Briefing',
  '2. Plano & Escolha de Modelo',
  '3. Construção & Preview',
  '4. Segurança & Organização',
] as const;

export function CreatorChecklist({
  completedIds,
  onToggleItem,
  onReset,
  onNavigate,
}: CreatorChecklistProps) {
  const total = CHECKLIST_ITEMS.length;
  const doneCount = completedIds.length;
  const percent = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <header className="editorial-card rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-blue-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-blue)]">
              <CheckSquare className="h-3.5 w-3.5" />
              <span>Salvo Automaticamente no Navegador</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
              Checklist de Progresso do Criador
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Marque cada marco conforme aprende ou valida um projeto real no Antigravity. Seu progresso permanece salvo mesmo se você fechar a aba.
            </p>
          </div>

          {doneCount > 0 && (
            <button
              id="checklist-reset-btn"
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-default)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Zerar Checklist</span>
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-4 space-y-2.5">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="text-[var(--text-primary)]">
              {doneCount} de {total} marcos concluídos
            </span>
            <span className="text-[var(--accent-blue)]">{percent}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--surface-subtle)]">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          {percent === 100 && (
            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-[var(--accent-green)]">
              <Award className="h-4 w-4" />
              <span>
                Parabéns! Você dominou o fluxo completo de criação sem código no Antigravity.
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="space-y-6">
        {PHASES.map((phase) => {
          const items = CHECKLIST_ITEMS.filter((item) => item.phase === phase);
          const phaseDone = items.filter((i) => completedIds.includes(i.id)).length;

          return (
            <section key={phase} className="editorial-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border-default)] pb-3">
                <h2 className="text-base font-bold text-[var(--text-primary)]">{phase}</h2>
                <span className="rounded-full bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-semibold text-[var(--text-secondary)]">
                  {phaseDone}/{items.length}
                </span>
              </div>

              <div className="space-y-3">
                {items.map((item) => {
                  const checked = completedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`flex flex-col gap-3 rounded-xl border p-4 transition-colors sm:flex-row sm:items-start sm:justify-between ${
                        checked
                          ? 'border-emerald-500/35 bg-[var(--accent-green-soft)]/35'
                          : 'border-[var(--border-default)] bg-[var(--surface-page)]'
                      }`}
                    >
                      <button
                        id={`checklist-toggle-${item.id}`}
                        type="button"
                        onClick={() => onToggleItem(item.id)}
                        className="flex flex-1 items-start gap-3 text-left cursor-pointer"
                      >
                        {checked ? (
                          <CheckSquare className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-green)]" />
                        ) : (
                          <Square className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-muted)]" />
                        )}
                        <div>
                          <p
                            className={`text-sm font-bold ${
                              checked
                                ? 'text-[var(--text-secondary)] line-through'
                                : 'text-[var(--text-primary)]'
                            }`}
                          >
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                            {item.description}
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigate(item.relatedSection)}
                        className="inline-flex shrink-0 items-center gap-1 self-end text-xs font-semibold text-[var(--accent-blue)] hover:underline sm:self-center cursor-pointer"
                      >
                        <span>Revisar guia</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
