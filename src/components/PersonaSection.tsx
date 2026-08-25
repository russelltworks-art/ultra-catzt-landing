import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PERSONAS = [
  { id: '01', title: 'Design teams', desc: 'Keep product shots, banner reviews, and brand decisions together from concept to production.' },
  { id: '02', title: 'Content teams', desc: 'Plan video campaigns and social promos with a clear voice while protecting your creative flow.' },
  { id: '03', title: 'Marketing teams', desc: 'Connect sales targets, product launches, ad assets, and store ROAS in one campaign workspace.' },
  { id: '04', title: 'Founders & makers', desc: 'Bring the ideas, financial decisions, and operational tasks behind your next scaling phase together.' },
  { id: '05', title: 'Product & Stock teams', desc: 'Connect inventory strategy, supplier data, and store fulfillment around one direction.' },
  { id: '06', title: 'Agencies & studios', desc: 'Run multi-client e-commerce accounts with full context and more room for high-margin work.' },
];

export const PersonaSection: React.FC = () => {
  return (
    <View style={styles.sectionShell}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.kicker}>BUILT FOR PEOPLE WHO CREATE</Text>
          <Text style={styles.title}>
            Made for brand builders{'\n'}
            who make <Text style={styles.highlightText}>an impact</Text>
          </Text>
          <Text style={styles.subtitle}>
            However your team works, Catzt OS turns scattered e-commerce tools into one clear, shared workspace.
          </Text>
        </View>

        <View style={styles.grid}>
          {PERSONAS.map((p) => (
            <View key={p.id} style={styles.card}>
              <Text style={styles.badgeNumber}>{p.id}</Text>
              <Text style={styles.cardTitle}>{p.title}</Text>
              <Text style={styles.cardDesc}>{p.desc}</Text>
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
    gap: 48,
  },
  header: {
    gap: 14,
  },
  kicker: {
    color: '#38bdf8',
    fontFamily: 'DM Mono, monospace',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '600',
  },
  title: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: '800',
    lineHeight: 48,
    letterSpacing: -1,
  },
  highlightText: {
    color: '#818cf8',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    maxWidth: 600,
    lineHeight: 24,
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
    padding: 28,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
  },
  badgeNumber: {
    color: '#38bdf8',
    fontFamily: 'DM Mono, monospace',
    fontSize: 13,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 20,
  },
});
