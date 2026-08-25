import React, { useState } from 'react';
import { CMSContentSchema } from '../cmsContentStore';
import { RichTextHelper } from '../components/RichTextHelper';
import { PageSEOCard } from '../components/PageSEOCard';
import { VisualImageSlot } from '../components/VisualImageSlot';
import { ItemOrderControls } from '../components/ItemOrderControls';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Plus } from 'lucide-react';

interface AProposEditorProps {
  formData: CMSContentSchema;
  onChange: (field: keyof CMSContentSchema['aPropos'], value: any) => void;
  onSEOChange: (seo: CMSContentSchema['pagesSEO']['aPropos']) => void;
}

export const AProposEditor: React.FC<AProposEditorProps> = ({
  formData,
  onChange,
  onSEOChange,
}) => {
  const [activeMediaTarget, setActiveMediaTarget] = useState<number | null>(null);

  // Stats Controls
  const handleStatChange = (index: number, key: 'value' | 'label', val: string) => {
    const updated = [...formData.aPropos.stats];
    updated[index] = { ...updated[index], [key]: val };
    onChange('stats', updated);
  };

  const handleAddStat = () => {
    const updated = [
      ...formData.aPropos.stats,
      { id: `stat-${Date.now()}`, value: '100+', label: 'New Metric Label' },
    ];
    onChange('stats', updated);
  };

  const handleMoveStat = (fromIndex: number, toIndex: number) => {
    const updated = [...formData.aPropos.stats];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange('stats', updated);
  };

  const handleDeleteStat = (index: number) => {
    const updated = formData.aPropos.stats.filter((_, i) => i !== index);
    onChange('stats', updated);
  };

  // Certifications Controls
  const handleCertChange = (index: number, key: string, val: string) => {
    const updated = [...formData.aPropos.certifications];
    updated[index] = { ...updated[index], [key]: val };
    onChange('certifications', updated);
  };

  const handleAddCert = () => {
    const updated = [
      ...formData.aPropos.certifications,
      {
        id: `cert-${Date.now()}`,
        title: 'New Label Certification',
        image: '/wp-content/uploads/2026/01/Label-RSE.png',
        tag: 'Quality',
      },
    ];
    onChange('certifications', updated);
  };

  const handleMoveCert = (fromIndex: number, toIndex: number) => {
    const updated = [...formData.aPropos.certifications];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange('certifications', updated);
  };

  const handleDeleteCert = (index: number) => {
    const updated = formData.aPropos.certifications.filter((_, i) => i !== index);
    onChange('certifications', updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Page Name & SEO Header Card */}
      <PageSEOCard
        sectionTitle="A Propos (About Page)"
        seoData={formData.pagesSEO.aPropos}
        onChange={onSEOChange}
      />

      <div className="border-b border-gray-800 pb-4">
        <h2 className="text-lg font-bold text-white">A Propos (About Page & Agency Manifesto)</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Edit agency vision statement, quantitative metrics counters, and trust badges.
        </p>
      </div>

      <div className="space-y-5">
        {/* Main Headline */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Manifesto Headline Statement
          </label>
          <RichTextHelper
            value={formData.aPropos.headline}
            onChange={(val) => onChange('headline', val)}
          />
          <textarea
            rows={2}
            value={formData.aPropos.headline}
            onChange={(e) => onChange('headline', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Intro Paragraph */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Introductory Paragraph
          </label>
          <RichTextHelper
            value={formData.aPropos.introParagraph}
            onChange={(val) => onChange('introParagraph', val)}
          />
          <textarea
            rows={3}
            value={formData.aPropos.introParagraph}
            onChange={(e) => onChange('introParagraph', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Featured Agency Photo Slot */}
        <VisualImageSlot
          label="A Propos Featured Agency Photo / Team Visual"
          description="Main high-impact visual representation of the Catzt collective"
          imageUrl={formData.aPropos.featuredImageUrl}
          onChange={(url) => onChange('featuredImageUrl', url)}
          aspectRatio="video"
        />

        {/* Key Metrics Stats */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Quantitative Metrics & Counters ({formData.aPropos.stats.length})
            </h3>
            <button
              type="button"
              onClick={handleAddStat}
              className="flex items-center gap-1 text-xs bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 px-2.5 py-1 rounded-lg border border-amber-400/30 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Metric
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {formData.aPropos.stats.map((stat, idx) => (
              <div
                key={stat.id || idx}
                className="bg-[#202020] p-3.5 rounded-xl border border-gray-700/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">#{idx + 1}</span>
                  <ItemOrderControls
                    index={idx}
                    total={formData.aPropos.stats.length}
                    onMoveUp={() => handleMoveStat(idx, idx - 1)}
                    onMoveDown={() => handleMoveStat(idx, idx + 1)}
                    onDelete={() => handleDeleteStat(idx)}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400">Value (e.g. 50+)</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                    className="w-full bg-[#2a2a2a] text-amber-300 font-bold px-2.5 py-1 rounded-lg text-sm border border-gray-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400">Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                    className="w-full bg-[#2a2a2a] text-gray-200 px-2.5 py-1 rounded-lg text-xs border border-gray-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Badges */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Certifications & Label Badges ({formData.aPropos.certifications.length})
            </h3>
            <button
              type="button"
              onClick={handleAddCert}
              className="flex items-center gap-1 text-xs bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 px-2.5 py-1 rounded-lg border border-amber-400/30 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Badge
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {formData.aPropos.certifications.map((cert, idx) => (
              <div
                key={cert.id || idx}
                className="bg-[#202020] p-3.5 rounded-xl border border-gray-700/80 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded">
                    {cert.tag || 'Badge'}
                  </span>
                  <ItemOrderControls
                    index={idx}
                    total={formData.aPropos.certifications.length}
                    onMoveUp={() => handleMoveCert(idx, idx - 1)}
                    onMoveDown={() => handleMoveCert(idx, idx + 1)}
                    onDelete={() => handleDeleteCert(idx)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-black/60 rounded-lg border border-gray-700 flex items-center justify-center p-1 overflow-hidden shrink-0">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveMediaTarget(idx)}
                    className="flex-1 bg-[#2a2a2a] hover:bg-[#333333] text-gray-200 text-xs px-2 py-1.5 rounded-lg border border-gray-600 truncate transition"
                  >
                    Change Badge Logo
                  </button>
                </div>

                <div>
                  <input
                    type="text"
                    value={cert.title}
                    placeholder="Badge Title"
                    onChange={(e) => handleCertChange(idx, 'title', e.target.value)}
                    className="w-full bg-[#2a2a2a] text-white px-2 py-1 rounded text-xs border border-gray-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeMediaTarget !== null && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setActiveMediaTarget(null)}
          currentUrl={formData.aPropos.certifications[activeMediaTarget]?.image}
          onSelect={(url) => {
            handleCertChange(activeMediaTarget, 'image', url);
            setActiveMediaTarget(null);
          }}
          title="Select Certification Logo Badge"
        />
      )}
    </div>
  );
};
