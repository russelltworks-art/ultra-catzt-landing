import React from 'react';
import { CMSContentSchema } from '../cmsContentStore';
import { RichTextHelper } from '../components/RichTextHelper';
import { PageSEOCard } from '../components/PageSEOCard';
import { VisualImageSlot } from '../components/VisualImageSlot';
import { Users } from 'lucide-react';

interface NousRejoindreEditorProps {
  formData: CMSContentSchema;
  onChange: (field: keyof CMSContentSchema['nousRejoindre'], value: any) => void;
  onSEOChange: (seo: CMSContentSchema['pagesSEO']['nousRejoindre']) => void;
}

export const NousRejoindreEditor: React.FC<NousRejoindreEditorProps> = ({
  formData,
  onChange,
  onSEOChange,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Page Name & SEO Header Card */}
      <PageSEOCard
        sectionTitle="Nous Rejoindre (Careers)"
        seoData={formData.pagesSEO.nousRejoindre}
        onChange={onSEOChange}
      />

      <div className="border-b border-gray-800 pb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          Nous Rejoindre (Careers & Collective) <Users className="w-4 h-4 text-amber-400" />
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Edit recruitment headlines, agency team collective size, and talent invitations.
        </p>
      </div>

      <div className="space-y-4">
        {/* Main Headline */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Recruitment Headline Statement
          </label>
          <RichTextHelper
            value={formData.nousRejoindre.headline}
            onChange={(val) => onChange('headline', val)}
          />
          <textarea
            rows={2}
            value={formData.nousRejoindre.headline}
            onChange={(e) => onChange('headline', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Sub-headline */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Collective Value Pitch (Sub-headline)
          </label>
          <input
            type="text"
            value={formData.nousRejoindre.subheadline}
            onChange={(e) => onChange('subheadline', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Team Collective Count (e.g. 50+)
          </label>
          <input
            type="text"
            value={formData.nousRejoindre.teamSize}
            onChange={(e) => onChange('teamSize', e.target.value)}
            className="w-full max-w-xs bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-amber-300 font-bold focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Recruitment Banner Image Slot */}
        <VisualImageSlot
          label="Careers Header Banner / Team Culture Photo"
          description="High-resolution banner highlighting team atmosphere"
          imageUrl={formData.nousRejoindre.bannerImageUrl}
          onChange={(url) => onChange('bannerImageUrl', url)}
          aspectRatio="video"
        />
      </div>
    </div>
  );
};
