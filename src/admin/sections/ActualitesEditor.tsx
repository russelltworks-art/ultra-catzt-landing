import React, { useState } from 'react';
import { CMSContentSchema, ArticleItem, PageSEOMetadata } from '../cmsContentStore';
import { PageSEOCard } from '../components/PageSEOCard';
import { ArticleManagerModal } from '../components/ArticleManagerModal';
import {
  Plus,
  Edit2,
  Trash2,
  Newspaper,
  Calendar,
  User,
  ArrowUp,
  ArrowDown,
  Search,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ActualitesEditorProps {
  formData: CMSContentSchema;
  onChange: (field: string, value: any) => void;
  onSEOChange: (seo: PageSEOMetadata) => void;
}

export const ActualitesEditor: React.FC<ActualitesEditorProps> = ({
  formData,
  onChange,
  onSEOChange,
}) => {
  const actualites = formData.actualites || { mainTitle: '', items: [] };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art: ArticleItem) => {
    setEditingArticle(art);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updated = actualites.items.filter((item) => item.id !== id);
      onChange('items', updated);
    }
  };

  const handleSaveArticle = (article: ArticleItem) => {
    const existingIndex = actualites.items.findIndex((item) => item.id === article.id);
    let updated: ArticleItem[];
    if (existingIndex >= 0) {
      updated = [...actualites.items];
      updated[existingIndex] = article;
    } else {
      updated = [article, ...actualites.items];
    }
    onChange('items', updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= actualites.items.length) return;
    const updated = [...actualites.items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange('items', updated);
  };

  const filteredItems = actualites.items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Page SEO Header Card */}
      <PageSEOCard
        seoData={
          formData.pagesSEO?.actualites || {
            pageName: 'Actualités & Blog',
            metaTitle: 'Actualités — Catzt Office',
            metaDescription: 'Découvrez nos dernières actualités, analyses et tribunes.',
            slug: '/actualites/',
            ogImage: '/images/Catzt-logo.png',
          }
        }
        onChange={onSEOChange}
        sectionTitle="Actualités & Blog"
      />

      {/* 2. Section Title & Actions */}
      <div className="bg-[#131316] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Articles & Thought Leadership Hub <Newspaper className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Publish news, case studies, and video content directly to your landing page and blog
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-amber-400/20 transition active:scale-[0.98] shrink-0"
          >
            <Plus className="w-4 h-4" /> + Buat Artikel Baru
          </button>
        </div>

        {/* Section Heading Input */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Public Section Heading Label
          </label>
          <input
            type="text"
            value={actualites.mainTitle}
            onChange={(e) => onChange('mainTitle', e.target.value)}
            className="w-full bg-[#19191d] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            placeholder="e.g. Actualités"
          />
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-[#19191d] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs">
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search articles by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white placeholder-zinc-500 focus:outline-none w-full text-xs"
          />
        </div>

        {/* Article Cards List */}
        <div className="space-y-3 pt-2">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-[#0e0e11] rounded-2xl border border-dashed border-zinc-800 space-y-3">
              <Newspaper className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-xs text-zinc-400 font-medium">No articles published yet.</p>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Click here to write your first article
              </button>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const words = (item.content || '').replace(/<[^>]*>?/gm, ' ').trim().split(/\s+/).filter(Boolean).length;
              const readTime = Math.max(1, Math.ceil(words / 200));

              return (
                <div
                  key={item.id || idx}
                  className="bg-[#16161a] border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition shadow-sm group"
                >
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    {/* Thumbnail */}
                    <div className="w-16 h-12 rounded-xl bg-black border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <Newspaper className="w-5 h-5 text-zinc-700" />
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] bg-amber-400/15 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-400/20">
                          {item.category || 'Insights'}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.date}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {readTime} min read
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition truncate">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {item.excerpt || item.content?.slice(0, 90) || 'No excerpt'}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Reorder */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-zinc-800 transition"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === actualites.items.length - 1}
                      className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-zinc-800 transition"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                    >
                      <Edit2 className="w-3 h-3 text-amber-400" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Article Creation Modal */}
      <ArticleManagerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveArticle}
        initialData={editingArticle}
      />
    </div>
  );
};
