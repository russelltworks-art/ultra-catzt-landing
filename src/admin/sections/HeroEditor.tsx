import React from 'react';
import { CMSContentSchema } from '../cmsContentStore';
import { RichTextHelper } from '../components/RichTextHelper';
import { PageSEOCard } from '../components/PageSEOCard';
import { VisualImageSlot } from '../components/VisualImageSlot';
import { Sparkles } from 'lucide-react';

interface HeroEditorProps {
  formData: CMSContentSchema;
  onChange: (field: keyof CMSContentSchema['hero'], value: any) => void;
  onSEOChange: (seo: CMSContentSchema['pagesSEO']['hero']) => void;
}

export const HeroEditor: React.FC<HeroEditorProps> = ({
  formData,
  onChange,
  onSEOChange,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Page Name & SEO Header Card */}
      <PageSEOCard
        sectionTitle="Homepage & 3D Hero Portal"
        seoData={formData.pagesSEO.hero}
        onChange={onSEOChange}
      />

      <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Homepage & 3D Hero Portal <Sparkles className="w-4 h-4 text-amber-400" />
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Configure the central 3D kinetic portal headline, agency subtitle, brand logo, and CTAs.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Subtitle / Eyebrow */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Eyebrow Badge / Subtitle
          </label>
          <input
            type="text"
            value={formData.hero.subtitle}
            onChange={(e) => onChange('subtitle', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        {/* Main Headline */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Main Portal Headline
          </label>
          <RichTextHelper
            value={formData.hero.headline}
            onChange={(val) => onChange('headline', val)}
          />
          <textarea
            rows={3}
            value={formData.hero.headline}
            onChange={(e) => onChange('headline', e.target.value)}
            className="w-full bg-[#1c1c1c] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition font-mono leading-relaxed"
          />
        </div>

        {/* Visual Slots: Brand Logo & Wallpaper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VisualImageSlot
            label="Brand Official Logo / Icon"
            description="High-contrast PNG or SVG logo for top header and watermark"
            imageUrl={formData.hero.brandWatermarkUrl || formData.hero.backgroundMediaUrl}
            onChange={(url) => {
              onChange('brandWatermarkUrl', url);
              onChange('backgroundMediaUrl', url);
            }}
            aspectRatio="square"
          />

          <VisualImageSlot
            label="Hero 3D Wallpaper / Background Asset"
            description="High-resolution backdrop graphics for 3D kinetic scene"
            imageUrl={formData.hero.backgroundMediaUrl}
            onChange={(url) => onChange('backgroundMediaUrl', url)}
            aspectRatio="video"
          />
        </div>

        {/* CTA Primary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#181818] p-4 rounded-xl border border-gray-800">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Primary CTA Button Label
            </label>
            <input
              type="text"
              value={formData.hero.ctaPrimaryText}
              onChange={(e) => onChange('ctaPrimaryText', e.target.value)}
              className="w-full bg-[#242424] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Primary CTA Target URL
            </label>
            <input
              type="text"
              value={formData.hero.ctaPrimaryLink}
              onChange={(e) => onChange('ctaPrimaryLink', e.target.value)}
              className="w-full bg-[#242424] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* CTA Secondary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#181818] p-4 rounded-xl border border-gray-800">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Secondary CTA Button Label
            </label>
            <input
              type="text"
              value={formData.hero.ctaSecondaryText}
              onChange={(e) => onChange('ctaSecondaryText', e.target.value)}
              className="w-full bg-[#242424] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Secondary CTA Target URL
            </label>
            <input
              type="text"
              value={formData.hero.ctaSecondaryLink}
              onChange={(e) => onChange('ctaSecondaryLink', e.target.value)}
              className="w-full bg-[#242424] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
