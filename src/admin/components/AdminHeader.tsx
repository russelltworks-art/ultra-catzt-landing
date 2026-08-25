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
} from 'lucide-react';

interface AdminHeaderProps {
  lastPublished: string;
  saveStatus: string;
  viewMode: 'editor' | 'split' | 'preview';
  onViewModeChange: (mode: 'editor' | 'split' | 'preview') => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  lastPublished,
  saveStatus,
  viewMode,
  onViewModeChange,
  onSaveDraft,
  onPublish,
  onLogout,
}) => {
  return (
    <header className="bg-[#0e0e11] border-b border-zinc-800/80 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shrink-0 select-none shadow-md">
      {/* Brand & Status */}
      <div className="flex items-center gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold tracking-wide text-white uppercase">
              Catzt CMS
            </span>
            <span className="text-[10px] bg-amber-400/15 text-amber-300 font-semibold px-2 py-0.5 rounded-md border border-amber-400/30">
              Visual Studio Pro
            </span>
          </div>
          <p className="text-[10px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {lastPublished
              ? `Live Synced · ${new Date(lastPublished).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'Draft Workspace Active'}
          </p>
        </div>
      </div>

      {/* Center View Mode Switcher */}
      <div className="hidden md:flex items-center bg-[#151518] p-1 rounded-xl border border-zinc-800 shadow-inner">
        <button
          type="button"
          onClick={() => onViewModeChange('editor')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            viewMode === 'editor'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Editor Only View"
        >
          <Square className="w-3.5 h-3.5" /> Editor Only
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('split')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
            viewMode === 'split'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Split Screen Live Preview"
        >
          <Columns className="w-3.5 h-3.5" /> Live Split View
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('preview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            viewMode === 'preview'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Full Preview View"
        >
          <Eye className="w-3.5 h-3.5" /> Full Canvas
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        {saveStatus && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800 animate-in fade-in">
            <CheckCircle className="w-3.5 h-3.5" />
            <span className="font-medium text-[11px]">{saveStatus}</span>
          </div>
        )}

        <button
          type="button"
          onClick={onSaveDraft}
          className="flex items-center gap-1.5 text-xs bg-[#1a1a1e] hover:bg-zinc-800 text-zinc-200 px-3.5 py-2 rounded-xl font-semibold border border-zinc-700/80 transition shadow-sm hover:border-zinc-600"
        >
          <Save className="w-3.5 h-3.5 text-zinc-400" /> Save Draft
        </button>

        <button
          type="button"
          onClick={onPublish}
          className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black px-4 py-2 rounded-xl font-bold shadow-lg shadow-amber-400/20 transition active:scale-[0.98]"
        >
          <Send className="w-3.5 h-3.5" /> Publish Live
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition"
          title="Open Live Website"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        <div className="h-4 w-px bg-zinc-800 mx-0.5" />

        <button
          type="button"
          onClick={onLogout}
          title="Logout"
          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-950/30 rounded-xl transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
