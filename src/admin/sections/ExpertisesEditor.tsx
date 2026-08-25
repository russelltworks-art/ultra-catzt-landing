import React, { useState } from 'react';
import { CMSContentSchema } from '../cmsContentStore';
import { RichTextHelper } from '../components/RichTextHelper';
import { PageSEOCard } from '../components/PageSEOCard';
import { ItemOrderControls } from '../components/ItemOrderControls';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Plus } from 'lucide-react';

interface ExpertisesEditorProps {
  formData: CMSContentSchema;
  onChange: (field: keyof CMSContentSchema['expertises'], value: any) => void;
  onSEOChange: (seo: CMSContentSchema['pagesSEO']['expertises']) => void;
}

export const ExpertisesEditor: React.FC<ExpertisesEditorProps> = ({
  formData,
  onChange,
  onSEOChange,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  const handleItemChange = (index: number, key: string, val: string) => {
    const updated = [...formData.expertises.items];
    updated[index] = { ...updated[index], [key]: val };
    onChange('items', updated);
  };

  const handleAddItem = () => {
    const nextIdx = formData.expertises.items.length + 1;
    const updated = [
      ...formData.expertises.items,
      {
        id: `exp-${Date.now()}`,
        slug: `nouvelle-expertise-${nextIdx}`,
        title: `Nouvelle Expertise ${nextIdx}`,
        shortDesc: 'Description de la pratique et méthodologie conseil...',
        image: '/wp-content/uploads/2025/07/image6.jpg',
      },
    ];
    onChange('items', updated);
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    const updated = [...formData.expertises.items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange('items', updated);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Delete this expertise practice?')) {
      const updated = formData.expertises.items.filter((_, i) => i !== index);
      onChange('items', updated);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Page Name & SEO Header Card */}
      <PageSEOCard
        sectionTitle="8 Core Expertises"
        seoData={formData.pagesSEO.expertises}
        onChange={onSEOChange}
      />

      <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">8 Core Expertises (Practices)</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage all service practices, deep dive descriptions, and practice imagery.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1.5 text-xs bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 px-3 py-1.5 rounded-lg border border-amber-400/30 font-medium transition"
        >
          <Plus className="w-4 h-4" /> Add Practice
        </button>
      </div>

      <div className="space-y-4">
        {/* Section Headline */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Section Main Headline
          </label>
          <RichTextHelper
            value={formData.expertises.mainTitle}
            onChange={(val) => onChange('mainTitle', val)}
          />
          <input
            type="text"
            value={formData.expertises.mainTitle}
            onChange={(e) => onChange('mainTitle', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.expertises.items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-[#181818] p-4 rounded-xl border border-gray-800 space-y-3 hover:border-gray-700 transition"
            >
              {/* Header with order control */}
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold flex items-center justify-center border border-amber-400/30">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">/{item.slug}/</span>
                </div>
                <ItemOrderControls
                  index={idx}
                  total={formData.expertises.items.length}
                  onMoveUp={() => handleMove(idx, idx - 1)}
                  onMoveDown={() => handleMove(idx, idx + 1)}
                  onDelete={() => handleDelete(idx)}
                />
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 block mb-0.5">Practice Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(idx, 'title', e.target.value)}
                    className="w-full bg-[#242424] text-white font-medium px-2.5 py-1.5 rounded-lg text-xs border border-gray-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 block mb-0.5">URL Slug</label>
                  <input
                    type="text"
                    value={item.slug}
                    onChange={(e) => handleItemChange(idx, 'slug', e.target.value)}
                    className="w-full bg-[#242424] text-gray-300 font-mono px-2.5 py-1.5 rounded-lg text-xs border border-gray-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="text-[10px] text-gray-400 block mb-0.5">Summary / Pitch</label>
                <textarea
                  rows={2}
                  value={item.shortDesc}
                  onChange={(e) => handleItemChange(idx, 'shortDesc', e.target.value)}
                  className="w-full bg-[#242424] text-gray-200 text-xs px-2.5 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Feature Image */}
              <div className="flex items-center gap-2 pt-1">
                <div className="w-10 h-10 bg-black/60 rounded-lg border border-gray-700 flex items-center justify-center p-1 overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 truncate">{item.image}</p>
                  <button
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-medium underline"
                  >
                    Change Practice Image
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeImageIdx !== null && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setActiveImageIdx(null)}
          currentUrl={formData.expertises.items[activeImageIdx]?.image}
          onSelect={(url) => {
            handleItemChange(activeImageIdx, 'image', url);
            setActiveImageIdx(null);
          }}
          title="Select Expertise Practice Image"
        />
      )}
    </div>
  );
};
