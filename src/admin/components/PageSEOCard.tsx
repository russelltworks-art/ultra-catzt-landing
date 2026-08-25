import React, { useState } from 'react';
import { PageSEOMetadata } from '../cmsContentStore';
import { Globe, ChevronDown, ChevronUp, Image as ImageIcon, Sparkles } from 'lucide-react';
import { MediaPickerModal } from './MediaPickerModal';

interface PageSEOCardProps {
  seoData: PageSEOMetadata;
  onChange: (updated: PageSEOMetadata) => void;
  sectionTitle: string;
}

export const PageSEOCard: React.FC<PageSEOCardProps> = ({
  seoData,
  onChange,
  sectionTitle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  const handleChange = (field: keyof PageSEOMetadata, value: string) => {
    onChange({
      ...seoData,
      [field]: value,
    });
  };

  return (
    <div className="bg-[#181818] border border-gray-800 rounded-2xl overflow-hidden transition mb-6 shadow-sm">
      {/* Collapsible Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-5 py-3.5 bg-[#1e1e1e] flex items-center justify-between cursor-pointer hover:bg-[#232323] transition select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Page Identity & SEO Settings
              </span>
              <span className="text-[10px] bg-gray-800 text-gray-300 font-mono px-2 py-0.5 rounded">
                {seoData.slug || '/'}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 truncate max-w-md">
              {seoData.metaTitle || `${sectionTitle} — Catzt Office`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-amber-400 font-medium">
            {isExpanded ? 'Hide SEO Details' : 'Edit Page Name & SEO'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Expanded Fields */}
      {isExpanded && (
        <div className="p-5 space-y-4 border-t border-gray-800 bg-[#161616] animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Page Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Internal Page Name (Navigation Label)
              </label>
              <input
                type="text"
                value={seoData.pageName}
                onChange={(e) => handleChange('pageName', e.target.value)}
                className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                placeholder="e.g. A Propos"
              />
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Page URL Route Slug
              </label>
              <input
                type="text"
                value={seoData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-amber-400"
                placeholder="/a-propos/"
              />
            </div>
          </div>

          {/* Browser Tab Meta Title */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-300">
                SEO Browser Tab Title (`&lt;title&gt;`)
              </label>
              <span className="text-[10px] text-gray-500 font-mono">
                {seoData.metaTitle.length} chars (Recommended: 50-60)
              </span>
            </div>
            <input
              type="text"
              value={seoData.metaTitle}
              onChange={(e) => handleChange('metaTitle', e.target.value)}
              className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              placeholder="e.g. A Propos — Catzt Office"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-300">
                SEO Meta Description (`&lt;meta name="description"&gt;`)
              </label>
              <span className="text-[10px] text-gray-500 font-mono">
                {seoData.metaDescription.length} chars (Recommended: 120-160)
              </span>
            </div>
            <textarea
              rows={2}
              value={seoData.metaDescription}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
              className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              placeholder="Provide a concise description for search engines..."
            />
          </div>

          {/* Social Share / OG Image */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Social Sharing & Open Graph Preview Image
            </label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-10 bg-black/60 rounded-lg border border-gray-700 flex items-center justify-center p-1 overflow-hidden shrink-0">
                {seoData.ogImage ? (
                  <img
                    src={seoData.ogImage}
                    alt="OG Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <input
                type="text"
                value={seoData.ogImage}
                onChange={(e) => handleChange('ogImage', e.target.value)}
                className="flex-1 bg-[#202020] border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-amber-400 font-mono"
                placeholder="/images/Catzt-logo.png"
              />
              <button
                type="button"
                onClick={() => setIsMediaOpen(true)}
                className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs px-3 py-1.5 rounded-lg font-medium transition shrink-0"
              >
                Choose Image
              </button>
            </div>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        currentUrl={seoData.ogImage}
        onSelect={(url) => {
          handleChange('ogImage', url);
          setIsMediaOpen(false);
        }}
        title={`Select Social Share Image for ${seoData.pageName || sectionTitle}`}
      />
    </div>
  );
};
