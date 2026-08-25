import React, { useState } from 'react';
import { ArticleItem } from '../cmsContentStore';
import { VisualImageSlot } from './VisualImageSlot';
import { X, Check, FileText, Heading, Bold, Italic, Link as LinkIcon, Quote, List } from 'lucide-react';

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
      category: 'Publications',
      imageUrl: '/wp-content/uploads/2026/01/51e90374-6d77-45c0-aaa7-782e982df077.png',
      linkUrl: '/actualites/',
      date: new Date().toISOString().slice(0, 10),
      author: 'Catzt Editorial Team',
      excerpt: '',
      content: '',
      status: 'published',
    };
  });

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
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-[#171717] border border-gray-800 rounded-2xl flex flex-col max-h-[90vh] shadow-2xl shadow-black overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#1e1e1e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                {initialData ? 'Edit Article / Case Study' : 'Create New Article / Case Study'}
              </h3>
              <p className="text-[11px] text-gray-400">
                Write comprehensive thought leadership, news announcements, and customer stories.
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

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Title & Slug */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Article Title <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. La réputation s’impose comme un actif stratégique..."
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Permalink Slug (`/actualites/slug`)
                </label>
                <input
                  type="text"
                  placeholder="reputation-actif-strategique"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Category Tag
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="News & Annonces">News & Annonces</option>
                  <option value="Publications & Insights">Publications & Insights</option>
                  <option value="Case Study">Case Study</option>
                  <option value="Tribune">Tribune</option>
                  <option value="Communiqué">Communiqué</option>
                </select>
              </div>
            </div>
          </div>

          {/* Author & Date & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#131313] p-3.5 rounded-xl border border-gray-800">
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Author / Team</label>
              <input
                type="text"
                value={formData.author || 'Catzt Editorial Team'}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full bg-[#202020] text-xs text-white px-2.5 py-1.5 rounded-lg border border-gray-700"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Publication Date</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-[#202020] text-xs text-white px-2.5 py-1.5 rounded-lg border border-gray-700"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Publish Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })
                }
                className="w-full bg-[#202020] text-xs text-amber-300 font-semibold px-2.5 py-1.5 rounded-lg border border-gray-700"
              >
                <option value="published">🟢 Published Live</option>
                <option value="draft">🟡 Draft Only</option>
              </select>
            </div>
          </div>

          {/* Featured Image Slot */}
          <VisualImageSlot
            label="Featured Article Cover Image"
            description="High-resolution banner thumbnail for feed and social sharing"
            imageUrl={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            aspectRatio="video"
          />

          {/* Short Excerpt */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Short Summary / Excerpt (Meta Pitch)
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary of the article..."
              value={formData.excerpt || ''}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Full Article Content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-300">
                Full Article Content / Body
              </label>
              {/* Rich Format Chips */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => insertTag('<h2>', '</h2>')}
                  className="px-2 py-0.5 text-[10px] bg-[#222222] hover:bg-[#333333] text-gray-300 rounded border border-gray-700"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<h3>', '</h3>')}
                  className="px-2 py-0.5 text-[10px] bg-[#222222] hover:bg-[#333333] text-gray-300 rounded border border-gray-700"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<b>', '</b>')}
                  className="px-2 py-0.5 text-[10px] bg-[#222222] hover:bg-[#333333] text-gray-300 rounded border border-gray-700 font-bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<i>', '</i>')}
                  className="px-2 py-0.5 text-[10px] bg-[#222222] hover:bg-[#333333] text-gray-300 rounded border border-gray-700 italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<blockquote>', '</blockquote>')}
                  className="px-2 py-0.5 text-[10px] bg-[#222222] hover:bg-[#333333] text-gray-300 rounded border border-gray-700"
                >
                  Quote
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<ul><li>', '</li></ul>')}
                  className="px-2 py-0.5 text-[10px] bg-[#222222] hover:bg-[#333333] text-gray-300 rounded border border-gray-700"
                >
                  List
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              placeholder="Write full article body paragraphs..."
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono leading-relaxed"
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#141414] border-t border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">{formData.slug ? `/actualites/${formData.slug}` : 'Draft'}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-black transition shadow-md shadow-amber-400/20"
            >
              {initialData ? 'Save Changes' : 'Publish Article'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
