import React from 'react';
import {
  Palette,
  Type,
  Maximize2,
  Sparkles,
  Sliders,
  Sun,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface SectionStyleConfig {
  bgColor?: string;
  gradientPreset?: 'none' | 'amber-glow' | 'emerald-cyber' | 'violet-neon' | 'monochrome';
  containerWidth?: 'standard' | 'wide' | 'full';
  paddingY?: 'compact' | 'normal' | 'spacious';
  fontFamily?: 'sans' | 'heading-heavy' | 'mono';
  headingGradient?: boolean;
  glassmorphism?: boolean;
  glowEffect?: boolean;
  borderRadius?: 'none' | 'rounded-xl' | 'rounded-3xl';
}

interface StyleInspectorPanelProps {
  title: string;
  styleConfig: SectionStyleConfig;
  onChange: (updated: SectionStyleConfig) => void;
}

export const StyleInspectorPanel: React.FC<StyleInspectorPanelProps> = ({
  title,
  styleConfig,
  onChange,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleUpdate = (field: keyof SectionStyleConfig, value: any) => {
    onChange({
      ...styleConfig,
      [field]: value,
    });
  };

  return (
    <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl overflow-hidden transition mb-5 shadow-lg">
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-5 py-3.5 bg-[#17171b] flex items-center justify-between cursor-pointer select-none border-b border-zinc-800/80 hover:bg-[#1a1a1f] transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Visual Style & Canvas Inspector
              </span>
              <span className="text-[10px] bg-zinc-800 text-amber-300 font-mono px-2 py-0.5 rounded">
                Wix/Webflow Studio
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Customize typography, background gradients, padding, and lighting for {title}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Controls */}
      {isExpanded && (
        <div className="p-5 space-y-5 bg-[#121215] animate-in fade-in duration-150">
          {/* 1. Background & Gradient Themes */}
          <div>
            <label className="text-xs font-bold text-zinc-300 mb-2 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> Background Atmosphere & Lighting Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { id: 'none', label: 'Deep Obsidian', color: 'bg-[#09090b]' },
                { id: 'amber-glow', label: 'Amber Cyber', color: 'bg-gradient-to-r from-amber-950/60 to-black' },
                { id: 'emerald-cyber', label: 'Matrix Teal', color: 'bg-gradient-to-r from-emerald-950/60 to-black' },
                { id: 'violet-neon', label: 'Cyber Violet', color: 'bg-gradient-to-r from-purple-950/60 to-black' },
                { id: 'monochrome', label: 'Titanium Steel', color: 'bg-gradient-to-r from-zinc-900 to-black' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleUpdate('gradientPreset', theme.id)}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between h-16 ${
                    (styleConfig.gradientPreset || 'none') === theme.id
                      ? 'border-amber-400 ring-1 ring-amber-400/40 bg-zinc-800'
                      : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/60'
                  }`}
                >
                  <div className={`w-full h-3 rounded ${theme.color} border border-white/10`} />
                  <span className="text-[10px] font-semibold text-zinc-200 truncate">
                    {theme.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Spacing & Container Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                Section Vertical Padding (Spacing)
              </label>
              <select
                value={styleConfig.paddingY || 'normal'}
                onChange={(e) => handleUpdate('paddingY', e.target.value)}
                className="w-full bg-[#18181c] border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="compact">Compact (py-12 · 48px)</option>
                <option value="normal">Standard (py-24 · 96px)</option>
                <option value="spacious">Spacious Studio (py-36 · 144px)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                Content Container Width
              </label>
              <select
                value={styleConfig.containerWidth || 'standard'}
                onChange={(e) => handleUpdate('containerWidth', e.target.value)}
                className="w-full bg-[#18181c] border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="standard">Standard Boxed (max-w-6xl · 1152px)</option>
                <option value="wide">Wide Screen (max-w-7xl · 1280px)</option>
                <option value="full">Full Bleed Canvas (w-full · 100%)</option>
              </select>
            </div>
          </div>

          {/* 3. Typography & Heading Text Effects */}
          <div className="bg-[#18181c] p-4 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-amber-400" /> Typography & Text Gradient
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={styleConfig.headingGradient !== false}
                  onChange={(e) => handleUpdate('headingGradient', e.target.checked)}
                  className="rounded text-amber-400 focus:ring-0 bg-zinc-900 border-zinc-700 w-3.5 h-3.5"
                />
                <span>Enable Golden Metallic Heading Gradient</span>
              </label>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-xs font-semibold text-zinc-400">Glassmorphic Container Backing</span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={!!styleConfig.glassmorphism}
                  onChange={(e) => handleUpdate('glassmorphism', e.target.checked)}
                  className="rounded text-amber-400 focus:ring-0 bg-zinc-900 border-zinc-700 w-3.5 h-3.5"
                />
                <span>Backdrop Blur & Frost Border</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
