import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Check } from 'lucide-react';

const OWNER_FEATURES = [
  'Files & Media Library', 'Inventory & Stock Planning', 'Brand Core Identity',
  'Moodboards & Banners', 'Post & Story Creator', 'Team Messenger',
  'Basic CRM & Buyers', 'Marketplace Live Sync'
];

const AGENCY_FEATURES = [
  'Multi-Store OS', 'Automated Live Posting', 'Public Web Brandbook',
  'AI Content Assistant', 'Sprint & Order Planner', 'Customer Persona Hub',
  'Staff Knowledge Base', 'Multi-Channel Analytics'
];

export const DualFeatureSection: React.FC = () => {
  return (
    <View style={styles.sectionShell}>
      <View style={styles.grid}>
        {/* Card 1: Brand Owners */}
        <View style={styles.dualCard}>
          <View style={styles.visualWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop' }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.overlayBox}>
              <View style={styles.overlayGrid}>
                {OWNER_FEATURES.map((feat, idx) => (
                  <View key={idx} style={styles.overlayItem}>
                    <View style={styles.chevronIcon}><Check size={12} color="#38bdf8" /></View>
                    <Text style={styles.overlayText}>{feat}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.cardTitle}>For brand owners & sellers</Text>
          <Text style={styles.cardDesc}>
            Build, refine, and manage your brand in one focused workspace, from identity and content to stock, orders, and ongoing store growth.
          </Text>
        </View>

        {/* Card 2: Agencies */}
        <View style={styles.dualCard}>
          <View style={styles.visualWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop' }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.overlayBox}>
              <View style={styles.overlayGrid}>
                {AGENCY_FEATURES.map((feat, idx) => (
                  <View key={idx} style={styles.overlayItem}>
                    <View style={styles.chevronIcon}><Check size={12} color="#818cf8" /></View>
                    <Text style={styles.overlayText}>{feat}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.cardTitle}>Built for agencies & power sellers</Text>
          <Text style={styles.cardDesc}>
            Create and manage distinct store operations for clients while keeping strategy, stock systems, marketing assets, and staff collaboration organized.
          </Text>
        </View>
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
  grid: {
    flexDirection: 'row',
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    gap: 32,
    flexWrap: 'wrap',
  },
  dualCard: {
    flex: 1,
    minWidth: 340,
    backgroundColor: 'rgba(14, 38, 70, 0.5)',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 16,
  },
  visualWrapper: {
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  overlayBox: {
    position: 'absolute' as any,
    inset: 0,
    backgroundColor: 'rgba(7, 27, 52, 0.85)',
    padding: 20,
    justifyContent: 'center',
    // @ts-ignore
    backdropFilter: 'blur(8px)',
  },
  overlayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  overlayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  chevronIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 22,
  },
});
