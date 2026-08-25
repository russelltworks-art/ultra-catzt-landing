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
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onExport,
  onImport,
  onReset,
  isCollapsed,
  onToggleCollapse,
}) => {
  const pageNav = [
    { id: 'builder', label: 'Visual Page Builder', badge: 'Wix', icon: Sparkles },
    { id: 'hero', label: 'Homepage & Hero', badge: '3D', icon: Home },
    { id: 'aPropos', label: 'A Propos', badge: 'Stats', icon: Info },
    { id: 'expertises', label: '8 Expertises', badge: '8 Grid', icon: Layers },
    { id: 'references', label: 'Références & Clients', badge: 'Logos', icon: Award },
    { id: 'actualites', label: 'Actualités & Blog', badge: 'Hub', icon: Newspaper },
    { id: 'nousRejoindre', label: 'Nous Rejoindre', badge: 'Careers', icon: Users },
    { id: 'contact', label: 'Contact & Offices', badge: 'Offices', icon: Mail },
  ];

  return (
    <aside
      className={`bg-[#0c0c0e] border-r border-zinc-800/80 flex flex-col justify-between flex-shrink-0 select-none transition-all duration-300 relative z-30 ${
        isCollapsed ? 'w-16' : 'w-64 sm:w-72'
      }`}
    >
      {/* Top Sidebar Header & Collapse Toggle */}
      <div className="p-3 border-b border-zinc-800/60 flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest px-2 truncate">
            Explorer & Layers
          </span>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          title={isCollapsed ? 'Expand Sidebar (Ctrl+\\)' : 'Collapse Sidebar to Mini Rail'}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4 text-amber-400" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="p-2.5 space-y-5 overflow-y-auto flex-1">
        {/* Core Pages */}
        <div>
          {!isCollapsed && (
            <div className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest px-2.5 mb-2">
              PAGES & CANVAS
            </div>
          )}
          <nav className="space-y-1">
            {pageNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl text-xs font-medium transition group ${
                    isCollapsed
                      ? 'justify-center p-2.5'
                      : 'justify-between px-3 py-2'
                  } ${
                    isActive
                      ? 'bg-zinc-800/90 text-white font-semibold shadow-sm border-l-2 border-amber-400'
                      : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition ${
                        isActive ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    />
                    {!isCollapsed && <span className="truncate text-xs">{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                        isActive
                          ? 'bg-amber-400/20 text-amber-300 font-semibold'
                          : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Growth & Ecosystem */}
        <div>
          {!isCollapsed && (
            <div className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest px-2.5 mb-2">
              GROWTH & ASSETS
            </div>
          )}
          <nav className="space-y-1">
            <button
              onClick={() => onSelectTab('seo-hub')}
              title={isCollapsed ? 'SEO & Social Growth Hub' : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-medium transition group ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'justify-between px-3 py-2'
              } ${
                activeTab === 'seo-hub'
                  ? 'bg-zinc-800/90 text-white font-semibold shadow-sm border-l-2 border-amber-400'
                  : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Share2
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === 'seo-hub' ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                {!isCollapsed && <span className="truncate text-xs">SEO & Social Hub</span>}
              </div>
            </button>

            <button
              onClick={() => onSelectTab('media')}
              title={isCollapsed ? 'Media Asset Library' : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-medium transition group ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'justify-between px-3 py-2'
              } ${
                activeTab === 'media'
                  ? 'bg-zinc-800/90 text-white font-semibold shadow-sm border-l-2 border-amber-400'
                  : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <ImageIcon
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === 'media' ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                {!isCollapsed && <span className="truncate text-xs">Media Library</span>}
              </div>
            </button>

            <button
              onClick={() => onSelectTab('global')}
              title={isCollapsed ? 'Global Settings & Footer' : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-medium transition group ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'justify-between px-3 py-2'
              } ${
                activeTab === 'global'
                  ? 'bg-zinc-800/90 text-white font-semibold shadow-sm border-l-2 border-amber-400'
                  : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Settings
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === 'global' ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                {!isCollapsed && <span className="truncate text-xs">Global Settings</span>}
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Backup & System Controls */}
      <div className="p-3 border-t border-zinc-800/80 bg-[#09090b] space-y-2">
        {!isCollapsed ? (
          <>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={onExport}
                className="flex items-center justify-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] py-1.5 rounded-lg border border-zinc-800 transition"
                title="Export JSON Backup"
              >
                <Download className="w-3 h-3 text-zinc-400" /> Export
              </button>

              <label className="flex items-center justify-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] py-1.5 rounded-lg border border-zinc-800 cursor-pointer transition">
                <Upload className="w-3 h-3 text-zinc-400" /> Import
                <input type="file" accept=".json" onChange={onImport} className="hidden" />
              </label>
            </div>

            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-1 text-zinc-500 hover:text-red-400 text-[10px] py-0.5 transition"
            >
              <RotateCcw className="w-2.5 h-2.5" /> Reset Defaults
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onExport}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              title="Export JSON Backup"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
