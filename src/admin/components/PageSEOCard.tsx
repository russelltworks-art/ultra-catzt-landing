import React, { useState } from 'react';
import { PageSEOMetadata } from '../cmsContentStore';
import { Globe, ChevronDown, ChevronUp, Image as ImageIcon, Share2, Sparkles } from 'lucide-react';
import { MediaPickerModal } from './MediaPickerModal';
import { SEOScoreIndicator } from './SEOScoreIndicator';
import { SEOSocialPreviewModal } from './SEOSocialPreviewModal';

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
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleChange = (field: keyof PageSEOMetadata, value: any) => {
    onChange({
      ...seoData,
      [field]: value,
    });
  };

  return (
    <div className="bg-[#181818] border border-gray-800 rounded-2xl overflow-hidden transition mb-6 shadow-sm">
      {/* Collapsible Header */}
      <div className="px-5 py-3.5 bg-[#1e1e1e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 select-none">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Page Identity & SEO Suite
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

        {/* Action controls */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={() => setIsPreviewModalOpen(true)}
            className="flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs px-3 py-1.5 rounded-lg font-medium transition"
          >
            <Share2 className="w-3.5 h-3.5" /> SERP & Social Preview
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* SEO Health Score Pill Bar */}
      <div className="px-5 py-3 bg-[#161616] border-b border-gray-800/80">
        <SEOScoreIndicator seo={seoData} />
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
                {seoData.metaTitle?.length || 0} chars (Optimal: 45-60)
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
                {seoData.metaDescription?.length || 0} chars (Optimal: 120-160)
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

          {/* Focus Keyword & Canonical URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Focus Target Keyword
              </label>
              <input
                type="text"
                value={seoData.focusKeyword || ''}
                onChange={(e) => handleChange('focusKeyword', e.target.value)}
                className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                placeholder="e.g. Systemic Control"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Canonical URL Tag
              </label>
              <input
                type="text"
                value={seoData.canonicalUrl || ''}
                onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-amber-400"
                placeholder="https://catzt.com/a-propos/"
              />
            </div>
          </div>

          {/* Social Share / OG Image */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Social Sharing & Open Graph Preview Image (`og:image`)
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

      {/* Media Picker Modal */}
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

      {/* Live SERP & Social Preview Modal */}
      <SEOSocialPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        seo={seoData}
        siteName="Catzt Office"
      />
    </div>
  );
};
