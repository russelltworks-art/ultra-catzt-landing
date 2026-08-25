/**
 * Catzt CMS Content Store & Schema
 * Manages full live state, drafts, publish pipeline, and hydration payload
 */

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
  };
  hero: {
    subtitle: string;
    headline: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
  };
  aPropos: {
    title: string;
    headline: string;
    introParagraph: string;
    stats: Array<{ value: string; label: string }>;
    certifications: Array<{ title: string; image: string; tag: string }>;
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
    featuredClients: Array<{ name: string; logoUrl: string }>;
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
  };
}

export const DEFAULT_CMS_CONTENT: CMSContentSchema = {
  meta: {
    lastPublished: new Date().toISOString(),
    version: '1.0.0',
    publishedBy: 'Catzt Admin',
  },
  global: {
    siteTitle: 'Catzt Office — Systemic Control for Multi-Marketplace Operations',
    brandName: 'Catzt Office',
    contactEmail: 'contact@catztoffice.com',
    contactPhone: '+33 (0)1 53 32 60 00',
    officeAddress: '73-75 rue la Condamine, 75017 Paris',
    cookieBannerText: 'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.',
  },
  hero: {
    subtitle: 'Systemic Control',
    headline: 'an office for online sellers',
    ctaPrimaryText: 'A propos',
    ctaPrimaryLink: '/a-propos/',
    ctaSecondaryText: 'Expertises',
    ctaSecondaryLink: '/expertises/',
  },
  aPropos: {
    title: 'A propos',
    headline: 'Nous sommes une agence conseil en réputation et influence.',
    introParagraph: 'La réputation est un puissant moteur de création de valeur capable de générer une croissance durable.',
    stats: [
      { value: '50+', label: 'Experts engagés' },
      { value: '90+', label: 'Clients français et internationaux' },
      { value: '8', label: 'Pôles d’expertises intégrés' },
    ],
    certifications: [
      { title: 'Label RSE Agences Actives', image: '/wp-content/uploads/2026/01/Label-RSE.png', tag: 'RSE' },
      { title: 'Influence Responsable', image: '/wp-content/uploads/2026/01/Label-Influence-Responsable.png', tag: 'Éthique' },
      { title: 'UN Global Compact', image: '/wp-content/uploads/2026/01/UN-Global-1.png', tag: 'Global' },
    ],
  },
  expertises: {
    mainTitle: 'Catzt Office mobilise 8 expertises clefs au service de votre réputation.',
    items: [
      {
        id: '1',
        slug: 'intelligence-strategique',
        title: 'Intelligence stratégique',
        shortDesc: 'Veille, analyse des signaux faibles et cartographie des parties prenantes.',
        image: '/wp-content/uploads/2025/07/image6.jpg',
      },
      {
        id: '2',
        slug: 'corporate-engagement',
        title: 'Corporate & Engagement',
        shortDesc: 'Positionnement de marque employeur et engagement sociétal.',
        image: '/wp-content/uploads/2025/07/image5.jpg',
      },
      {
        id: '3',
        slug: 'crise',
        title: 'Crise & Enjeux sensibles',
        shortDesc: 'Préparation, simulation et gestion opérationnelle des crises de réputation.',
        image: '/wp-content/uploads/2025/07/image3.jpg',
      },
      {
        id: '4',
        slug: 'affaires-publiques',
        title: 'Affaires publiques',
        shortDesc: 'Relations institutionnelles, plaidoyer et analyse réglementaire.',
        image: '/wp-content/uploads/2025/07/image2.jpg',
      },
      {
        id: '5',
        slug: 'communication-de-marque',
        title: 'Communication de marque',
        shortDesc: 'Création de récits de marque mémorables et activation multicanale.',
        image: '/wp-content/uploads/2025/07/image4.jpg',
      },
      {
        id: '6',
        slug: 'digital-social-media',
        title: 'Influence marketing & social media',
        shortDesc: 'Stratégies social media, relations créateurs et campagnes d’influence.',
        image: '/wp-content/uploads/2025/07/image7.jpg',
      },
      {
        id: '7',
        slug: 'coordination-internationale',
        title: 'Coordination internationale',
        shortDesc: 'Pilotage de campagnes paneuropéennes et déploiement mondial.',
        image: '/wp-content/uploads/2025/07/image8.jpg',
      },
      {
        id: '8',
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
      { name: 'Intel', logoUrl: '/wp-content/uploads/2025/11/Intel-omnicom-logo-client.svg' },
      { name: 'Nvidia', logoUrl: '/wp-content/uploads/2025/11/Nvidia-omnicom-logo-client.svg' },
      { name: 'SAP', logoUrl: '/wp-content/uploads/2025/11/SAP-omnicom-logo-client.svg' },
      { name: 'Bosch', logoUrl: '/wp-content/uploads/2025/11/Bosch-omnicom-logo-client.svg' },
      { name: 'Bayer', logoUrl: '/wp-content/uploads/2025/11/Bayer-omnicom-logo-client.svg' },
      { name: 'Sanofi', logoUrl: '/wp-content/uploads/2025/11/Sanofi-omnicom-logo-client.svg' },
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
  },
};

const STORAGE_KEY_PUBLISHED = 'catzt_cms_published_v1';
const STORAGE_KEY_DRAFT = 'catzt_cms_draft_v1';

export class CMSContentStore {
  static getPublishedContent(): CMSContentSchema {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PUBLISHED);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return DEFAULT_CMS_CONTENT;
  }

  static getDraftContent(): CMSContentSchema {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DRAFT);
      if (raw) return JSON.parse(raw);
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
        this.publish(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  }
}
