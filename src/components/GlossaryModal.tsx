import { BookOpen, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';

interface GlossaryModalProps {
  open: boolean;
  onClose: () => void;
  onOpenFullGlossary: () => void;
}

export function GlossaryModal({ open, onClose, onOpenFullGlossary }: GlossaryModalProps) {
  const [search, setSearch] = useState('');

  const filteredTerms = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return GLOSSARY_TERMS;
    return GLOSSARY_TERMS.filter((item) =>
      `${item.term} ${item.aka ?? ''} ${item.plainMeaning} ${item.analogy}`
        .toLowerCase()
        .includes(q)
    );
  }, [search]);

  if (!open) return null;

  return (
    <div
      id="glossary-quick-modal"
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-modal-title"
    >
      <div className="flex h-full w-full max-w-lg flex-col border-l border-[var(--border-default)] bg-[var(--surface-card)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-blue-soft)] text-[var(--accent-blue)]">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 id="glossary-modal-title" className="text-base font-bold text-[var(--text-primary)]">
                Tradutor Tech → Português Claro
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Consulte qualquer palavra da interface sem sair da página atual
              </p>
            </div>
          </div>

          <button
            id="close-glossary-modal"
            type="button"
            onClick={onClose}
            aria-label="Fechar tradutor"
            className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-[var(--border-default)] px-5 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              id="glossary-modal-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex.: Artefato, API Key, Localhost, Deploy..."
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] py-2 pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {filteredTerms.length === 0 ? (
            <p className="py-8 text-center text-sm text-[var(--text-muted)]">
              Nenhum termo encontrado para "{search}".
            </p>
          ) : (
            filteredTerms.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.term}</h3>
                    {item.aka && (
                      <p className="text-xs text-[var(--text-muted)]">{item.aka}</p>
                    )}
                  </div>
                  <span className="rounded-full bg-[var(--surface-muted)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]">
                    {item.category}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.plainMeaning}
                </p>
                <p className="mt-2 rounded-lg bg-[var(--surface-card)] px-3 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-default)]">
                  <strong className="text-[var(--text-primary)]">Analogia:</strong> {item.analogy}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-[var(--border-default)] px-5 py-3 flex justify-end">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenFullGlossary();
            }}
            className="text-sm font-semibold text-[var(--accent-blue)] hover:underline cursor-pointer"
          >
            Abrir página completa do Glossário →
          </button>
        </div>
      </div>
    </div>
  );
}
