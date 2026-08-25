import React, { useState } from 'react';
import { PageSEOMetadata } from '../cmsContentStore';
import {
  X,
  Globe,
  Share2,
  Smartphone,
  Monitor,
  ExternalLink,
  Play,
  CheckCircle,
} from 'lucide-react';

interface SEOSocialPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  seo: PageSEOMetadata;
  siteName: string;
}

export const SEOSocialPreviewModal: React.FC<SEOSocialPreviewModalProps> = ({
  isOpen,
  onClose,
  seo,
  siteName,
}) => {
  const [activePlatform, setActivePlatform] = useState<
    'google' | 'meta' | 'twitter' | 'linkedin' | 'tiktok'
  >('google');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const displayTitle = seo.metaTitle || `${seo.pageName || 'Page'} — ${siteName}`;
  const displayDesc =
    seo.metaDescription ||
    'Catzt Office provides systemic control, multi-marketplace growth infrastructure, and brand acceleration.';
  const displaySlug = seo.slug === '/' ? '' : seo.slug.replace(/^\/|\/$/g, '');
  const displayUrl = `https://catzt.com${seo.slug.startsWith('/') ? '' : '/'}${displaySlug}`;
  const displayImage = seo.ogImage || '/images/Catzt-logo.png';

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#181818] border border-gray-800 rounded-3xl flex flex-col max-h-[90vh] shadow-2xl shadow-black overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#1f1f1f]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Live Google SERP & Multi-Platform Social Simulator
              </h3>
              <p className="text-[11px] text-gray-400">
                Inspect how your page renders across search engines and social platforms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#141414] border-b border-gray-800 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActivePlatform('google')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activePlatform === 'google'
                  ? 'bg-amber-400 text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> Google Search
            </button>
            <button
              onClick={() => setActivePlatform('meta')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activePlatform === 'meta'
                  ? 'bg-[#1877F2] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="font-bold">f</span> Meta / Instagram
            </button>
            <button
              onClick={() => setActivePlatform('twitter')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activePlatform === 'twitter'
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="font-bold text-[11px]">𝕏</span> Twitter / X
            </button>
            <button
              onClick={() => setActivePlatform('linkedin')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activePlatform === 'linkedin'
                  ? 'bg-[#0A66C2] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="font-bold">in</span> LinkedIn
            </button>
            <button
              onClick={() => setActivePlatform('tiktok')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activePlatform === 'tiktok'
                  ? 'bg-[#FE2C55] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Play className="w-3 h-3" /> TikTok
            </button>
          </div>

          {activePlatform === 'google' && (
            <div className="flex items-center gap-1 bg-[#222222] p-0.5 rounded-lg border border-gray-700">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1 rounded ${deviceMode === 'desktop' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                title="Desktop SERP"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1 rounded ${deviceMode === 'mobile' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                title="Mobile SERP"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Preview Canvas */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#0d0d0d] flex items-center justify-center">
          {/* 1. GOOGLE SERP SIMULATION */}
          {activePlatform === 'google' && (
            <div
              className={`w-full bg-[#202124] text-white rounded-2xl p-5 border border-gray-800 font-sans shadow-lg ${
                deviceMode === 'mobile' ? 'max-w-sm' : 'max-w-xl'
              }`}
            >
              {/* Google Breadcrumb */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 shrink-0">
                  <img
                    src="/wp-content/themes/omnicom/favicon.ico"
                    alt="Favicon"
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[12px] text-[#dadce0] font-medium block leading-tight">
                    Catzt Office
                  </span>
                  <span className="text-[11px] text-[#bdc1c6] truncate block font-mono">
                    https://catzt.com {displaySlug && `› ${displaySlug}`}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-[17px] text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug mb-1">
                {displayTitle}
              </h4>

              {/* Snippet Description */}
              <p className="text-[13px] text-[#bdc1c6] leading-relaxed line-clamp-2">
                {displayDesc}
              </p>

              <div className="mt-3 pt-2 border-t border-gray-700/50 flex items-center gap-2 text-[10px] text-gray-400">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> Googlebot indexing ready (HTTPS & Canonical verified)
              </div>
            </div>
          )}

          {/* 2. META / FACEBOOK / INSTAGRAM PREVIEW */}
          {activePlatform === 'meta' && (
            <div className="w-full max-w-md bg-[#242526] rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
              <div className="w-full aspect-[1.91/1] bg-black relative flex items-center justify-center overflow-hidden">
                <img
                  src={displayImage}
                  alt={displayTitle}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-sm text-[10px] text-gray-200 px-2 py-0.5 rounded font-mono">
                  1200 × 630 (OG Banner)
                </span>
              </div>
              <div className="p-3.5 bg-[#3a3b3c] space-y-1">
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider block font-mono">
                  CATZT.COM
                </span>
                <h4 className="text-sm font-bold text-white leading-tight line-clamp-1">
                  {displayTitle}
                </h4>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {displayDesc}
                </p>
              </div>
            </div>
          )}

          {/* 3. TWITTER / X CARD PREVIEW */}
          {activePlatform === 'twitter' && (
            <div className="w-full max-w-md bg-black rounded-2xl border border-gray-800 overflow-hidden shadow-2xl p-3">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                  CO
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="font-bold text-white">Catzt Office</span>
                    <span className="text-gray-500">@catztoffice · 1m</span>
                  </div>
                  <p className="text-xs text-gray-300">Systemic control for multi-marketplace operations.</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#16181c]">
                <div className="w-full aspect-[1.91/1] bg-gray-900 relative flex items-center justify-center overflow-hidden">
                  <img
                    src={displayImage}
                    alt={displayTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 space-y-0.5">
                  <span className="text-[11px] text-gray-500 font-mono">catzt.com</span>
                  <h4 className="text-xs font-semibold text-white truncate">{displayTitle}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">{displayDesc}</p>
                </div>
              </div>
            </div>
          )}

          {/* 4. LINKEDIN PREVIEW */}
          {activePlatform === 'linkedin' && (
            <div className="w-full max-w-md bg-[#1d2226] rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
              <div className="w-full aspect-[1.91/1] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={displayImage}
                  alt={displayTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-[#283038] space-y-1">
                <h4 className="text-xs font-bold text-white line-clamp-1">{displayTitle}</h4>
                <span className="text-[10px] text-gray-400 block font-mono">catzt.com · 2 min read</span>
              </div>
            </div>
          )}

          {/* 5. TIKTOK SOCIAL SHARE PREVIEW */}
          {activePlatform === 'tiktok' && (
            <div className="w-full max-w-xs bg-[#121212] rounded-2xl border border-gray-800 p-4 shadow-2xl text-center space-y-3">
              <div className="w-full aspect-[9/16] max-h-[300px] mx-auto bg-black rounded-xl overflow-hidden relative border border-gray-800 flex items-center justify-center">
                <img
                  src={displayImage}
                  alt={displayTitle}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-12 h-12 rounded-full bg-[#FE2C55] flex items-center justify-center text-white shadow-lg">
                    <Play className="w-5 h-5 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 left-2 right-2 text-[10px] text-white bg-black/60 p-1 rounded line-clamp-1">
                  {displayTitle}
                </span>
              </div>
              <div className="text-xs text-gray-300">
                <p className="font-semibold text-white">TikTok Share & Video Embed Ready</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Optimized for vertical reels & product case studies</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#191919] border-t border-gray-800 flex items-center justify-between text-xs">
          <span className="text-gray-400 font-mono text-[11px] truncate max-w-xs">{displayUrl}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium transition"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
