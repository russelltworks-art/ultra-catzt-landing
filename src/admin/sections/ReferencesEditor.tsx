import React, { useState } from 'react';
import { CMSContentSchema } from '../cmsContentStore';
import { RichTextHelper } from '../components/RichTextHelper';
import { PageSEOCard } from '../components/PageSEOCard';
import { ItemOrderControls } from '../components/ItemOrderControls';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Plus, Award } from 'lucide-react';

interface ReferencesEditorProps {
  formData: CMSContentSchema;
  onChange: (field: keyof CMSContentSchema['references'], value: any) => void;
  onSEOChange: (seo: CMSContentSchema['pagesSEO']['references']) => void;
}

export const ReferencesEditor: React.FC<ReferencesEditorProps> = ({
  formData,
  onChange,
  onSEOChange,
}) => {
  const [activeClientIdx, setActiveClientIdx] = useState<number | null>(null);

  const handleClientChange = (index: number, key: string, val: string) => {
    const updated = [...formData.references.featuredClients];
    updated[index] = { ...updated[index], [key]: val };
    onChange('featuredClients', updated);
  };

  const handleAddClient = () => {
    const updated = [
      ...formData.references.featuredClients,
      {
        id: `cli-${Date.now()}`,
        name: 'New Partner Client',
        logoUrl: '/wp-content/uploads/2025/11/Intel-omnicom-logo-client.svg',
      },
    ];
    onChange('featuredClients', updated);
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    const updated = [...formData.references.featuredClients];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange('featuredClients', updated);
  };

  const handleDelete = (index: number) => {
    const updated = formData.references.featuredClients.filter((_, i) => i !== index);
    onChange('featuredClients', updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Page Name & SEO Header Card */}
      <PageSEOCard
        sectionTitle="Références & Clients"
        seoData={formData.pagesSEO.references}
        onChange={onSEOChange}
      />

      <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Références & Clients <Award className="w-4 h-4 text-amber-400" />
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage client testimonials, brand trust showcase logos, and partnership credentials.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddClient}
          className="flex items-center gap-1.5 text-xs bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 px-3 py-1.5 rounded-lg border border-amber-400/30 font-medium transition"
        >
          <Plus className="w-4 h-4" /> Add Client Logo
        </button>
      </div>

      <div className="space-y-4">
        {/* Main Headline */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            References Headline Statement
          </label>
          <RichTextHelper
            value={formData.references.mainTitle}
            onChange={(val) => onChange('mainTitle', val)}
          />
          <textarea
            rows={2}
            value={formData.references.mainTitle}
            onChange={(e) => onChange('mainTitle', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Client Count Subtitle */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Client Counter Badge Headline
          </label>
          <input
            type="text"
            value={formData.references.clientCountHeadline}
            onChange={(e) => onChange('clientCountHeadline', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Featured Clients Grid */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-gray-800 space-y-3">
          <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
            Featured Client Brands ({formData.references.featuredClients.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {formData.references.featuredClients.map((client, idx) => (
              <div
                key={client.id || idx}
                className="bg-[#202020] p-3.5 rounded-xl border border-gray-700/80 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-bold">#{idx + 1}</span>
                  <ItemOrderControls
                    index={idx}
                    total={formData.references.featuredClients.length}
                    onMoveUp={() => handleMove(idx, idx - 1)}
                    onMoveDown={() => handleMove(idx, idx + 1)}
                    onDelete={() => handleDelete(idx)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-12 h-10 bg-black/60 rounded-lg border border-gray-700 flex items-center justify-center p-1.5 overflow-hidden shrink-0">
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain filter invert opacity-90"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveClientIdx(idx)}
                    className="flex-1 bg-[#2a2a2a] hover:bg-[#333333] text-gray-200 text-[11px] px-2 py-1.5 rounded-lg border border-gray-600 truncate transition text-center"
                  >
                    Change Logo
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 block mb-0.5">Brand / Client Name</label>
                  <input
                    type="text"
                    value={client.name}
                    onChange={(e) => handleClientChange(idx, 'name', e.target.value)}
                    className="w-full bg-[#2a2a2a] text-white px-2 py-1 rounded text-xs border border-gray-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeClientIdx !== null && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setActiveClientIdx(null)}
          currentUrl={formData.references.featuredClients[activeClientIdx]?.logoUrl}
          onSelect={(url) => {
            handleClientChange(activeClientIdx, 'logoUrl', url);
            setActiveClientIdx(null);
          }}
          title="Select Partner Client Logo"
        />
      )}
    </div>
  );
};
