import { BookOpen, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';
import type { GlossaryTerm } from '../types/guide';

interface GlossaryViewProps {
  initialHighlightId?: string;
}

const CATEGORIES: ('Todos' | GlossaryTerm['category'])[] = [
  'Todos',
  'Interface',
  'IA & Modelos',
  'Publicação & Segurança',
];

export function GlossaryView({ initialHighlightId }: GlossaryViewProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'Todos' | GlossaryTerm['category']>('Todos');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((item) => {
      const matchesCat = category === 'Todos' || item.category === category;
      const matchesSearch =
        !q ||
        `${item.term} ${item.aka ?? ''} ${item.plainMeaning} ${item.analogy} ${item.whereYouSeeIt}`
          .toLowerCase()
          .includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="space-y-6">
      <header className="editorial-card rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)]">
          <BookOpen className="h-3.5 w-3.5 text-[var(--accent-blue)]" />
          <span>Sem Jargões</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          Glossário Tradutor: Tech → Português Claro
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Viu uma palavra estranha na tela do Antigravity ou na resposta do agente? Pesquise abaixo para entender o significado real usando analogias do dia a dia.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            id="glossary-page-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar por termo ou significado..."
            className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                category === cat
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'border border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="editorial-card rounded-2xl p-10 text-center text-sm text-[var(--text-muted)]">
          Nenhum termo encontrado para "{search}".
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((item) => {
            const highlighted = initialHighlightId === item.id;
            return (
              <article
                key={item.id}
                id={`glossary-term-${item.id}`}
                className={`editorial-card flex flex-col justify-between rounded-2xl p-5 space-y-4 ${
                  highlighted ? 'ring-2 ring-blue-500/60' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-bold text-[var(--text-primary)]">{item.term}</h2>
                      {item.aka && (
                        <p className="text-xs font-medium text-[var(--text-muted)]">{item.aka}</p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full bg-[var(--accent-blue-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--accent-blue)]">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--text-primary)]">
                    {item.plainMeaning}
                  </p>
                </div>

                <div className="space-y-2 border-t border-[var(--border-default)] pt-3 text-xs">
                  <p className="rounded-lg bg-[var(--surface-page)] p-3 text-[var(--text-secondary)] border border-[var(--border-default)]">
                    <strong className="text-[var(--text-primary)]">Analogia:</strong> {item.analogy}
                  </p>
                  <p className="text-[var(--text-muted)]">
                    <strong className="text-[var(--text-secondary)]">Onde aparece:</strong>{' '}
                    {item.whereYouSeeIt}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
