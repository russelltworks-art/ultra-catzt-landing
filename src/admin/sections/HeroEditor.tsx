import React, { useState } from 'react';
import { CMSContentSchema, PageSEOMetadata } from '../admin/cmsContentStore';
import { PageSEOCard } from '../components/PageSEOCard';
import { VisualImageSlot } from '../components/VisualImageSlot';
import { MediaPickerModal } from '../components/MediaPickerModal';
import {
  Sparkles,
  Layout,
  Link as LinkIcon,
  Type,
  Layers,
  Image as ImageIcon,
  FolderOpen,
  Upload,
  RotateCcw,
  Film,
} from 'lucide-react';

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
    kineticSlideImages: [],
  };

  const defaultSlideImages = [
    '/wp-content/themes/omnicom/assets/images/picture-full/image9.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image10.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image11.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image12.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image13.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image14.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image15.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image16.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image17.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image18.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image19.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image20.jpg',
    '/wp-content/themes/omnicom/assets/images/picture-full/image21.jpg',
  ];

  const slideImages =
    hero.kineticSlideImages && hero.kineticSlideImages.length === 13
      ? hero.kineticSlideImages
      : defaultSlideImages;

  const [activeMediaPickerIdx, setActiveMediaPickerIdx] = useState<number | null>(null);
  const [phaseFilter, setPhaseFilter] = useState<'all' | 'phase1' | 'phase2'>('all');

  const handleUpdateSlide = (index: number, newUrl: string) => {
    const updated = [...slideImages];
    updated[index] = newUrl;
    onChange('kineticSlideImages', updated);
  };

  const handleResetSlides = () => {
    if (
      window.confirm(
        'Reset all 13 3D floating kinetic cards (Phase 1 DNA + Phase 2 Graft) to default photography assets?'
      )
    ) {
      onChange('kineticSlideImages', defaultSlideImages);
    }
  };

  const filteredCards = slideImages
    .map((imgUrl, idx) => ({
      imgUrl,
      idx,
      phase: idx < 8 ? 'Phase 1: Spiral DNA Helix' : 'Phase 2: Graft Expansion Climax',
      phaseId: idx < 8 ? 'phase1' : 'phase2',
    }))
    .filter((item) => {
      if (phaseFilter === 'phase1') return item.phaseId === 'phase1';
      if (phaseFilter === 'phase2') return item.phaseId === 'phase2';
      return true;
    });

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

      {/* 2. 3D FLOATING KINETIC CARDS (ALL 13 PARTICLES ACROSS FULL ANIMATION TIMELINE) */}
      <div className="bg-[#131316] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                All 13 3D Floating Kinetic Cards (Full Animation Timeline)
                <span className="text-[10px] bg-amber-400/15 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-400/30">
                  13 Total 3D Cards
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Replace every floating particle card shown from the start of the 3D vortex to the final animation climax
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {/* Phase Filters */}
            <div className="flex items-center bg-[#1a1a1e] p-0.5 rounded-lg border border-zinc-800 text-[10px]">
              <button
                type="button"
                onClick={() => setPhaseFilter('all')}
                className={`px-2 py-1 rounded font-semibold transition ${
                  phaseFilter === 'all' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400'
                }`}
              >
                All 13 Cards
              </button>
              <button
                type="button"
                onClick={() => setPhaseFilter('phase1')}
                className={`px-2 py-1 rounded font-semibold transition ${
                  phaseFilter === 'phase1' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400'
                }`}
              >
                Phase 1 (1–8)
              </button>
              <button
                type="button"
                onClick={() => setPhaseFilter('phase2')}
                className={`px-2 py-1 rounded font-semibold transition ${
                  phaseFilter === 'phase2' ? 'bg-amber-400 text-black font-bold' : 'text-zinc-400'
                }`}
              >
                Phase 2 Climax (9–13)
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetSlides}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-red-400 transition"
              title="Reset all 13 cards to defaults"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        {/* 3D Cards Grid (All 13 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredCards.map(({ imgUrl, idx, phase }) => (
            <div
              key={idx}
              className="bg-[#18181c] p-3 rounded-2xl border border-zinc-800 hover:border-amber-400/60 transition group space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span className="font-bold text-amber-400">Card #{idx + 1}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                    idx < 8
                      ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                      : 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                  }`}
                >
                  {idx < 8 ? 'DNA Helix' : 'Graft Climax'}
                </span>
              </div>

              {/* Card Image Preview */}
              <div className="relative w-full h-24 bg-black rounded-xl overflow-hidden flex items-center justify-center border border-zinc-700/60 group-hover:border-amber-400/40 transition">
                <img
                  src={imgUrl}
                  alt={`3D Slide ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center backdrop-blur-[1px]">
                  <button
                    type="button"
                    onClick={() => setActiveMediaPickerIdx(idx)}
                    className="bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-bold px-2.5 py-1 rounded-lg shadow transition"
                  >
                    Change Image
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setActiveMediaPickerIdx(idx)}
                className="w-full flex items-center justify-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] py-1.5 rounded-lg font-semibold transition"
              >
                <FolderOpen className="w-3 h-3 text-amber-400" /> Replace Card #{idx + 1}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Visual Media Assets (Brand Logo & Main Wallpaper) */}
      <div className="bg-[#131316] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
          <Layout className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Brand Official Logo & Hero Wallpaper
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

      {/* 4. Typography & Headlines */}
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

      {/* 5. CTA Buttons */}
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

      {/* Media Picker Modal for Floating 3D Cards */}
      {activeMediaPickerIdx !== null && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setActiveMediaPickerIdx(null)}
          currentUrl={slideImages[activeMediaPickerIdx]}
          onSelect={(url) => {
            handleUpdateSlide(activeMediaPickerIdx, url);
            setActiveMediaPickerIdx(null);
          }}
          title={`Select Custom Image for 3D Floating Card #${activeMediaPickerIdx + 1} (${
            activeMediaPickerIdx < 8 ? 'Phase 1: DNA Helix' : 'Phase 2: Graft Climax'
          })`}
        />
      )}
    </div>
  );
};
