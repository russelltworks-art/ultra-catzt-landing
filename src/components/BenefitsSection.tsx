import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BENEFITS = [
  {
    title: '40% more focused',
    desc: 'Move from product idea to marketplace dispatch with clear priorities and zero context loss.',
  },
  {
    title: 'One connected OS',
    desc: 'Bring brand strategy, store inventory, sales content, and staff knowledge into one system.',
  },
  {
    title: 'Ship with confidence',
    desc: 'Keep every promotional decision tied to store inventory and stock capacity from day one.',
  },
  {
    title: 'Google & Marketplace sync',
    desc: 'Stay in sync with Google Drive, Calendar, Shopee, and TikTok across files and stock counts.',
  },
  {
    title: 'Analyze what matters',
    desc: 'Turn multi-store sales activity and live chat signals into insights your staff can act on.',
  },
  {
    title: 'Manage your assets',
    desc: 'Keep raw media, promo banners, guidelines, and SKU assets organized and easy to find.',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <View id="benefits" style={styles.sectionShell}>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>What you get</Text>

        <View style={styles.grid}>
          {BENEFITS.map((item, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionShell: {
    paddingVertical: 100,
    paddingHorizontal: 28,
    backgroundColor: '#071b34',
  },
  contentContainer: {
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    gap: 40,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  grid: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    minWidth: 320,
    backgroundColor: 'rgba(14, 38, 70, 0.4)',
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 22,
  },
});
