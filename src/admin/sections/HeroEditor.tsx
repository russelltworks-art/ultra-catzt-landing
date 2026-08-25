import React from 'react';
import { CMSContentSchema, PageSEOMetadata } from '../cmsContentStore';
import { PageSEOCard } from '../components/PageSEOCard';
import { VisualImageSlot } from '../components/VisualImageSlot';
import { Sparkles, Layout, Link as LinkIcon, Type } from 'lucide-react';

interface HeroEditorProps {
  formData: CMSContentSchema;
  onChange: (field: string, value: any) => void;
  onSEOChange: (seo: PageSEOMetadata) => void;
}

export const HeroEditor: React.FC<HeroEditorProps> = ({
  formData,
  onChange,
  onSEOChange,
}) => {
  const hero = formData.hero || {
    badgeText: '',
    subtitle: '',
    headline: '',
    description: '',
    ctaPrimaryText: '',
    ctaPrimaryUrl: '',
    ctaSecondaryText: '',
    ctaSecondaryUrl: '',
    heroLogoUrl: '',
    heroBackground3DUrl: '',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Page SEO Header Card */}
      <PageSEOCard
        seoData={
          formData.pagesSEO?.hero || {
            pageName: 'Homepage & Hero',
            metaTitle: 'Catzt Office — Systemic Control',
            metaDescription:
              'Catzt Office est le premier hub unifié de gestion de réputation et de communication stratégique.',
            slug: '/',
            ogImage: '/images/Catzt-logo.png',
          }
        }
        onChange={onSEOChange}
        sectionTitle="Homepage & 3D Hero Portal"
      />

      {/* 2. Visual Media Assets (Logos & Wallpapers) */}
      <div className="bg-[#131316] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
          <Layout className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Brand Visual Assets & Media Dropzones
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <VisualImageSlot
            label="Brand Official Logo / Icon"
            description="High-resolution PNG/SVG logo used in header & 3D hero portal"
            imageUrl={hero.heroLogoUrl || '/images/Catzt-logo.png'}
            onChange={(url) => onChange('heroLogoUrl', url)}
            aspectRatio="square"
          />

          <VisualImageSlot
            label="Hero 3D Wallpaper / Background Asset"
            description="Atmospheric backdrop visual for 3D kinetic portal"
            imageUrl={hero.heroBackground3DUrl || '/wp-content/themes/omnicom/assets/images/home-hero.png'}
            onChange={(url) => onChange('heroBackground3DUrl', url)}
            aspectRatio="video"
          />
        </div>
      </div>

      {/* 3. Typography & Headlines */}
      <div className="bg-[#131316] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
          <Type className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Headline & Narrative Typography
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Subtitle / Top Pill Badge
          </label>
          <input
            type="text"
            value={hero.subtitle}
            onChange={(e) => onChange('subtitle', e.target.value)}
            className="w-full bg-[#19191d] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
            placeholder="e.g. Systemic Control"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Main Portal Headline
          </label>
          <textarea
            rows={2}
            value={hero.headline}
            onChange={(e) => onChange('headline', e.target.value)}
            className="w-full bg-[#19191d] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium leading-relaxed"
            placeholder="e.g. an office for online sellers..."
          />
        </div>
      </div>

      {/* 4. CTA Buttons */}
      <div className="bg-[#131316] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
          <LinkIcon className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Call To Action (CTA) Buttons
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 bg-[#18181c] p-4 rounded-xl border border-zinc-800">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Primary Action Button
            </span>
            <div>
              <label className="block text-[11px] text-zinc-400 mb-1">Button Label</label>
              <input
                type="text"
                value={hero.ctaPrimaryText}
                onChange={(e) => onChange('ctaPrimaryText', e.target.value)}
                className="w-full bg-[#121215] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                placeholder="A propos"
              />
            </div>
            <div>
              <label className="block text-[11px] text-zinc-400 mb-1">Target Route URL</label>
              <input
                type="text"
                value={hero.ctaPrimaryUrl}
                onChange={(e) => onChange('ctaPrimaryUrl', e.target.value)}
                className="w-full bg-[#121215] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-300 font-mono"
                placeholder="/a-propos/"
              />
            </div>
          </div>

          <div className="space-y-3 bg-[#18181c] p-4 rounded-xl border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
              Secondary Action Button
            </span>
            <div>
              <label className="block text-[11px] text-zinc-400 mb-1">Button Label</label>
              <input
                type="text"
                value={hero.ctaSecondaryText}
                onChange={(e) => onChange('ctaSecondaryText', e.target.value)}
                className="w-full bg-[#121215] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                placeholder="Contact"
              />
            </div>
            <div>
              <label className="block text-[11px] text-zinc-400 mb-1">Target Route URL</label>
              <input
                type="text"
                value={hero.ctaSecondaryUrl}
                onChange={(e) => onChange('ctaSecondaryUrl', e.target.value)}
                className="w-full bg-[#121215] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-300 font-mono"
                placeholder="/contact/"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
