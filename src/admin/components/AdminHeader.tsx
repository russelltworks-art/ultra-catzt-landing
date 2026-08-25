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
    <header className="bg-[#1b1b1b] border-b border-gray-800 px-5 py-3 flex items-center justify-between sticky top-0 z-50 shrink-0 select-none">
      {/* Brand & Status */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold tracking-tight text-white">Catzt Kinetic CMS</h1>
            <span className="text-[10px] bg-amber-400/15 text-amber-300 px-1.5 py-0.5 rounded font-medium border border-amber-400/20">
              Live Visual Editor
            </span>
          </div>
          <p className="text-[11px] text-gray-400">
            {lastPublished
              ? `Published: ${new Date(lastPublished).toLocaleTimeString()} (${new Date(
                  lastPublished
                ).toLocaleDateString()})`
              : 'Draft Mode'}
          </p>
        </div>
      </div>

      {/* Center View Mode Switcher */}
      <div className="flex items-center bg-[#111111] p-1 rounded-lg border border-gray-800">
        <button
          type="button"
          onClick={() => onViewModeChange('editor')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            viewMode === 'editor' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Editor Only"
        >
          <Square className="w-3.5 h-3.5" /> Editor
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('split')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            viewMode === 'split' ? 'bg-amber-400/20 text-amber-300 font-semibold shadow-sm' : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Split Screen Editor + Live Preview"
        >
          <Columns className="w-3.5 h-3.5" /> Split Live Preview
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('preview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            viewMode === 'preview' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Full Preview Only"
        >
          <Eye className="w-3.5 h-3.5" /> Full Preview
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        {saveStatus && (
          <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/70 px-2.5 py-1.5 rounded-md border border-emerald-800 animate-pulse">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{saveStatus}</span>
          </div>
        )}

        <button
          type="button"
          onClick={onSaveDraft}
          className="flex items-center gap-1.5 text-xs bg-[#292929] hover:bg-[#333333] text-gray-200 px-3 py-1.5 rounded-lg font-medium border border-gray-700 transition"
        >
          <Save className="w-3.5 h-3.5" /> Save Draft
        </button>

        <button
          type="button"
          onClick={onPublish}
          className="flex items-center gap-1.5 text-xs bg-amber-400 hover:bg-amber-300 text-black px-4 py-1.5 rounded-lg font-semibold shadow-md shadow-amber-400/20 transition active:scale-[0.98]"
        >
          <Send className="w-3.5 h-3.5" /> Publish Live
        </button>

        <div className="h-4 w-px bg-gray-800 mx-1" />

        <button
          type="button"
          onClick={onLogout}
          title="Logout"
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
