import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ArrowUpRight, Menu, X, Cat } from 'lucide-react';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.header}>
      {/* Brand Logo */}
      <Pressable style={styles.brand} onPress={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <View style={styles.logoIconBg}>
          <Cat size={22} color="#071b34" />
        </View>
        <Text style={styles.brandText}>CATZT<Text style={styles.brandSub}>OS</Text></Text>
      </Pressable>

      {/* Desktop Navigation */}
      <View style={styles.desktopNav}>
        <Pressable onPress={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Text style={[styles.navLink, styles.activeNavLink]}>Overview</Text>
        </Pressable>
        <Pressable onPress={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
          <Text style={styles.navLink}>Features</Text>
        </Pressable>
        <Pressable onPress={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}>
          <Text style={styles.navLink}>Why Catzt</Text>
        </Pressable>
        <Pressable onPress={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>
          <Text style={styles.navLink}>FAQ</Text>
        </Pressable>
        <Pressable onPress={() => window.open('https://catzt.app/docs', '_blank')}>
          <Text style={styles.navLink}>Docs</Text>
        </Pressable>
      </View>

      {/* CTA Button */}
      <View style={styles.ctaWrapper}>
        <Pressable style={styles.appButton} onPress={() => window.open('https://catzt.app', '_blank')}>
          <Text style={styles.appButtonText}>Open App</Text>
          <View style={styles.arrowIcon}>
            <ArrowUpRight size={14} color="#071b34" />
          </View>
        </Pressable>

        {/* Mobile Toggle */}
        <Pressable style={styles.mobileMenuToggle} onPress={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} color="#ffffff" /> : <Menu size={24} color="#ffffff" />}
        </Pressable>
      </View>

      {/* Mobile Nav Overlay */}
      {menuOpen && (
        <View style={styles.mobileNavOverlay}>
          <Pressable onPress={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <Text style={styles.mobileNavLink}>Overview</Text>
          </Pressable>
          <Pressable onPress={() => { setMenuOpen(false); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <Text style={styles.mobileNavLink}>Features</Text>
          </Pressable>
          <Pressable onPress={() => { setMenuOpen(false); document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <Text style={styles.mobileNavLink}>Why Catzt</Text>
          </Pressable>
          <Pressable onPress={() => { setMenuOpen(false); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <Text style={styles.mobileNavLink}>FAQ</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    backgroundColor: 'rgba(7, 27, 52, 0.85)',
    // @ts-ignore
    backdropFilter: 'blur(12px)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    zIndex: 1000,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  },
  logoIconBg: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  brandSub: {
    color: '#38bdf8',
    fontWeight: '400',
  },
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    // @ts-ignore
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  navLink: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  activeNavLink: {
    color: '#ffffff',
    fontWeight: '700',
  },
  ctaWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
    cursor: 'pointer',
  },
  appButtonText: {
    color: '#071b34',
    fontSize: 13,
    fontWeight: '700',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileMenuToggle: {
    padding: 6,
    // @ts-ignore
    '@media (min-width: 769px)': {
      display: 'none',
    },
  },
  mobileNavOverlay: {
    position: 'absolute' as any,
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: '#071b34',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    gap: 20,
  },
  mobileNavLink: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
