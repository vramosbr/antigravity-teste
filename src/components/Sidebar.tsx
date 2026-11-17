import {
  BookOpen,
  CheckSquare,
  Compass,
  Cpu,
  Home,
  Layers,
  LifeBuoy,
  MessageSquareCode,
  PlayCircle,
  Route,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { GUIDE_MODULES } from '../data/modules';
import type { SectionId } from '../types/guide';

interface SidebarProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  checklistDone: number;
  checklistTotal: number;
}

const MODULE_ICONS = {
  'modulo-1': Compass,
  'modulo-2': Cpu,
  'modulo-3': Workflow,
  'modulo-4': Route,
  'modulo-5': LifeBuoy,
} as const;

const TOOL_ITEMS: {
  id: SectionId;
  label: string;
  badge?: string;
  icon: typeof Sparkles;
}[] = [
  { id: 'seletor-modelo', label: 'Qual Modelo Escolher?', badge: 'Quiz', icon: Sparkles },
  { id: 'biblioteca-prompts', label: 'Biblioteca de Prompts', icon: MessageSquareCode },
  { id: 'simulador', label: 'Simulador Agêntico', icon: PlayCircle },
  { id: 'glossario', label: 'Glossário Tradutor', icon: BookOpen },
  { id: 'checklist', label: 'Checklist do Criador', icon: CheckSquare },
];

export function Sidebar({
  activeSection,
  onSelectSection,
  mobileOpen,
  onCloseMobile,
  checklistDone,
  checklistTotal,
}: SidebarProps) {
  const progressPercent =
    checklistTotal > 0 ? Math.round((checklistDone / checklistTotal) * 100) : 0;

  function handleNavigate(section: SectionId) {
    onSelectSection(section);
    onCloseMobile();
  }

  const renderNavContent = (isMobile: boolean) => {
    const idPrefix = isMobile ? 'mobile-' : '';
    return (
      <div className="flex h-full flex-col justify-between px-3 py-5">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center justify-between px-2">
            <button
              id={`${idPrefix}nav-brand-home`}
              type="button"
              onClick={() => handleNavigate('inicio')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm dark:bg-blue-500">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Antigravity
                </p>
                <p className="text-xs font-medium text-[var(--text-muted)]">
                  Sem Código • Guia IA
                </p>
              </div>
            </button>

            {isMobile && (
              <button
                id="close-mobile-drawer"
                type="button"
                onClick={onCloseMobile}
                aria-label="Fechar menu"
                className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Overview */}
          <div className="space-y-1">
            <button
              id={`${idPrefix}nav-inicio`}
              type="button"
              onClick={() => handleNavigate('inicio')}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                activeSection === 'inicio'
                  ? 'bg-[var(--accent-blue-soft)] text-[var(--accent-blue)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Home className="h-4 w-4 shrink-0" />
              <span>Visão Geral</span>
            </button>
          </div>

          {/* 5 Modules */}
          <div className="space-y-1.5">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Trilha de Aprendizado
            </p>
            <nav className="space-y-1" aria-label="Módulos do guia">
              {GUIDE_MODULES.map((mod) => {
                const Icon = MODULE_ICONS[mod.id];
                const isActive = activeSection === mod.id;
                return (
                  <button
                    key={mod.id}
                    id={`${idPrefix}nav-${mod.id}`}
                    type="button"
                    onClick={() => handleNavigate(mod.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[var(--accent-blue-soft)] text-[var(--accent-blue)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {mod.number}. {mod.shortTitle}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 5 Interactive Tools */}
          <div className="space-y-1.5">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Ferramentas Práticas
            </p>
            <nav className="space-y-1" aria-label="Ferramentas interativas">
              {TOOL_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`${idPrefix}nav-${item.id}`}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[var(--accent-blue-soft)] text-[var(--accent-blue)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                    {item.badge && (
                      <span className="rounded-full bg-[var(--accent-green-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent-green)]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Progress Widget */}
        <button
          id={`${idPrefix}sidebar-progress-card`}
          type="button"
          onClick={() => handleNavigate('checklist')}
          className="mt-6 w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-muted)] p-3.5 text-left transition-colors hover:border-[var(--border-strong)] cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
            <span>Seu Progresso</span>
            <span className="text-[var(--accent-blue)]">{progressPercent}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-subtle)]">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[var(--text-muted)]">
            {checklistDone} de {checklistTotal} marcos concluídos
          </p>
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-72 lg:flex-col border-r border-[var(--border-default)] bg-[var(--surface-card)] overflow-y-auto">
        {renderNavContent(false)}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative flex h-full w-76 max-w-[85vw] flex-col border-r border-[var(--border-default)] bg-[var(--surface-card)] overflow-y-auto shadow-xl">
            {renderNavContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
