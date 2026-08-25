import React, { useState } from 'react';
import { CMSContentSchema, PageSEOMetadata } from '../cmsContentStore';
import { StyleInspectorPanel, SectionStyleConfig } from './StyleInspectorPanel';
import { AddSectionModal, SectionTemplate } from './AddSectionModal';
import {
  Layers,
  Plus,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Trash2,
  Copy,
  Settings,
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface VisualSectionBuilderProps {
  formData: CMSContentSchema;
  onChange: (updated: CMSContentSchema) => void;
  onNavigateTab: (tab: string) => void;
}

export interface SectionNode {
  id: string;
  name: string;
  type: string;
  isVisible: boolean;
  styleConfig: SectionStyleConfig;
}

export const VisualSectionBuilder: React.FC<VisualSectionBuilderProps> = ({
  formData,
  onChange,
  onNavigateTab,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sections, setSections] = useState<SectionNode[]>([
    {
      id: 'hero',
      name: 'Homepage 3D Kinetic Hero Portal',
      type: 'Hero',
      isVisible: true,
      styleConfig: { gradientPreset: 'amber-glow', paddingY: 'spacious', containerWidth: 'wide' },
    },
    {
      id: 'aPropos',
      name: 'A Propos & Executive Statistics',
      type: 'Stats & Story',
      isVisible: true,
      styleConfig: { gradientPreset: 'none', paddingY: 'normal', containerWidth: 'standard' },
    },
    {
      id: 'expertises',
      name: '8 Core Expertises Modular Grid',
      type: 'Features Matrix',
      isVisible: true,
      styleConfig: { gradientPreset: 'monochrome', paddingY: 'normal', containerWidth: 'wide' },
    },
    {
      id: 'references',
      name: 'Références & Infinite Client Marquee',
      type: 'Social Proof',
      isVisible: true,
      styleConfig: { gradientPreset: 'none', paddingY: 'compact', containerWidth: 'wide' },
    },
    {
      id: 'actualites',
      name: 'Actualités (Articles & Thought Leadership Hub)',
      type: 'Blog & Media',
      isVisible: true,
      styleConfig: { gradientPreset: 'none', paddingY: 'normal', containerWidth: 'standard' },
    },
    {
      id: 'nousRejoindre',
      name: 'Nous Rejoindre & Career Recruitment',
      type: 'Recruitment Banner',
      isVisible: true,
      styleConfig: { gradientPreset: 'amber-glow', paddingY: 'normal', containerWidth: 'standard' },
    },
    {
      id: 'contact',
      name: 'Contact & Paris Office Headquarters',
      type: 'Contact & Footer',
      isVisible: true,
      styleConfig: { gradientPreset: 'none', paddingY: 'normal', containerWidth: 'standard' },
    },
  ]);

  const [expandedSectionId, setExpandedSectionId] = useState<string | null>('hero');

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSections(updated);
  };

  const handleToggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s))
    );
  };

  const handleDuplicate = (sec: SectionNode) => {
    const copy: SectionNode = {
      ...sec,
      id: `${sec.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${sec.name} (Copy)`,
    };
    setSections((prev) => [...prev, copy]);
  };

  const handleDelete = (id: string) => {
    if (sections.length <= 1) {
      alert('You must have at least one section on canvas.');
      return;
    }
    if (window.confirm('Delete this section from the visual canvas?')) {
      setSections((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleAddTemplate = (template: SectionTemplate) => {
    const newSec: SectionNode = {
      id: `custom-${template.id}-${Date.now().toString().slice(-4)}`,
      name: template.name,
      type: template.category,
      isVisible: true,
      styleConfig: {
        gradientPreset: 'amber-glow',
        paddingY: 'normal',
        containerWidth: 'wide',
        headingGradient: true,
      },
    };
    setSections((prev) => [...prev, newSec]);
    setExpandedSectionId(newSec.id);
  };

  const handleStyleChange = (id: string, newStyle: SectionStyleConfig) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, styleConfig: newStyle } : s))
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#131316] border border-zinc-800/80 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            Visual Page Builder & Section Hierarchy <Layers className="w-4 h-4 text-amber-400" />
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Reorder, style, hide/show, and insert prebuilt components with Wix Studio-grade visual control
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-amber-400/20 transition active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4" /> + Add Section Block
        </button>
      </div>

      {/* Sections Tree List */}
      <div className="space-y-3">
        {sections.map((sec, idx) => {
          const isExpanded = expandedSectionId === sec.id;

          return (
            <div
              key={sec.id}
              className={`bg-[#131316] border rounded-2xl transition shadow-sm overflow-hidden ${
                sec.isVisible
                  ? isExpanded
                    ? 'border-amber-400/60 ring-1 ring-amber-400/20'
                    : 'border-zinc-800 hover:border-zinc-700'
                  : 'border-zinc-900 opacity-60 bg-[#0c0c0e]'
              }`}
            >
              {/* Card Header Row */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#16161a]">
                <div
                  onClick={() => setExpandedSectionId(isExpanded ? null : sec.id)}
                  className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                >
                  <span className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-400 font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{sec.name}</h4>
                      <span className="text-[9px] bg-zinc-800 text-zinc-400 font-mono px-2 py-0.5 rounded-full shrink-0">
                        {sec.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Controls */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(sec.id)}
                    className={`p-1.5 rounded-lg transition ${
                      sec.isVisible
                        ? 'text-emerald-400 hover:bg-emerald-950/40'
                        : 'text-zinc-500 hover:bg-zinc-800'
                    }`}
                    title={sec.isVisible ? 'Visible on Canvas' : 'Hidden on Canvas'}
                  >
                    {sec.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-zinc-800 transition"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === sections.length - 1}
                    className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-zinc-800 transition"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDuplicate(sec)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
                    title="Duplicate Section"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(sec.id)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition"
                    title="Delete Section"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedSectionId(isExpanded ? null : sec.id)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Style Inspector & Deep Jump */}
              {isExpanded && (
                <div className="p-5 border-t border-zinc-800/80 bg-[#111114] space-y-4 animate-in fade-in duration-150">
                  <StyleInspectorPanel
                    title={sec.name}
                    styleConfig={sec.styleConfig}
                    onChange={(newStyle) => handleStyleChange(sec.id, newStyle)}
                  />

                  {/* Direct Content Editor Link */}
                  {['hero', 'aPropos', 'expertises', 'references', 'actualites', 'nousRejoindre', 'contact'].includes(sec.id) && (
                    <div className="flex items-center justify-between bg-[#17171b] p-3.5 rounded-xl border border-zinc-800 text-xs">
                      <span className="text-zinc-300">
                        Edit field contents (text, images, links) for this section
                      </span>
                      <button
                        type="button"
                        onClick={() => onNavigateTab(sec.id)}
                        className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-3 py-1.5 rounded-lg transition shadow-sm"
                      >
                        Open Content Editor →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Section Modal */}
      <AddSectionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSelect={handleAddTemplate}
      />
    </div>
  );
};
