import React, { useState } from 'react';
import { CMSContentSchema, ArticleItem } from '../cmsContentStore';
import { PageSEOCard } from '../components/PageSEOCard';
import { ArticleManagerModal } from '../components/ArticleManagerModal';
import { ItemOrderControls } from '../components/ItemOrderControls';
import {
  Plus,
  Newspaper,
  Edit,
  Trash2,
  Calendar,
  User,
  Eye,
  FileText,
  Search,
} from 'lucide-react';

interface ActualitesEditorProps {
  formData: CMSContentSchema;
  onChange: (field: keyof CMSContentSchema['actualites'], value: any) => void;
  onSEOChange: (seo: CMSContentSchema['pagesSEO']['actualites']) => void;
}

export const ActualitesEditor: React.FC<ActualitesEditorProps> = ({
  formData,
  onChange,
  onSEOChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const articles = formData.actualites?.items || [];

  const handleSaveArticle = (saved: ArticleItem) => {
    const existingIdx = articles.findIndex((a) => a.id === saved.id);
    let updated: ArticleItem[];
    if (existingIdx >= 0) {
      updated = [...articles];
      updated[existingIdx] = saved;
    } else {
      updated = [saved, ...articles];
    }
    onChange('items', updated);
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Delete this article?')) {
      const updated = articles.filter((a) => a.id !== id);
      onChange('items', updated);
    }
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    const updated = [...articles];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange('items', updated);
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Page Name & SEO Header Card */}
      <PageSEOCard
        sectionTitle="Actualités (News & Publications)"
        seoData={formData.pagesSEO.actualites}
        onChange={onSEOChange}
      />

      {/* 2. Section Header & Actions */}
      <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Actualités & Articles Hub <Newspaper className="w-4 h-4 text-amber-400" />
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage press releases, case studies, thought leadership essays, and blog posts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingArticle(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg shadow-amber-400/20 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" /> + Buat Artikel Baru
        </button>
      </div>

      {/* 3. Section Main Headline */}
      <div className="bg-[#181818] p-4 rounded-xl border border-gray-800 space-y-1.5">
        <label className="block text-xs font-semibold text-gray-300">
          News Section Main Title
        </label>
        <input
          type="text"
          value={formData.actualites.mainTitle}
          onChange={(e) => onChange('mainTitle', e.target.value)}
          className="w-full bg-[#202020] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          placeholder="Découvrez nos dernières annonces et réalisations..."
        />
      </div>

      {/* 4. Search Filter Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search articles by title or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181818] border border-gray-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-gray-200 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs text-gray-400 font-mono">
          {articles.length} {articles.length === 1 ? 'Article' : 'Articles'} Total
        </span>
      </div>

      {/* 5. Articles List Cards */}
      <div className="space-y-3">
        {filteredArticles.length === 0 ? (
          <div className="bg-[#181818] border border-gray-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
            <FileText className="w-10 h-10 text-gray-600 mb-2" />
            <p className="text-xs font-semibold text-gray-300">No articles found</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Click "+ Buat Artikel Baru" to publish your first post.</p>
          </div>
        ) : (
          filteredArticles.map((article, idx) => (
            <div
              key={article.id || idx}
              className="bg-[#181818] border border-gray-800 hover:border-gray-700 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition shadow-sm"
            >
              {/* Article Left Info */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                {/* Thumbnail */}
                <div className="w-20 h-14 bg-black/60 rounded-xl overflow-hidden border border-gray-700/80 flex items-center justify-center shrink-0">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Newspaper className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {/* Meta details */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md font-semibold border border-amber-400/30">
                      {article.category || 'Article'}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                        article.status === 'published'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                          : 'bg-yellow-950/60 text-yellow-400 border border-yellow-800'
                      }`}
                    >
                      {article.status === 'published' ? 'Live' : 'Draft'}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {article.date || '2026'}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white truncate" title={article.title}>
                    {article.title}
                  </h4>
                  {article.excerpt && (
                    <p className="text-[11px] text-gray-400 line-clamp-1">{article.excerpt}</p>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <ItemOrderControls
                  index={idx}
                  total={articles.length}
                  onMoveUp={() => handleMove(idx, idx - 1)}
                  onMoveDown={() => handleMove(idx, idx + 1)}
                  onDelete={() => handleDeleteArticle(article.id)}
                />
                <button
                  type="button"
                  onClick={() => {
                    setEditingArticle(article);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-1 bg-[#282828] hover:bg-[#333333] text-gray-200 text-xs px-3 py-1.5 rounded-lg border border-gray-700 transition"
                >
                  <Edit className="w-3.5 h-3.5 text-amber-400" /> Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Article Creator / Editor Modal */}
      {isModalOpen && (
        <ArticleManagerModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingArticle(null);
          }}
          onSave={handleSaveArticle}
          initialData={editingArticle}
        />
      )}
    </div>
  );
};
