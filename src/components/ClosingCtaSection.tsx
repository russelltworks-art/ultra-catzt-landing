import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ArrowRight } from 'lucide-react';

export const ClosingCtaSection: React.FC = () => {
  return (
    <View style={styles.sectionShell}>
      {/* Background Glow Orb */}
      <View style={styles.glowingOrb} />

      <View style={styles.contentContainer}>
        <Text style={styles.kicker}>THE NEXT WAY TO WORK</Text>
        <Text style={styles.title}>
          Make space{'\n'}
          for <Text style={styles.highlightText}>great work.</Text>
        </Text>

        <Text style={styles.subtitle}>
          Catzt OS is being shaped with top e-commerce sellers and ambitious brand teams. Join early and build a calmer operating system for your stores.
        </Text>

        <Pressable
          style={styles.ctaButton}
          onPress={() => window.open('https://catzt.app', '_blank')}
        >
          <Text style={styles.ctaButtonText}>Start Building Now</Text>
          <ArrowRight size={18} color="#071b34" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionShell: {
    paddingVertical: 140,
    paddingHorizontal: 28,
    backgroundColor: '#071b34',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowingOrb: {
    position: 'absolute' as any,
    top: '20%' as any,
    alignSelf: 'center',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    // @ts-ignore
    filter: 'blur(120px)',
  },
  contentContainer: {
    maxWidth: 720,
    alignItems: 'center',
    textAlign: 'center',
    gap: 20,
    zIndex: 2,
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
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 56,
    letterSpacing: -1,
    textAlign: 'center',
  },
  highlightText: {
    color: '#818cf8',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#38bdf8',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    cursor: 'pointer',
  },
  ctaButtonText: {
    color: '#071b34',
    fontSize: 16,
    fontWeight: '800',
  },
});
