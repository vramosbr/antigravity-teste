import { useEffect, useState } from 'react';
import { AgenticSimulator } from './components/AgenticSimulator';
import { CreatorChecklist } from './components/CreatorChecklist';
import { GlossaryModal } from './components/GlossaryModal';
import { GlossaryView } from './components/GlossaryView';
import { HomeOverview } from './components/HomeOverview';
import { ModelSelectorTool } from './components/ModelSelectorTool';
import { ModuleView } from './components/ModuleView';
import { PromptLibrary } from './components/PromptLibrary';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { CHECKLIST_ITEMS } from './data/checklist';
import type { ModuleId, SectionId } from './types/guide';

const THEME_STORAGE_KEY = 'antigravity-sem-codigo:theme';
const CHECKLIST_STORAGE_KEY = 'antigravity-sem-codigo:checklist';

function loadInitialTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // Ignore storage unavailability
  }
  return 'light';
}

function loadInitialChecklist(): string[] {
  try {
    const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const validIds = new Set(CHECKLIST_ITEMS.map((i) => i.id));
      return parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id));
    }
  } catch {
    // Ignore invalid storage payload
  }
  return [];
}

function isModuleSection(section: SectionId): section is ModuleId {
  return (
    section === 'modulo-1' ||
    section === 'modulo-2' ||
    section === 'modulo-3' ||
    section === 'modulo-4' ||
    section === 'modulo-5'
  );
}

export function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');
  const [highlightId, setHighlightId] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glossaryModalOpen, setGlossaryModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(loadInitialTheme);
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>(
    loadInitialChecklist
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage error
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(completedChecklistIds));
    } catch {
      // Ignore storage error
    }
  }, [completedChecklistIds]);

  function handleNavigate(section: SectionId, targetHighlight?: string) {
    setActiveSection(section);
    setHighlightId(targetHighlight);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleToggleChecklistItem(id: string) {
    setCompletedChecklistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleResetChecklist() {
    setCompletedChecklistIds([]);
  }

  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)]">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={(sec) => handleNavigate(sec)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        checklistDone={completedChecklistIds.length}
        checklistTotal={CHECKLIST_ITEMS.length}
      />

      <div className="lg:pl-72 flex min-h-screen flex-col">
        <TopBar
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onSelectResult={(sec, hi) => handleNavigate(sec, hi)}
          onOpenGlossaryModal={() => setGlossaryModalOpen(true)}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        />

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {activeSection === 'inicio' && (
            <HomeOverview
              onNavigate={handleNavigate}
              checklistDone={completedChecklistIds.length}
              checklistTotal={CHECKLIST_ITEMS.length}
            />
          )}

          {isModuleSection(activeSection) && (
            <ModuleView
              key={`${activeSection}-${highlightId ?? 'default'}`}
              moduleId={activeSection}
              initialHighlightId={highlightId}
              onNavigate={handleNavigate}
            />
          )}

          {activeSection === 'seletor-modelo' && <ModelSelectorTool />}

          {activeSection === 'biblioteca-prompts' && (
            <PromptLibrary
              key={highlightId ?? 'default'}
              initialHighlightId={highlightId}
            />
          )}

          {activeSection === 'simulador' && <AgenticSimulator />}

          {activeSection === 'glossario' && (
            <GlossaryView initialHighlightId={highlightId} />
          )}

          {activeSection === 'checklist' && (
            <CreatorChecklist
              completedIds={completedChecklistIds}
              onToggleItem={handleToggleChecklistItem}
              onReset={handleResetChecklist}
              onNavigate={(sec) => handleNavigate(sec)}
            />
          )}
        </main>

        <footer className="border-t border-[var(--border-default)] py-5 px-4 sm:px-6 lg:px-8 text-center text-xs text-[var(--text-muted)]">
          Antigravity Sem Código — Guia Prático de Criação com IA e Modelos Google • 100% executado no seu navegador
        </footer>
      </div>

      <GlossaryModal
        open={glossaryModalOpen}
        onClose={() => setGlossaryModalOpen(false)}
        onOpenFullGlossary={() => handleNavigate('glossario')}
      />
    </div>
  );
}

export default App;
