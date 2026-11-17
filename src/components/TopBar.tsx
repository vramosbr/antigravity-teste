import { BookOpen, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { SearchResultItem, SectionId } from '../types/guide';
import { searchGuide } from '../utils/search';

interface TopBarProps {
  onOpenMobileMenu: () => void;
  onSelectResult: (section: SectionId, highlightId?: string) => void;
  onOpenGlossaryModal: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const TYPE_BADGE_COLORS: Record<SearchResultItem['type'], string> = {
  Módulo: 'bg-[var(--accent-blue-soft)] text-[var(--accent-blue)]',
  Receita: 'bg-[var(--accent-green-soft)] text-[var(--accent-green)]',
  Prompt: 'bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]',
  Glossário: 'bg-[var(--surface-muted)] text-[var(--text-secondary)]',
  Ferramenta: 'bg-[var(--accent-blue-soft)] text-[var(--accent-blue)]',
};

export function TopBar({
  onOpenMobileMenu,
  onSelectResult,
  onOpenGlossaryModal,
  theme,
  onToggleTheme,
}: TopBarProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchGuide(query), [query]);
  const showDropdown = focused && query.trim().length > 0;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function handleChoose(item: SearchResultItem) {
    onSelectResult(item.targetSection, item.highlightId);
    setFocused(false);
    setQuery('');
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-default)] bg-[var(--surface-card)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-3">
          <button
            id="open-mobile-drawer"
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Abrir menu de navegação"
            className="rounded-lg border border-[var(--border-default)] p-2 text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] lg:hidden cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Instant Global Search */}
          <div ref={containerRef} className="relative w-full max-w-md">
            <label htmlFor="global-search-input" className="sr-only">
              Buscar módulos, receitas, prompts ou termos do glossário
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              id="global-search-input"
              type="text"
              value={query}
              onFocus={() => setFocused(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setFocused(true);
              }}
              placeholder="Buscar módulos, receitas, Gemini, API Key..."
              className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] py-2 pl-9 pr-9 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            {query && (
              <button
                id="clear-global-search"
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpar busca"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}

            {showDropdown && (
              <div
                id="global-search-results"
                className="absolute left-0 right-0 top-full mt-2 max-h-96 overflow-y-auto rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-2 shadow-xl"
              >
                {results.length === 0 ? (
                  <div className="px-3 py-4 text-center text-sm text-[var(--text-muted)]">
                    Nenhum resultado encontrado para "{query}". Tente termos como "Gemini", "Erro", "Artefato" ou "Planilha".
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {results.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleChoose(item)}
                          className="flex w-full flex-col gap-1 rounded-lg px-3 py-2 text-left transition-colors hover:bg-[var(--surface-muted)] cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-[var(--text-primary)]">
                              {item.title}
                            </span>
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${TYPE_BADGE_COLORS[item.type]}`}
                            >
                              {item.type}
                            </span>
                          </div>
                          <span className="line-clamp-1 text-xs text-[var(--text-secondary)]">
                            {item.subtitle}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            id="topbar-glossary-btn"
            type="button"
            onClick={onOpenGlossaryModal}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] px-3 py-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            title="Tradutor rápido de termos técnicos"
          >
            <BookOpen className="h-4 w-4 text-[var(--accent-blue)]" />
            <span className="hidden sm:inline">Tradutor Tech</span>
          </button>

          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
            title={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
