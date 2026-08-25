/**
 * Catzt CMS Content Store & Schema
 * Manages full live state, drafts, publish pipeline, media asset library, and admin auth session
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
  hero: {
    subtitle: string;
    headline: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
    backgroundMediaUrl?: string;
  };
  aPropos: {
    title: string;
    headline: string;
    introParagraph: string;
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
    items: Array<{
      id: string;
      title: string;
      category: string;
      imageUrl: string;
      linkUrl: string;
      date?: string;
    }>;
  };
  nousRejoindre: {
    headline: string;
    subheadline: string;
    teamSize: string;
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
    version: '1.0.0',
    publishedBy: 'Catzt Admin',
  },
  global: {
    siteTitle: 'Catzt OS',
    brandName: 'Catzt OS',
    contactEmail: 'contact@catztoffice.com',
    contactPhone: '+33 (0)1 53 32 60 00',
    officeAddress: '73-75 rue la Condamine, 75017 Paris',
    cookieBannerText: 'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.',
    adminPassword: 'catzt2026',
  },
  hero: {
    subtitle: 'Systemic Control',
    headline: 'an office for online sellers',
    ctaPrimaryText: 'A propos',
    ctaPrimaryLink: '/a-propos/',
    ctaSecondaryText: 'Expertises',
    ctaSecondaryLink: '/expertises/',
    backgroundMediaUrl: '/images/Catzt-logo.png',
  },
  aPropos: {
    title: 'A propos',
    headline: 'Nous sommes une agence conseil en réputation et influence.',
    introParagraph: 'La réputation est un puissant moteur de création de valeur capable de générer une croissance durable.',
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
    mainTitle: 'Catzt Office mobilise 8 expertises clefs au service de votre réputation.',
    items: [
      {
        id: 'exp-1',
        slug: 'intelligence-strategique',
        title: 'Intelligence stratégique',
        shortDesc: 'Veille, analyse des signaux faibles et cartographie des parties prenantes.',
        image: '/wp-content/uploads/2025/07/image6.jpg',
      },
      {
        id: 'exp-2',
        slug: 'corporate-engagement',
        title: 'Corporate & Engagement',
        shortDesc: 'Positionnement de marque employeur et engagement sociétal.',
        image: '/wp-content/uploads/2025/07/image5.jpg',
      },
      {
        id: 'exp-3',
        slug: 'crise',
        title: 'Crise & Enjeux sensibles',
        shortDesc: 'Préparation, simulation et gestion opérationnelle des crises de réputation.',
        image: '/wp-content/uploads/2025/07/image3.jpg',
      },
      {
        id: 'exp-4',
        slug: 'affaires-publiques',
        title: 'Affaires publiques',
        shortDesc: 'Relations institutionnelles, plaidoyer et analyse réglementaire.',
        image: '/wp-content/uploads/2025/07/image2.jpg',
      },
      {
        id: 'exp-5',
        slug: 'communication-de-marque',
        title: 'Communication de marque',
        shortDesc: 'Création de récits de marque mémorables et activation multicanale.',
        image: '/wp-content/uploads/2025/07/image4.jpg',
      },
      {
        id: 'exp-6',
        slug: 'digital-social-media',
        title: 'Influence marketing & social media',
        shortDesc: 'Stratégies social media, relations créateurs et campagnes d’influence.',
        image: '/wp-content/uploads/2025/07/image7.jpg',
      },
      {
        id: 'exp-7',
        slug: 'coordination-internationale',
        title: 'Coordination internationale',
        shortDesc: 'Pilotage de campagnes paneuropéennes et déploiement mondial.',
        image: '/wp-content/uploads/2025/07/image8.jpg',
      },
      {
        id: 'exp-8',
        slug: 'communication-financiere',
        title: 'Communication financière',
        shortDesc: 'Opérations de marché, fusions-acquisitions et relations investisseurs.',
        image: '/wp-content/uploads/2025/07/image.jpg',
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
    mainTitle: 'Découvrez nos dernières annonces et réalisations',
    items: [
      {
        id: 'news-1',
        title: 'La réputation s’impose comme un actif stratégique des dirigeants face à l’incertitude',
        category: 'News',
        imageUrl: '/wp-content/uploads/2026/01/51e90374-6d77-45c0-aaa7-782e982df077.png',
        linkUrl: '/actualites/',
        date: '2026',
      },
    ],
  },
  nousRejoindre: {
    headline: 'Rejoindre Catzt Office, c’est intégrer un collectif de 50 experts engagés.',
    subheadline: 'Construisons ensemble l’avenir de la réputation de marque.',
    teamSize: '50+',
  },
  contact: {
    headline: 'Vous avez une question, un projet ou un enjeu stratégique ?',
    officeCity: 'Paris',
    officeAddress: '73-75 rue la Condamine, 75017 Paris',
    telephone: '+33 (0)1 53 32 60 00',
    email: 'contact@catztoffice.com',
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
        return { ...DEFAULT_CMS_CONTENT, ...parsed };
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
        return { ...DEFAULT_CMS_CONTENT, ...parsed };
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
