import React, { useState } from 'react';
import { CMSContentSchema, TrackingIntegrations } from '../cmsContentStore';
import {
  Share2,
  Globe,
  CheckCircle2,
  Code,
  ShieldCheck,
  FileCode,
  Sparkles,
  Play,
} from 'lucide-react';

interface SocialIntegrationsEditorProps {
  formData: CMSContentSchema;
  onChange: (field: keyof TrackingIntegrations, value: any) => void;
}

export const SocialIntegrationsEditor: React.FC<SocialIntegrationsEditorProps> = ({
  formData,
  onChange,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'tracking' | 'schema' | 'robots'>('tracking');
  const integrations = formData.integrations || {
    googleAnalyticsId: '',
    googleSearchConsoleVerification: '',
    googleTagManagerId: '',
    metaPixelId: '',
    metaDomainVerification: '',
    facebookAppId: '',
    tiktokPixelId: '',
    sitemapEnabled: true,
    robotsTxtCustom: 'User-agent: *\nAllow: /\nSitemap: https://catzt.com/sitemap.xml',
  };

  const schemaJsonLD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://catzt.com/#organization',
        name: formData.global?.brandName || 'Catzt Office',
        url: 'https://catzt.com',
        logo: 'https://catzt.com/images/Catzt-logo.png',
        sameAs: [
          'https://twitter.com/catztoffice',
          'https://linkedin.com/company/catzt',
          'https://tiktok.com/@catztoffice',
          'https://instagram.com/catztoffice',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: formData.global?.contactPhone || '+33 1 53 32 60 00',
          contactType: 'customer service',
          email: formData.global?.contactEmail || 'contact@catztoffice.com',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://catzt.com/#website',
        url: 'https://catzt.com',
        name: formData.global?.siteTitle || 'Catzt Office',
        publisher: { '@id': 'https://catzt.com/#organization' },
      },
    ],
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            SEO & Multi-Platform Growth Hub <Share2 className="w-4 h-4 text-amber-400" />
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Connect Google Search Console, Meta Pixel, TikTok tracking, and Schema.org Structured Data.
          </p>
        </div>
      </div>

      {/* Sub navigation */}
      <div className="flex items-center gap-2 bg-[#181818] p-1.5 rounded-xl border border-gray-800 text-xs">
        <button
          onClick={() => setActiveSubTab('tracking')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
            activeSubTab === 'tracking'
              ? 'bg-amber-400 text-black'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          Pixels & Webmaster Verification
        </button>
        <button
          onClick={() => setActiveSubTab('schema')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
            activeSubTab === 'schema'
              ? 'bg-amber-400 text-black'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          JSON-LD Structured Data
        </button>
        <button
          onClick={() => setActiveSubTab('robots')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
            activeSubTab === 'robots'
              ? 'bg-amber-400 text-black'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          Sitemap & Robots.txt
        </button>
      </div>

      {/* TAB 1: PIXELS & VERIFICATION */}
      {activeSubTab === 'tracking' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* 1. Google Ecosystem */}
          <div className="bg-[#181818] p-5 rounded-2xl border border-gray-800 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-800/80">
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                G
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Google Search & Analytics Connections
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Google Search Console Verification Tag / Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. google-site-verification=abc123xyz"
                  value={integrations.googleSearchConsoleVerification || ''}
                  onChange={(e) => onChange('googleSearchConsoleVerification', e.target.value)}
                  className="w-full bg-[#222222] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Verifies site ownership with Google Search Console for instant crawling.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Google Analytics 4 (GA4) Measurement ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. G-XXXXXXXXXX"
                  value={integrations.googleAnalyticsId || ''}
                  onChange={(e) => onChange('googleAnalyticsId', e.target.value)}
                  className="w-full bg-[#222222] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Tracks organic visitors, conversions, and bounce rate.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Meta Ecosystem (Facebook & Instagram) */}
          <div className="bg-[#181818] p-5 rounded-2xl border border-gray-800 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-800/80">
              <div className="w-6 h-6 rounded-lg bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center font-bold text-xs">
                f
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Meta (Facebook & Instagram) Integrations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Meta Pixel ID (Facebook / Instagram Ads)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 123456789012345"
                  value={integrations.metaPixelId || ''}
                  onChange={(e) => onChange('metaPixelId', e.target.value)}
                  className="w-full bg-[#222222] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Enables retargeting on Instagram and Facebook Ads.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Meta Domain Verification Meta Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. abcdef123456789"
                  value={integrations.metaDomainVerification || ''}
                  onChange={(e) => onChange('metaDomainVerification', e.target.value)}
                  className="w-full bg-[#222222] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Verifies catzt.com in Meta Business Suite.
                </p>
              </div>
            </div>
          </div>

          {/* 3. TikTok Ecosystem */}
          <div className="bg-[#181818] p-5 rounded-2xl border border-gray-800 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-800/80">
              <div className="w-6 h-6 rounded-lg bg-[#FE2C55]/20 text-[#FE2C55] flex items-center justify-center font-bold text-xs">
                <Play className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                TikTok Ads & Creator Pixel
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  TikTok Pixel ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. CXXXXXXXXXXXXXXX"
                  value={integrations.tiktokPixelId || ''}
                  onChange={(e) => onChange('tiktokPixelId', e.target.value)}
                  className="w-full bg-[#222222] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Attribution tracking for TikTok Shop & short-video traffic.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCHEMA.ORG JSON-LD */}
      {activeSubTab === 'schema' && (
        <div className="bg-[#181818] p-5 rounded-2xl border border-gray-800 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Automated Schema.org JSON-LD (Google Rich Snippets)
              </h3>
            </div>
            <span className="text-[11px] bg-emerald-950/60 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-mono">
              Auto-Injected to DOM
            </span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            The following structured data is dynamically compiled and injected into the &lt;head&gt; of your landing page for Google Knowledge Graph, Logo rich snippets, and SiteLinks search boxes.
          </p>

          <div className="bg-[#101010] p-4 rounded-xl border border-gray-800 overflow-x-auto">
            <pre className="text-xs text-amber-300 font-mono leading-relaxed">
              {JSON.stringify(schemaJsonLD, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: ROBOTS & SITEMAP */}
      {activeSubTab === 'robots' && (
        <div className="bg-[#181818] p-5 rounded-2xl border border-gray-800 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Crawler Directives & Sitemap
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Custom `robots.txt` Content
            </label>
            <textarea
              rows={4}
              value={integrations.robotsTxtCustom || ''}
              onChange={(e) => onChange('robotsTxtCustom', e.target.value)}
              className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="bg-[#121212] p-3 rounded-xl border border-gray-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">Live Dynamic Sitemap:</span>
              <span className="font-mono text-amber-300">https://catzt.com/sitemap.xml</span>
            </div>
            <span className="text-emerald-400 text-[10px] font-semibold">Active (7 Pages Indexed)</span>
          </div>
        </div>
      )}
    </div>
  );
};
