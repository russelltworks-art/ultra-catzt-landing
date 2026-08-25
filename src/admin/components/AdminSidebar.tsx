import React from 'react';
import {
  Home,
  Info,
  Layers,
  Award,
  Newspaper,
  Users,
  Mail,
  Settings,
  Image as ImageIcon,
  Download,
  Upload,
  RotateCcw,
  Share2,
  Sparkles,
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onExport,
  onImport,
  onReset,
}) => {
  const pageNav = [
    { id: 'hero', label: 'Homepage & Hero', badge: '3D Portal', icon: Home },
    { id: 'aPropos', label: 'A Propos', badge: 'Stats', icon: Info },
    { id: 'expertises', label: '8 Expertises', badge: '8 Grid', icon: Layers },
    { id: 'references', label: 'Références & Clients', badge: 'Logos', icon: Award },
    { id: 'actualites', label: 'Actualités (Articles & Blog)', badge: 'CMS Hub', icon: Newspaper },
    { id: 'nousRejoindre', label: 'Nous Rejoindre', badge: 'Careers', icon: Users },
    { id: 'contact', label: 'Contact & Offices', badge: 'Offices', icon: Mail },
  ];

  return (
    <aside className="w-72 bg-[#0c0c0e] border-r border-zinc-800/80 flex flex-col justify-between flex-shrink-0 select-none">
      {/* Navigation List */}
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Core Pages */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2.5">
            <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">
              Core Pages & Content
            </span>
            <span className="text-[9px] bg-zinc-800 text-zinc-400 font-mono px-1.5 py-0.5 rounded">
              7 Sections
            </span>
          </div>
          <nav className="space-y-1">
            {pageNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition group ${
                    isActive
                      ? 'bg-zinc-800/90 text-white font-semibold shadow-sm border-l-2 border-amber-400 pl-3'
                      : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition ${
                        isActive ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 transition ${
                      isActive
                        ? 'bg-amber-400/20 text-amber-300 font-semibold'
                        : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Growth & SEO Hub */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2.5">
            <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">
              Growth & Ecosystem
            </span>
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => onSelectTab('seo-hub')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition group ${
                activeTab === 'seo-hub'
                  ? 'bg-zinc-800/90 text-white font-semibold shadow-sm border-l-2 border-amber-400 pl-3'
                  : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Share2
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === 'seo-hub' ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                <span className="truncate">SEO & Social Growth Hub</span>
              </div>
              <span className="text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.5 rounded font-mono font-semibold">
                Google/Meta
              </span>
            </button>

            <button
              onClick={() => onSelectTab('media')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition group ${
                activeTab === 'media'
                  ? 'bg-zinc-800/90 text-white font-semibold shadow-sm border-l-2 border-amber-400 pl-3'
                  : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <ImageIcon
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === 'media' ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                <span className="truncate">Media Asset Library</span>
              </div>
              <span className="text-[9px] bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded font-mono">
                CDN Assets
              </span>
            </button>

            <button
              onClick={() => onSelectTab('global')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition group ${
                activeTab === 'global'
                  ? 'bg-zinc-800/90 text-white font-semibold shadow-sm border-l-2 border-amber-400 pl-3'
                  : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Settings
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === 'global' ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                <span className="truncate">Global Settings & Footer</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Backup & System Controls */}
      <div className="p-4 border-t border-zinc-800/80 bg-[#09090b] space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onExport}
            className="flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] py-2 rounded-xl font-medium border border-zinc-800 transition shadow-sm"
            title="Export JSON Backup"
          >
            <Download className="w-3 h-3 text-zinc-400" /> Export JSON
          </button>

          <label className="flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] py-2 rounded-xl font-medium border border-zinc-800 cursor-pointer transition shadow-sm">
            <Upload className="w-3 h-3 text-zinc-400" /> Import JSON
            <input type="file" accept=".json" onChange={onImport} className="hidden" />
          </label>
        </div>

        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-1.5 text-zinc-500 hover:text-red-400 text-[10px] py-1 transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset all fields to default
        </button>
      </div>
    </aside>
  );
};
