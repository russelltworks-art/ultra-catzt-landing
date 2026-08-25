import React from 'react';
import {
  Sparkles,
  Save,
  Send,
  CheckCircle,
  ExternalLink,
  LogOut,
  Columns,
  Square,
  Eye,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface AdminHeaderProps {
  lastPublished: string;
  saveStatus: string;
  viewMode: 'editor' | 'split' | 'preview';
  onViewModeChange: (mode: 'editor' | 'split' | 'preview') => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onLogout: () => void;
  isZenMode: boolean;
  onToggleZenMode: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  lastPublished,
  saveStatus,
  viewMode,
  onViewModeChange,
  onSaveDraft,
  onPublish,
  onLogout,
  isZenMode,
  onToggleZenMode,
  isSidebarCollapsed,
  onToggleSidebar,
}) => {
  return (
    <header className="bg-[#0e0e11] border-b border-zinc-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-0 z-50 shrink-0 select-none shadow-md">
      {/* Left: Brand & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar to Mini Rail'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-amber-400" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wide text-white uppercase">
                Catzt Studio
              </span>
              <span className="text-[9px] bg-amber-400/15 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-400/30">
                PRO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center View Mode Switcher */}
      <div className="flex items-center bg-[#151518] p-1 rounded-xl border border-zinc-800 shadow-inner">
        <button
          type="button"
          onClick={() => onViewModeChange('editor')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
            viewMode === 'editor'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Editor Only (Full Width)"
        >
          <Square className="w-3.5 h-3.5" /> Editor
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('split')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-bold transition ${
            viewMode === 'split'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Split Screen Live Preview"
        >
          <Columns className="w-3.5 h-3.5" /> Split Live
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('preview')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
            viewMode === 'preview'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Full Live Canvas"
        >
          <Eye className="w-3.5 h-3.5" /> Full Canvas
        </button>
      </div>

      {/* Right: Actions & Zen Mode */}
      <div className="flex items-center gap-2">
        {saveStatus && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
            <CheckCircle className="w-3 h-3" />
            <span className="text-[10px] font-semibold">{saveStatus}</span>
          </div>
        )}

        {/* Zen / Immersion Mode */}
        <button
          type="button"
          onClick={onToggleZenMode}
          className={`p-1.5 rounded-lg border transition ${
            isZenMode
              ? 'bg-amber-400 text-black border-amber-300 shadow-md shadow-amber-400/30'
              : 'bg-[#18181c] text-zinc-400 hover:text-white border-zinc-800 hover:bg-zinc-800'
          }`}
          title={isZenMode ? 'Exit Zen Mode' : 'Enter Zen Fullscreen Canvas (Figma Mode)'}
        >
          {isZenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={onSaveDraft}
          className="hidden sm:flex items-center gap-1.5 text-xs bg-[#1a1a1e] hover:bg-zinc-800 text-zinc-200 px-3 py-1.5 rounded-xl font-semibold border border-zinc-700/80 transition"
        >
          <Save className="w-3.5 h-3.5 text-zinc-400" /> Save
        </button>

        <button
          type="button"
          onClick={onPublish}
          className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black px-3.5 py-1.5 rounded-xl font-bold shadow-md shadow-amber-400/20 transition active:scale-[0.98]"
        >
          <Send className="w-3.5 h-3.5" /> Publish
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition"
          title="Open Live Website"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="h-4 w-px bg-zinc-800 mx-0.5" />

        <button
          type="button"
          onClick={onLogout}
          title="Logout"
          className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
