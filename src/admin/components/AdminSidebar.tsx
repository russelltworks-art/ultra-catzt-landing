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
  const navItems = [
    { id: 'hero', label: 'Homepage & Hero', icon: Home },
    { id: 'aPropos', label: 'A Propos', icon: Info },
    { id: 'expertises', label: '8 Expertises', icon: Layers },
    { id: 'references', label: 'Références & Clients', icon: Award },
    { id: 'actualites', label: 'Actualités (Articles & Blog)', icon: Newspaper },
    { id: 'nousRejoindre', label: 'Nous Rejoindre', icon: Users },
    { id: 'contact', label: 'Contact & Offices', icon: Mail },
  ];

  return (
    <aside className="w-64 bg-[#141414] border-r border-gray-800 flex flex-col justify-between flex-shrink-0">
      {/* Top Navigation */}
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Core Sections */}
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            PAGES & SECTIONS
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition text-left ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-300 font-semibold border border-amber-400/30'
                      : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Growth & Integrations */}
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            GROWTH & ASSETS
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => onSelectTab('seo-hub')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition text-left ${
                activeTab === 'seo-hub'
                  ? 'bg-amber-400/15 text-amber-300 font-semibold border border-amber-400/30'
                  : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <Share2 className={`w-4 h-4 ${activeTab === 'seo-hub' ? 'text-amber-400' : 'text-gray-400'}`} />
              <span>SEO & Social Growth Hub</span>
            </button>

            <button
              onClick={() => onSelectTab('media')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition text-left ${
                activeTab === 'media'
                  ? 'bg-amber-400/15 text-amber-300 font-semibold border border-amber-400/30'
                  : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <ImageIcon className={`w-4 h-4 ${activeTab === 'media' ? 'text-amber-400' : 'text-gray-400'}`} />
              <span>Media Asset Library</span>
            </button>

            <button
              onClick={() => onSelectTab('global')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition text-left ${
                activeTab === 'global'
                  ? 'bg-amber-400/15 text-amber-300 font-semibold border border-amber-400/30'
                  : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <Settings className={`w-4 h-4 ${activeTab === 'global' ? 'text-amber-400' : 'text-gray-400'}`} />
              <span>Global Settings & Footer</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-800 bg-[#111111] space-y-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onExport}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-[11px] py-2 rounded-lg font-medium transition"
            title="Export JSON Backup"
          >
            <Download className="w-3 h-3" /> Backup
          </button>

          <label className="flex-1 flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-[11px] py-2 rounded-lg font-medium cursor-pointer transition">
            <Upload className="w-3 h-3" /> Restore
            <input type="file" accept=".json" onChange={onImport} className="hidden" />
          </label>
        </div>

        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-1 text-gray-400 hover:text-red-400 text-[11px] py-1 transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset to Defaults
        </button>
      </div>
    </aside>
  );
};
