import React from 'react';
import {
  X,
  Layout,
  Layers,
  Sparkles,
  Award,
  HelpCircle,
  TrendingUp,
  MessageSquare,
  Zap,
} from 'lucide-react';

export interface SectionTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
  badge: string;
}

export const PREBUILT_TEMPLATES: SectionTemplate[] = [
  {
    id: 'bento-grid',
    name: 'Bento Grid Feature Showcase',
    category: 'Features & Layout',
    description: 'Modern Apple/Linear style 4-cell asymmetrical grid with glowing borders and icons.',
    icon: Layout,
    badge: 'Popular',
  },
  {
    id: 'metrics-stats',
    name: 'Animated Counter & Stat Metrics',
    category: 'Social Proof',
    description: 'Key business numbers (e.g. +150M€, 99.9% uptime, 50+ experts) with live counter animations.',
    icon: TrendingUp,
    badge: 'High Conversion',
  },
  {
    id: 'logo-marquee',
    name: 'Infinite Sliding Logo Marquee',
    category: 'Social Proof',
    description: 'Continuous smooth scrolling marquee banner showcasing enterprise client logos.',
    icon: Award,
    badge: 'Enterprise',
  },
  {
    id: 'faq-accordion',
    name: 'Interactive FAQ Accordion',
    category: 'Conversion & Trust',
    description: 'Collapsible accordion list answering common buyer and seller questions.',
    icon: HelpCircle,
    badge: 'SEO Schema Ready',
  },
  {
    id: 'testimonials-slider',
    name: 'Executive Testimonials & Quotes',
    category: 'Social Proof',
    description: 'High-impact customer reviews with author avatars, brand logos, and 5-star ratings.',
    icon: MessageSquare,
    badge: 'Trust',
  },
  {
    id: 'cta-banner',
    name: 'High-Converting Conversion CTA Banner',
    category: 'Conversion',
    description: 'Gradient metallic banner with dual action buttons and live urgency subtext.',
    icon: Zap,
    badge: 'Lead Gen',
  },
];

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: SectionTemplate) => void;
}

export const AddSectionModal: React.FC<AddSectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Features & Layout', 'Social Proof', 'Conversion & Trust'];

  const filtered = PREBUILT_TEMPLATES.filter(
    (t) => selectedCategory === 'All' || t.category.includes(selectedCategory)
  );

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-[#111114] border border-zinc-800 rounded-3xl flex flex-col max-h-[90vh] shadow-2xl shadow-black overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#16161a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Add New Section Block
                <span className="text-[10px] bg-amber-400/15 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-400/20">
                  Wix Component Palette
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Choose from pre-designed high-converting blocks to add directly onto your canvas
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

        {/* Categories */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-[#0e0e11] border-b border-zinc-800 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[60vh]">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                className="bg-[#151519] border border-zinc-800 hover:border-amber-400/60 p-5 rounded-2xl cursor-pointer transition group hover:shadow-lg hover:shadow-amber-400/5 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700/70 group-hover:border-amber-400/40 flex items-center justify-center text-zinc-300 group-hover:text-amber-400 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-zinc-800 group-hover:bg-amber-400/20 text-zinc-400 group-hover:text-amber-300 px-2 py-0.5 rounded-full border border-zinc-700/60 group-hover:border-amber-400/30 transition">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 group-hover:text-amber-400 font-semibold">
                  <span>Insert to Canvas</span>
                  <span>+</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
