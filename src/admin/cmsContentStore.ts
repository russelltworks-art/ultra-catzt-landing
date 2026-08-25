/**
 * Catzt CMS Content Store & Schema
 * Manages full live state, drafts, publish pipeline, media asset library, SEO metadata, articles, and admin auth
 */

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'svg' | 'video';
  size?: string;
  uploadedAt: string;
  isCustom?: boolean;
}

export interface PageSEOMetadata {
  pageName: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  ogImage: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
  linkUrl: string;
  date: string;
  author?: string;
  excerpt?: string;
  content?: string;
  status: 'published' | 'draft';
}

export interface CMSContentSchema {
  meta: {
    lastPublished: string;
    version: string;
    publishedBy: string;
  };
  global: {
    siteTitle: string;
    brandName: string;
    contactEmail: string;
    contactPhone: string;
    officeAddress: string;
    cookieBannerText: string;
    adminPassword?: string;
  };
  pagesSEO: {
    hero: PageSEOMetadata;
    aPropos: PageSEOMetadata;
    expertises: PageSEOMetadata;
    references: PageSEOMetadata;
    actualites: PageSEOMetadata;
    nousRejoindre: PageSEOMetadata;
    contact: PageSEOMetadata;
  };
  hero: {
    subtitle: string;
    headline: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
    backgroundMediaUrl: string;
    brandWatermarkUrl?: string;
  };
  aPropos: {
    title: string;
    headline: string;
    introParagraph: string;
    featuredImageUrl?: string;
    stats: Array<{ id: string; value: string; label: string }>;
    certifications: Array<{ id: string; title: string; image: string; tag: string }>;
  };
  expertises: {
    mainTitle: string;
    items: Array<{
      id: string;
      slug: string;
      title: string;
      shortDesc: string;
      image: string;
    }>;
  };
  references: {
    mainTitle: string;
    clientCountHeadline: string;
    featuredClients: Array<{ id: string; name: string; logoUrl: string }>;
  };
  actualites: {
    mainTitle: string;
    items: ArticleItem[];
  };
  nousRejoindre: {
    headline: string;
    subheadline: string;
    teamSize: string;
    bannerImageUrl?: string;
  };
  contact: {
    headline: string;
    officeCity: string;
    officeAddress: string;
    telephone: string;
    email: string;
  };
}

export const STOCK_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'stock-logo-catzt',
    name: 'Catzt Official Logo',
    url: '/images/Catzt-logo.png',
    type: 'image',
    size: '120 KB',
    uploadedAt: '2026-01-01T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-intel',
    name: 'Intel Partner Logo',
    url: '/wp-content/uploads/2025/11/Intel-omnicom-logo-client.svg',
    type: 'svg',
    size: '12 KB',
    uploadedAt: '2025-11-01T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-nvidia',
    name: 'Nvidia Partner Logo',
    url: '/wp-content/uploads/2025/11/Nvidia-omnicom-logo-client.svg',
    type: 'svg',
    size: '14 KB',
    uploadedAt: '2025-11-01T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-sap',
    name: 'SAP Partner Logo',
    url: '/wp-content/uploads/2025/11/SAP-omnicom-logo-client.svg',
    type: 'svg',
    size: '10 KB',
    uploadedAt: '2025-11-01T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-bosch',
    name: 'Bosch Partner Logo',
    url: '/wp-content/uploads/2025/11/Bosch-omnicom-logo-client.svg',
    type: 'svg',
    size: '11 KB',
    uploadedAt: '2025-11-01T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-bayer',
    name: 'Bayer Partner Logo',
    url: '/wp-content/uploads/2025/11/Bayer-omnicom-logo-client.svg',
    type: 'svg',
    size: '13 KB',
    uploadedAt: '2025-11-01T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-sanofi',
    name: 'Sanofi Partner Logo',
    url: '/wp-content/uploads/2025/11/Sanofi-omnicom-logo-client.svg',
    type: 'svg',
    size: '15 KB',
    uploadedAt: '2025-11-01T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-label-rse',
    name: 'Label RSE Agences Actives',
    url: '/wp-content/uploads/2026/01/Label-RSE.png',
    type: 'image',
    size: '65 KB',
    uploadedAt: '2026-01-10T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-label-influence',
    name: 'Influence Responsable Badge',
    url: '/wp-content/uploads/2026/01/Label-Influence-Responsable.png',
    type: 'image',
    size: '72 KB',
    uploadedAt: '2026-01-10T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-un-global',
    name: 'UN Global Compact',
    url: '/wp-content/uploads/2026/01/UN-Global-1.png',
    type: 'image',
    size: '58 KB',
    uploadedAt: '2026-01-10T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-exp-intel',
    name: 'Intelligence Stratégique Hero Image',
    url: '/wp-content/uploads/2025/07/image6.jpg',
    type: 'image',
    size: '180 KB',
    uploadedAt: '2025-07-15T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-exp-corp',
    name: 'Corporate & Engagement Hero Image',
    url: '/wp-content/uploads/2025/07/image5.jpg',
    type: 'image',
    size: '195 KB',
    uploadedAt: '2025-07-15T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-exp-crise',
    name: 'Crise & Enjeux Sensibles Image',
    url: '/wp-content/uploads/2025/07/image3.jpg',
    type: 'image',
    size: '210 KB',
    uploadedAt: '2025-07-15T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-exp-affaires',
    name: 'Affaires Publiques Image',
    url: '/wp-content/uploads/2025/07/image2.jpg',
    type: 'image',
    size: '220 KB',
    uploadedAt: '2025-07-15T00:00:00Z',
    isCustom: false,
  },
  {
    id: 'stock-news-thumb',
    name: 'Actualités Thumbnail Cover',
    url: '/wp-content/uploads/2026/01/51e90374-6d77-45c0-aaa7-782e982df077.png',
    type: 'image',
    size: '240 KB',
    uploadedAt: '2026-01-20T00:00:00Z',
    isCustom: false,
  },
];

export const DEFAULT_CMS_CONTENT: CMSContentSchema = {
  meta: {
    lastPublished: new Date().toISOString(),
    version: '1.2.0',
    publishedBy: 'Catzt Admin',
  },
  global: {
    siteTitle: 'Catzt OS — Systemic Control for Multi-Marketplace Operations',
    brandName: 'Catzt OS',
    contactEmail: 'hello@catzt.com',
    contactPhone: '+62 858 7711 1559',
    officeAddress: 'Tangerang, Indonesia',
    cookieBannerText: 'Kami menggunakan cookie penting untuk kenyamanan dan performa navigasi Anda.',
    adminPassword: 'catzt2026',
  },
  pagesSEO: {
    hero: {
      pageName: 'Homepage & Hero 3D',
      metaTitle: 'Catzt Office — Systemic Control for Multi-Marketplace Operations',
      metaDescription: 'Catzt Office is the growth infrastructure and systemic control agency for online sellers and brand leaders.',
      slug: '/',
      ogImage: '/images/Catzt-logo.png',
    },
    aPropos: {
      pageName: 'A Propos',
      metaTitle: 'A Propos — Catzt Office',
      metaDescription: 'Nous sommes une agence conseil en réputation, influence et accélération de croissance e-commerce.',
      slug: '/a-propos/',
      ogImage: '/wp-content/uploads/2026/01/Label-RSE.png',
    },
    expertises: {
      pageName: '8 Expertises',
      metaTitle: '8 Expertises Stratégiques — Catzt Office',
      metaDescription: 'Catzt Office mobilise 8 expertises clefs au service de votre réputation et performance.',
      slug: '/expertises/',
      ogImage: '/wp-content/uploads/2025/07/image6.jpg',
    },
    references: {
      pageName: 'Références & Clients',
      metaTitle: 'Références & Clients — Catzt Office',
      metaDescription: 'Découvrez plus de 90 clients français et internationaux qui font confiance à Catzt Office.',
      slug: '/references/',
      ogImage: '/wp-content/uploads/2025/11/Intel-omnicom-logo-client.svg',
    },
    actualites: {
      pageName: 'Actualités (Articles & Blog)',
      metaTitle: 'Actualités & Publications — Catzt Office',
      metaDescription: 'Découvrez nos dernières annonces, études de cas, articles et réalisations.',
      slug: '/actualites/',
      ogImage: '/wp-content/uploads/2026/01/51e90374-6d77-45c0-aaa7-782e982df077.png',
    },
    nousRejoindre: {
      pageName: 'Nous Rejoindre (Careers)',
      metaTitle: 'Nous Rejoindre — Catzt Office',
      metaDescription: 'Rejoindre Catzt Office, c’est intégrer un collectif de 50 experts engagés.',
      slug: '/nous-rejoindre/',
      ogImage: '/images/Catzt-logo.png',
    },
    contact: {
      pageName: 'Contact & Paris Offices',
      metaTitle: 'Contact & Siège Paris — Catzt Office',
      metaDescription: 'Vous avez une question, un projet ou un enjeu stratégique ? Contactez nos équipes à Paris.',
      slug: '/contact/',
      ogImage: '/images/Catzt-logo.png',
    },
  },
  hero: {
    subtitle: 'Systemic Control',
    headline: 'an office for online sellers',
    ctaPrimaryText: 'A propos',
    ctaPrimaryLink: '/a-propos/',
    ctaSecondaryText: 'Expertises',
    ctaSecondaryLink: '/expertises/',
    backgroundMediaUrl: '/images/Catzt-logo.png',
    brandWatermarkUrl: '/images/Catzt-logo.png',
  },
  aPropos: {
    title: 'A propos',
    headline: 'Nous sommes une agence conseil en réputation et influence.',
    introParagraph: 'La réputation est un puissant moteur de création de valeur capable de générer une croissance durable.',
    featuredImageUrl: '/wp-content/uploads/2025/07/image6.jpg',
    stats: [
      { id: 'stat-1', value: '50+', label: 'Experts engagés' },
      { id: 'stat-2', value: '90+', label: 'Clients français et internationaux' },
      { id: 'stat-3', value: '8', label: 'Pôles d’expertises intégrés' },
    ],
    certifications: [
      { id: 'cert-1', title: 'Label RSE Agences Actives', image: '/wp-content/uploads/2026/01/Label-RSE.png', tag: 'RSE' },
      { id: 'cert-2', title: 'Influence Responsable', image: '/wp-content/uploads/2026/01/Label-Influence-Responsable.png', tag: 'Éthique' },
      { id: 'cert-3', title: 'UN Global Compact', image: '/wp-content/uploads/2026/01/UN-Global-1.png', tag: 'Global' },
    ],
  },
  expertises: {
    mainTitle: 'Catzt OS menyediakan 4 ekosistem modular untuk akselerasi operasional bisnis Anda.',
    items: [
      {
        id: 'exp-1',
        slug: 'office-as-omni-channel',
        title: 'Office as Omni-Channel',
        shortDesc: 'Pusat kendali integrasi multi-channel, inventori terpusat, dan sinkronisasi marketplace secara realtime.',
        image: '/wp-content/uploads/2025/07/image6.jpg',
      },
      {
        id: 'exp-2',
        slug: 'omni-messenger',
        title: 'Omni-Messenger',
        shortDesc: 'Unified live chat multi-marketplace (Shopee, Tokopedia, TikTok), otomatisasi CS AI, dan manajemen pesan terpusat.',
        image: '/wp-content/uploads/2025/07/image5.jpg',
      },
      {
        id: 'exp-3',
        slug: 'zom-as-team-chat',
        title: 'ZOM as Team Chat',
        shortDesc: 'Pusat kolaborasi tim, komunikasi operasional internal, koordinasi staf gudang, dan pembagian tugas cepat.',
        image: '/wp-content/uploads/2025/07/image3.jpg',
      },
      {
        id: 'exp-4',
        slug: 'warehouse-management-system',
        title: 'Warehouse Management System',
        shortDesc: 'WMS modern dengan atomic stock sync, tata kelola rak-bin, picking-packing presisi, dan cetak AWB massal.',
        image: '/wp-content/uploads/2025/07/image4.jpg',
      },
    ],
  },
  references: {
    mainTitle: 'A Paris, plus de 90 clients français et internationaux nous font confiance.',
    clientCountHeadline: '90+ Partenaires Stratégiques',
    featuredClients: [
      { id: 'cli-1', name: 'Intel', logoUrl: '/wp-content/uploads/2025/11/Intel-omnicom-logo-client.svg' },
      { id: 'cli-2', name: 'Nvidia', logoUrl: '/wp-content/uploads/2025/11/Nvidia-omnicom-logo-client.svg' },
      { id: 'cli-3', name: 'SAP', logoUrl: '/wp-content/uploads/2025/11/SAP-omnicom-logo-client.svg' },
      { id: 'cli-4', name: 'Bosch', logoUrl: '/wp-content/uploads/2025/11/Bosch-omnicom-logo-client.svg' },
      { id: 'cli-5', name: 'Bayer', logoUrl: '/wp-content/uploads/2025/11/Bayer-omnicom-logo-client.svg' },
      { id: 'cli-6', name: 'Sanofi', logoUrl: '/wp-content/uploads/2025/11/Sanofi-omnicom-logo-client.svg' },
    ],
  },
  actualites: {
    mainTitle: 'Découvrez nos dernières annonces, articles et réalisations',
    items: [
      {
        id: 'news-1',
        title: 'La réputation s’impose comme un actif stratégique des dirigeants face à l’incertitude',
        slug: 'reputation-actif-strategique-dirigeants-2026',
        category: 'Publications & Insights',
        imageUrl: '/wp-content/uploads/2026/01/51e90374-6d77-45c0-aaa7-782e982df077.png',
        linkUrl: '/actualites/',
        date: '2026-01-20',
        author: 'Catzt Editorial Team',
        excerpt: 'Analyse stratégique sur la valeur intangible des marques et les nouveaux leviers de croissance multi-marketplace.',
        content: 'Dans un contexte d’incertitude économique globale, la réputation et le contrôle systémique des canaux de vente deviennent les piliers essentiels de toute marque leader...',
        status: 'published',
      },
      {
        id: 'news-2',
        title: 'Déploiement de la nouvelle infrastructure de contrôle systémique pour e-commerçants',
        slug: 'deploiement-infrastructure-controle-systemique',
        category: 'Case Study',
        imageUrl: '/wp-content/uploads/2025/07/image6.jpg',
        linkUrl: '/actualites/',
        date: '2026-02-14',
        author: 'Catzt Engineering & Growth',
        excerpt: 'Comment les marques européennes unifient leurs opérations TikTok Shop, Shopee et e-commerce via Catzt Office.',
        content: 'L’unification des opérations marketplace permet de réduire les frictions logistiques et d’automatiser les conversions à grande échelle...',
        status: 'published',
      },
    ],
  },
  nousRejoindre: {
    headline: 'Rejoindre Catzt Office, c’est intégrer un collectif de 50 experts engagés.',
    subheadline: 'Construisons ensemble l’avenir de la réputation de marque.',
    teamSize: '50+',
    bannerImageUrl: '/wp-content/uploads/2025/12/omnicom-nousrejoindre-1.jpg',
  },
  contact: {
    headline: 'Punya pertanyaan atau ingin mendiskusikan kebutuhan operasional bisnis Anda?',
    officeCity: 'Tangerang',
    officeAddress: 'Tangerang, Indonesia',
    telephone: '+62 858 7711 1559',
    email: 'hello@catzt.com',
  },
};

const STORAGE_KEY_PUBLISHED = 'catzt_cms_published_v1';
const STORAGE_KEY_DRAFT = 'catzt_cms_draft_v1';
const STORAGE_KEY_MEDIA = 'catzt_cms_media_assets_v1';
const STORAGE_KEY_AUTH = 'catzt_cms_auth_token_v1';

export class CMSContentStore {
  // --- Content Store & State ---
  static getPublishedContent(): CMSContentSchema {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PUBLISHED);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...DEFAULT_CMS_CONTENT,
          ...parsed,
          pagesSEO: { ...DEFAULT_CMS_CONTENT.pagesSEO, ...(parsed.pagesSEO || {}) },
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_CMS_CONTENT;
  }

  static getDraftContent(): CMSContentSchema {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DRAFT);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...DEFAULT_CMS_CONTENT,
          ...parsed,
          pagesSEO: { ...DEFAULT_CMS_CONTENT.pagesSEO, ...(parsed.pagesSEO || {}) },
        };
      }
    } catch {
      // fallback
    }
    return this.getPublishedContent();
  }

  static saveDraft(content: CMSContentSchema): void {
    try {
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save CMS draft:', e);
    }
  }

  static publish(content: CMSContentSchema): CMSContentSchema {
    const updated: CMSContentSchema = {
      ...content,
      meta: {
        lastPublished: new Date().toISOString(),
        version: `1.${Date.now()}`,
        publishedBy: 'Catzt Admin',
      },
    };
    try {
      localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('catzt-cms-published', { detail: updated }));
    } catch (e) {
      console.error('Failed to publish CMS content:', e);
    }
    return updated;
  }

  static resetToDefault(): CMSContentSchema {
    this.publish(DEFAULT_CMS_CONTENT);
    return DEFAULT_CMS_CONTENT;
  }

  static exportJSON(): string {
    return JSON.stringify(this.getPublishedContent(), null, 2);
  }

  static importJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.hero && parsed.aPropos) {
        this.publish({ ...DEFAULT_CMS_CONTENT, ...parsed });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  }

  // --- Media Asset Registry ---
  static getMediaAssets(): MediaAsset[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MEDIA);
      if (raw) {
        const custom: MediaAsset[] = JSON.parse(raw);
        return [...custom, ...STOCK_MEDIA_ASSETS];
      }
    } catch {
      // fallback
    }
    return STOCK_MEDIA_ASSETS;
  }

  static addMediaAsset(asset: Omit<MediaAsset, 'id' | 'uploadedAt' | 'isCustom'>): MediaAsset {
    const newAsset: MediaAsset = {
      ...asset,
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      uploadedAt: new Date().toISOString(),
      isCustom: true,
    };
    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY_MEDIA);
      const list: MediaAsset[] = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(newAsset);
      localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save uploaded media asset:', e);
    }
    return newAsset;
  }

  static deleteMediaAsset(assetId: string): void {
    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY_MEDIA);
      if (!existingRaw) return;
      const list: MediaAsset[] = JSON.parse(existingRaw);
      const filtered = list.filter((a) => a.id !== assetId);
      localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(filtered));
    } catch (e) {
      console.error('Failed to delete media asset:', e);
    }
  }

  // --- Auth & Access Control ---
  static isAuthenticated(): boolean {
    try {
      const token = sessionStorage.getItem(STORAGE_KEY_AUTH) || localStorage.getItem(STORAGE_KEY_AUTH);
      return !!token && token === 'auth_session_valid_catzt';
    } catch {
      return false;
    }
  }

  static authenticate(passwordAttempt: string, remember = false): boolean {
    const draft = this.getDraftContent();
    const validPassword = draft.global?.adminPassword || 'catzt2026';
    if (passwordAttempt.trim() === validPassword.trim()) {
      const targetStorage = remember ? localStorage : sessionStorage;
      targetStorage.setItem(STORAGE_KEY_AUTH, 'auth_session_valid_catzt');
      return true;
    }
    return false;
  }

  static logout(): void {
    try {
      sessionStorage.removeItem(STORAGE_KEY_AUTH);
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch {
      // ignore
    }
  }
}
