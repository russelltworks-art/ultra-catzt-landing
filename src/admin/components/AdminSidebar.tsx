import React from 'react';
import {
  Home,
  Info,
  Layers,
  Award,
  Newspaper,
  Users,
  Mail,
  Layout,
  Image,
  Download,
  Upload,
  RotateCcw,
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
    { id: 'actualites', label: 'Actualités (News)', icon: Newspaper },
    { id: 'nousRejoindre', label: 'Nous Rejoindre', icon: Users },
    { id: 'contact', label: 'Contact & Offices', icon: Mail },
    { id: 'media', label: 'Media Asset Library', icon: Image },
    { id: 'global', label: 'Global Settings & Admin', icon: Layout },
  ];

  return (
    <aside className="w-60 bg-[#161616] border-r border-gray-800 p-3.5 flex flex-col gap-1 overflow-y-auto shrink-0 select-none">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 py-2">
        CMS Sections
      </p>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition duration-150 text-left ${
              isActive
                ? 'bg-amber-400/15 text-amber-300 font-semibold border border-amber-400/30'
                : 'text-gray-400 hover:bg-gray-800/80 hover:text-gray-200 border border-transparent'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-500'}`} />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}

      <div className="mt-auto pt-4 border-t border-gray-800 flex flex-col gap-1">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 py-1">
          Backups & Sync
        </p>

        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-800/60 transition"
        >
          <Download className="w-3.5 h-3.5" /> Export JSON
        </button>

        <label className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-800/60 cursor-pointer transition">
          <Upload className="w-3.5 h-3.5" /> Import Backup
          <input type="file" accept=".json" onChange={onImport} className="hidden" />
        </label>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 text-xs text-red-400/80 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-950/30 transition mt-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
        </button>
      </div>
    </aside>
  );
};
