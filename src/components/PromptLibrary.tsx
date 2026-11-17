import { Edit3, MessageSquareCode, RotateCcw } from 'lucide-react';
import { Fragment, useState } from 'react';
import { PROMPT_CATEGORIES, PROMPT_TEMPLATES } from '../data/prompts';
import type { PromptCategory, PromptTemplate } from '../types/guide';
import { CopyButton } from './CopyButton';

interface PromptLibraryProps {
  initialHighlightId?: string;
}

function resolvePromptText(
  prompt: PromptTemplate,
  customValues: Record<string, string>
): string {
  let result = prompt.template;
  for (const ph of prompt.placeholders) {
    const val = customValues[ph.key]?.trim();
    if (val) {
      result = result.replace(`[PREENCHA AQUI: ${ph.key}]`, val);
    }
  }
  return result;
}

function renderHighlightedTemplate(text: string) {
  const parts = text.split(/(\[PREENCHA AQUI:[^\]]+\])/g);
  return parts.map((part, index) => {
    if (part.startsWith('[PREENCHA AQUI:')) {
      return (
        <span
          key={index}
          className="mx-0.5 inline-block rounded-md border border-amber-500/40 bg-[var(--accent-amber-soft)] px-1.5 py-0.5 font-semibold text-[var(--accent-amber)]"
        >
          {part}
        </span>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function PromptLibrary({ initialHighlightId }: PromptLibraryProps) {
  const initialTarget = initialHighlightId
    ? PROMPT_TEMPLATES.find((p) => p.id === initialHighlightId)
    : undefined;
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | PromptCategory>(
    initialTarget ? initialTarget.category : 'Todos'
  );
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, Record<string, string>>>({});

  const filteredPrompts =
    selectedCategory === 'Todos'
      ? PROMPT_TEMPLATES
      : PROMPT_TEMPLATES.filter((p) => p.category === selectedCategory);

  function updateField(promptId: string, key: string, value: string) {
    setFieldValues((prev) => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] ?? {}),
        [key]: value,
      },
    }));
  }

  function clearFields(promptId: string) {
    setFieldValues((prev) => {
      const next = { ...prev };
      delete next[promptId];
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <header className="editorial-card rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-blue-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-blue)]">
          <MessageSquareCode className="h-3.5 w-3.5" />
          <span>Templates Prontos para Copiar</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          Biblioteca de Prompts Copiáveis
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Escolha seu objetivo abaixo. Os trechos destacados em{' '}
          <span className="rounded bg-[var(--accent-amber-soft)] px-1.5 py-0.5 text-xs font-semibold text-[var(--accent-amber)]">
            [PREENCHA AQUI]
          </span>{' '}
          mostram exatamente o que adaptar para o seu negócio — você pode preencher direto aqui ou após colar no chat do Antigravity.
        </p>
      </header>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorias de prompts">
        {(['Todos', ...PROMPT_CATEGORIES] as const).map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`prompt-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'border border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Prompt Cards */}
      <div className="space-y-5">
        {filteredPrompts.map((prompt) => {
          const customValues = fieldValues[prompt.id] ?? {};
          const finalText = resolvePromptText(prompt, customValues);
          const isEditing = editingPromptId === prompt.id;
          const isHighlighted = initialHighlightId === prompt.id;

          return (
            <article
              key={prompt.id}
              id={`prompt-card-${prompt.id}`}
              className={`editorial-card rounded-2xl p-6 space-y-4 ${
                isHighlighted ? 'ring-2 ring-blue-500/60' : ''
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[var(--accent-blue-soft)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-blue)]">
                      {prompt.category}
                    </span>
                    <span className="rounded-full bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
                      Sugestão: {prompt.recommendedModel}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">{prompt.title}</h2>
                  <p className="text-sm text-[var(--text-secondary)]">{prompt.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id={`toggle-fill-${prompt.id}`}
                    type="button"
                    onClick={() => setEditingPromptId(isEditing ? null : prompt.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--surface-page)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>{isEditing ? 'Ocultar campos' : 'Preencher aqui'}</span>
                  </button>

                  <CopyButton id={`copy-prompt-${prompt.id}`} text={finalText} size="sm" />
                </div>
              </div>

              {/* Optional inline fill-in helper */}
              {isEditing && (
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Preencha os campos para personalizar antes de copiar
                    </p>
                    <button
                      type="button"
                      onClick={() => clearFields(prompt.id)}
                      className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Limpar</span>
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {prompt.placeholders.map((ph) => (
                      <div key={ph.key} className="space-y-1">
                        <label
                          htmlFor={`${prompt.id}-${ph.key}`}
                          className="block text-xs font-semibold text-[var(--text-primary)]"
                        >
                          {ph.label}
                        </label>
                        <input
                          id={`${prompt.id}-${ph.key}`}
                          type="text"
                          value={customValues[ph.key] ?? ''}
                          onChange={(e) => updateField(prompt.id, ph.key, e.target.value)}
                          placeholder={`Ex.: ${ph.example}`}
                          className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-card)] px-3 py-1.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prompt body */}
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-primary)]">
                  {renderHighlightedTemplate(finalText)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
