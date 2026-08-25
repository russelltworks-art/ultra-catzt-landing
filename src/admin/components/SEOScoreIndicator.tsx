import React from 'react';
import { PageSEOMetadata } from '../cmsContentStore';
import { CheckCircle2, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

interface SEOScoreIndicatorProps {
  seo: PageSEOMetadata;
}

export const SEOScoreIndicator: React.FC<SEOScoreIndicatorProps> = ({ seo }) => {
  const titleLen = (seo.metaTitle || '').length;
  const descLen = (seo.metaDescription || '').length;
  const hasImage = !!seo.ogImage;
  const hasCanonical = !!seo.canonicalUrl;
  const focus = (seo.focusKeyword || '').toLowerCase().trim();

  let score = 0;
  const checks: Array<{ label: string; passed: boolean; tip: string }> = [];

  // 1. Title Check (30 pts)
  if (titleLen >= 40 && titleLen <= 65) {
    score += 30;
    checks.push({ label: 'Title Length', passed: true, tip: `${titleLen} chars (Optimal: 40-65)` });
  } else if (titleLen > 0) {
    score += 15;
    checks.push({ label: 'Title Length', passed: false, tip: `${titleLen} chars (Recommended: 40-65)` });
  } else {
    checks.push({ label: 'Title Missing', passed: false, tip: 'Add a title for Google indexing' });
  }

  // 2. Description Check (30 pts)
  if (descLen >= 110 && descLen <= 165) {
    score += 30;
    checks.push({ label: 'Description Length', passed: true, tip: `${descLen} chars (Optimal: 110-165)` });
  } else if (descLen > 0) {
    score += 15;
    checks.push({ label: 'Description Length', passed: false, tip: `${descLen} chars (Recommended: 110-165)` });
  } else {
    checks.push({ label: 'Description Missing', passed: false, tip: 'Add description for SERP snippets' });
  }

  // 3. Social Share Image Check (20 pts)
  if (hasImage) {
    score += 20;
    checks.push({ label: 'OpenGraph Image', passed: true, tip: 'Social card thumbnail configured' });
  } else {
    checks.push({ label: 'OpenGraph Image', passed: false, tip: 'Add image for WhatsApp/Meta/Twitter previews' });
  }

  // 4. Focus Keyword / Canonical (20 pts)
  if (focus && (seo.metaTitle.toLowerCase().includes(focus) || seo.metaDescription.toLowerCase().includes(focus))) {
    score += 10;
    checks.push({ label: 'Focus Keyword', passed: true, tip: `"${seo.focusKeyword}" found in metadata` });
  } else if (focus) {
    checks.push({ label: 'Focus Keyword', passed: false, tip: `Include "${seo.focusKeyword}" in title/desc` });
  } else {
    score += 10;
  }

  if (hasCanonical) {
    score += 10;
    checks.push({ label: 'Canonical URL', passed: true, tip: 'Self-referencing canonical set' });
  } else {
    checks.push({ label: 'Canonical URL', passed: false, tip: 'Add canonical URL to avoid duplicate indexing' });
  }

  const getScoreColor = () => {
    if (score >= 80) return 'text-emerald-400 border-emerald-400/40 bg-emerald-950/40';
    if (score >= 50) return 'text-amber-400 border-amber-400/40 bg-amber-950/40';
    return 'text-red-400 border-red-400/40 bg-red-950/40';
  };

  return (
    <div className="bg-[#121212] border border-gray-800 p-3.5 rounded-xl space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-semibold text-gray-200">SEO Health Score</span>
        </div>
        <div className={`px-2.5 py-0.5 rounded-full border text-xs font-mono font-bold ${getScoreColor()}`}>
          {score}/100
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
        {checks.map((chk, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg border flex flex-col justify-between ${
              chk.passed
                ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                : 'bg-[#1c1c1c] border-gray-800 text-gray-400'
            }`}
          >
            <div className="flex items-center gap-1 font-semibold text-[10px] uppercase">
              {chk.passed ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
              )}
              <span className="truncate">{chk.label}</span>
            </div>
            <p className="text-[10px] mt-1 line-clamp-1 opacity-80">{chk.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
