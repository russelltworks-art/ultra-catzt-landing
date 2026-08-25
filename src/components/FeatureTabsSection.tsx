import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

interface CardItem {
  title: string;
  desc: string;
  image: string;
}

interface TabCategory {
  id: string;
  label: string;
  cards: CardItem[];
}

const FEATURE_TABS: TabCategory[] = [
  {
    id: 'manage-brands',
    label: 'Manage Brands & Stores',
    cards: [
      {
        title: 'Connected store workspace',
        desc: 'Organize marketplace stores, projects, inventory, and decisions in one focused workspace built around your goals.',
        image: 'https://images.unsplash.com/photo-1556742049-0a67daf64f42?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Shared campaign calendar',
        desc: 'Bring Shopee campaigns, TikTok live schedules, deadlines, and milestones into one shared operational view.',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Google & Cloud Drive sync',
        desc: 'Connect cloud storage to keep assets, invoices, and documents synchronized and accessible to the team.',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Organize Sprints & Stock',
        desc: 'Organize projects, delegate fulfillment tasks, and monitor sales sprints while keeping your whole staff aligned.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'social-media',
    label: 'Social & Live Commerce',
    cards: [
      {
        title: 'Multi-channel campaigns',
        desc: 'Shape TikTok & Shopee live campaigns around one clear brand message and target sales objective.',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Audience insights',
        desc: 'Turn buyer comments and chat signals into relevant creative angles and high-converting offer packages.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Content planning',
        desc: 'Schedule connected posts and video scripts that keep your brand voice recognizable across channels.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Performance snapshots',
        desc: 'Bring sales results, ROAS, and stock depletion into clear real-time updates your team can act on.',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'brand-design',
    label: 'Brand Design',
    cards: [
      {
        title: 'Visual direction',
        desc: 'Upload product photos and generate studio prompts. Define a visual identity your marketing team can use.',
        image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Smart moodboards',
        desc: 'Create product moodboards from reference shots. Generate fitting color palettes automatically.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Brand foundations',
        desc: 'Define colors, typography, guidelines, and packaging rules that keep every customer touchpoint consistent.',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Publish brand kit',
        desc: 'Publish a web brand book to share with external agency partners, influencers, and freelancers.',
        image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=600&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'strategy',
    label: 'Strategy & Growth',
    cards: [
      {
        title: 'E-Commerce strategy',
        desc: 'Define store positioning, profit targets, and hero product focus that give every team member alignment.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Marketplace intelligence',
        desc: 'Turn category research, competitor price shifts, and buyer trends into focused pricing strategy.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Strategic roadmaps',
        desc: 'Build actionable quarterly plans that link store revenue targets with daily warehouse operations.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      },
      {
        title: 'Opportunity mapping',
        desc: 'Identify unserved niches, bundle opportunities, and the next profitable SKU expansion.',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format&fit=crop',
      },
    ],
  },
];

export const FeatureTabsSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState(FEATURE_TABS[0].id);

  const activeTab = FEATURE_TABS.find((t) => t.id === activeTabId) || FEATURE_TABS[0];

  return (
    <View id="features" style={styles.sectionShell}>
      <View style={styles.headerBox}>
        <Text style={styles.sectionTitle}>Clarity that moves every team.</Text>
      </View>

      {/* Tabs Bar */}
      <View style={styles.tabsRow}>
        {FEATURE_TABS.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <Pressable
              key={tab.id}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTabId(tab.id)}
            >
              <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Cards Grid */}
      <View style={styles.gridContainer}>
        {activeTab.cards.map((card, idx) => (
          <View key={idx} style={styles.featureCard}>
            <View style={styles.cardVisualFrame}>
              <Image source={{ uri: card.image }} style={styles.cardImage} resizeMode="cover" />
            </View>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDesc}>{card.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionShell: {
    paddingVertical: 100,
    paddingHorizontal: 28,
    backgroundColor: '#041021',
  },
  headerBox: {
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 36,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tabsRow: {
    flexDirection: 'row',
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    gap: 12,
    marginBottom: 44,
    flexWrap: 'wrap',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(14, 38, 70, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    cursor: 'pointer',
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  tabButtonText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#071b34',
    fontWeight: '700',
  },
  gridContainer: {
    flexDirection: 'row',
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    gap: 24,
    flexWrap: 'wrap',
  },
  featureCard: {
    flex: 1,
    minWidth: 260,
    backgroundColor: 'rgba(14, 38, 70, 0.5)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 14,
  },
  cardVisualFrame: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 20,
  },
});
