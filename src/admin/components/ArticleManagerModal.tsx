import React, { useState, useMemo } from 'react';
import { ArticleItem } from '../cmsContentStore';
import { VisualImageSlot } from './VisualImageSlot';
import {
  X,
  FileText,
  Video,
  Play,
  Globe,
  Share2,
  Clock,
  Hash,
  ListTree,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface ArticleManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: ArticleItem) => void;
  initialData?: ArticleItem | null;
}

export const ArticleManagerModal: React.FC<ArticleManagerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<ArticleItem>(() => {
    if (initialData) return initialData;
    return {
      id: `article-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Publications & Insights',
      imageUrl: '/wp-content/uploads/2026/01/51e90374-6d77-45c0-aaa7-782e982df077.png',
      linkUrl: '/actualites/',
      date: new Date().toISOString().slice(0, 10),
      author: 'Catzt Editorial Team',
      excerpt: '',
      content: '',
      status: 'published',
      canonicalUrl: '',
      tiktokVideoEmbedUrl: '',
      youtubeVideoUrl: '',
      instagramEmbedUrl: '',
    };
  });

  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'seo'>('content');
  const [targetKeyword, setTargetKeyword] = useState<string>('');

  // 1. Calculate Word Count & Reading Time
  const stats = useMemo(() => {
    const rawText = (formData.content || '').replace(/<[^>]*>?/gm, ' ');
    const words = rawText.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    // Keyword density
    let keywordCount = 0;
    let density = 0;
    if (targetKeyword.trim() && wordCount > 0) {
      const regex = new RegExp(`\\b${targetKeyword.trim()}\\b`, 'gi');
      const matches = rawText.match(regex);
      keywordCount = matches ? matches.length : 0;
      density = parseFloat(((keywordCount / wordCount) * 100).toFixed(2));
    }

    // Auto Table of Contents
    const headings: { level: number; text: string }[] = [];
    const headingRegex = /<h([23])>(.*?)<\/h\1>/gi;
    let match;
    while ((match = headingRegex.exec(formData.content || '')) !== null) {
      headings.push({ level: parseInt(match[1]), text: match[2].replace(/<[^>]*>?/gm, '') });
    }

    return {
      wordCount,
      readingTimeMinutes,
      keywordCount,
      density,
      headings,
    };
  }, [formData.content, targetKeyword]);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    const slugGen = val
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug || slugGen,
      canonicalUrl: prev.canonicalUrl || `https://catzt.com/actualites/${prev.slug || slugGen}`,
    }));
  };

  const insertTag = (open: string, close: string) => {
    setFormData((prev) => ({
      ...prev,
      content: `${prev.content || ''}${open}${close}`,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter an article title.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-[#111114] border border-zinc-800 rounded-3xl flex flex-col max-h-[92vh] shadow-2xl shadow-black overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#16161a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                {initialData ? 'Article Editor & SEO Engine' : 'New Article / Thought Leadership Post'}
                <span className="text-[10px] bg-amber-400/15 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-400/20">
                  Ghost/Notion Standard
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Craft SEO-optimized articles with live word count, reading time, and video embeds
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Metrics Header Bar */}
        <div className="px-6 py-2.5 bg-[#0e0e11] border-b border-zinc-800/90 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-[#17171b] p-1 rounded-xl border border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'content'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Article Body & Layout
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'media'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" /> Video Embeds
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'seo'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> On-Page SEO
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
              <Clock className="w-3 h-3 text-amber-400" /> {stats.readingTimeMinutes} min read
            </span>
            <span className="flex items-center gap-1 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
              <Hash className="w-3 h-3 text-amber-400" /> {stats.wordCount} words
            </span>
          </div>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === 'content' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Title & Slug */}
              <div className="bg-[#141418] p-5 rounded-2xl border border-zinc-800/80 space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-200 mb-1.5">
                    Article Title <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. La réputation s’impose comme un actif stratégique..."
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full bg-[#1b1b20] border border-zinc-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      URL Slug Route (`/actualites/slug`)
                    </label>
                    <input
                      type="text"
                      placeholder="reputation-actif-strategique"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full bg-[#1b1b20] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Category Taxonomy Tag
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#1b1b20] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                    >
                      <option value="Publications & Insights">Publications & Insights</option>
                      <option value="News & Annonces">News & Annonces</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Tribune">Tribune</option>
                      <option value="Communiqué">Communiqué</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Author & Date & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-[#141418] p-4 rounded-2xl border border-zinc-800/80">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Author / Team</label>
                  <input
                    type="text"
                    value={formData.author || 'Catzt Editorial Team'}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-[#1b1b20] text-xs text-white px-3 py-2 rounded-xl border border-zinc-700/80"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Publication Date</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#1b1b20] text-xs text-white px-3 py-2 rounded-xl border border-zinc-700/80 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Publish Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })
                    }
                    className="w-full bg-[#1b1b20] text-xs text-amber-300 font-bold px-3 py-2 rounded-xl border border-zinc-700/80"
                  >
                    <option value="published">🟢 Published Live</option>
                    <option value="draft">🟡 Draft Workspace</option>
                  </select>
                </div>
              </div>

              {/* Featured Image Slot */}
              <VisualImageSlot
                label="Featured Article Cover Banner"
                description="16:9 high-resolution banner thumbnail for Google discover and social sharing"
                imageUrl={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                aspectRatio="video"
              />

              {/* Short Excerpt */}
              <div className="bg-[#141418] p-4 rounded-2xl border border-zinc-800/80">
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Summary / Excerpt (Lead Hook for SERP)
                </label>
                <textarea
                  rows={2}
                  placeholder="Provide a concise 1-2 sentence overview of the article..."
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Full Content with Quick Toolbar */}
              <div className="bg-[#141418] p-4 rounded-2xl border border-zinc-800/80 space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-xs font-bold text-zinc-200">
                    Article Body & Typography
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => insertTag('<h2>', '</h2>')}
                      className="px-2.5 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 font-semibold"
                    >
                      H2 Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<h3>', '</h3>')}
                      className="px-2.5 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 font-semibold"
                    >
                      H3 Subheading
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<b>', '</b>')}
                      className="px-2.5 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 font-bold"
                    >
                      Bold
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<blockquote>', '</blockquote>')}
                      className="px-2.5 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 italic"
                    >
                      Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTag('<ul><li>', '</li></ul>')}
                      className="px-2.5 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700"
                    >
                      Bullet List
                    </button>
                  </div>
                </div>

                <textarea
                  rows={8}
                  placeholder="Write full article body paragraphs, quotes, and insights..."
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-zinc-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 font-mono leading-relaxed"
                />

                {/* Auto Table of Contents Preview */}
                {stats.headings.length > 0 && (
                  <div className="bg-[#101013] p-3 rounded-xl border border-zinc-800/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                      <ListTree className="w-3.5 h-3.5" /> Auto-Generated Table of Contents (TOC)
                    </div>
                    <ul className="space-y-1 text-[11px] text-zinc-400">
                      {stats.headings.map((h, i) => (
                        <li key={i} className={h.level === 3 ? 'pl-4 text-zinc-500' : 'font-medium'}>
                          • {h.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-[#141418] p-5 rounded-2xl border border-zinc-800/80 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <Play className="w-4 h-4 text-[#FE2C55]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    TikTok Short-Video Embed
                  </h4>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    TikTok Video URL / Share Link
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.tiktok.com/@catztoffice/video/1234567890"
                    value={formData.tiktokVideoEmbedUrl || ''}
                    onChange={(e) => setFormData({ ...formData, tiktokVideoEmbedUrl: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="bg-[#141418] p-5 rounded-2xl border border-zinc-800/80 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <Video className="w-4 h-4 text-red-500" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    YouTube / Case Study Video Link
                  </h4>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    YouTube Video URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.youtubeVideoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, youtubeVideoUrl: e.target.value })}
                    className="w-full bg-[#1b1b20] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Keyword Density Checker */}
              <div className="bg-[#141418] p-5 rounded-2xl border border-zinc-800/80 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      On-Page Keyword Density Analyzer
                    </h4>
                  </div>
                  {targetKeyword && (
                    <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                      Density: {stats.density}% ({stats.keywordCount} occurrences)
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Focus Target Keyword for this Article
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. communication de crise"
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                    className="w-full bg-[#1b1b20] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Canonical URL */}
              <div className="bg-[#141418] p-5 rounded-2xl border border-zinc-800/80 space-y-3">
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Canonical URL (Preferred Authority URL)
                </label>
                <input
                  type="text"
                  placeholder="https://catzt.com/actualites/..."
                  value={formData.canonicalUrl || ''}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="w-full bg-[#1b1b20] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs text-zinc-300 font-mono focus:outline-none focus:border-amber-400"
                />
                <p className="text-[10px] text-zinc-500">
                  Google attributes search authority directly to this canonical URL tag.
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#141418] border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono truncate max-w-xs">
            {formData.slug ? `/actualites/${formData.slug}` : 'Draft Post'}
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-black transition shadow-lg shadow-amber-400/20 active:scale-[0.98]"
            >
              {initialData ? 'Save Changes' : 'Publish Article Live'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
