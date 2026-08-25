import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { ArrowUpRight, Sparkles, Box, Zap, ShieldCheck, Layers, RefreshCw } from 'lucide-react';
import { UNITS_TOKENS, LiquidCtaButton, UnitPill } from './UnitsDesignSystem';

interface UnitCard {
  id: string;
  title: string;
  category: string;
  tag: string;
  color: string;
  desc: string;
  stats: string;
  image: string;
}

const UNIT_CARDS: UnitCard[] = [
  {
    id: 'wms-unit',
    title: 'WMS Gudang Unit',
    category: 'Fisik & Rak',
    tag: 'Toko & Rak Gudang',
    color: UNITS_TOKENS.colors.purple,
    desc: 'Kelola lokasi rak A-01 hingga A-99, opname cepat dengan kamera barcode, dan potong stok otomatis.',
    stats: '99.9% Presisi Stok',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'omni-unit',
    title: 'Omnichannel Sync Unit',
    category: 'Marketplace API',
    tag: 'Shopee & TikTok Shop',
    color: UNITS_TOKENS.colors.amber,
    desc: 'Hubungkan Toko Shopee dan TikTok Live Anda. Satu perubahan stok di Catzt mengupdate seluruh toko.',
    stats: 'Real-time Webhook',
    image: 'https://images.unsplash.com/photo-1556742049-0a67daf64f42?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'erp-unit',
    title: 'Financial & HPP Unit',
    category: 'Keuangan & Margin',
    tag: 'Untung-Rugi Real',
    color: UNITS_TOKENS.colors.coral,
    desc: 'Hitung modal HPP barang terjual secara presisi. Ketahui keuntungan bersih riil per item setiap transaksi.',
    stats: 'Otomatis Hitung HPP',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'rpg-unit',
    title: 'Retensi RPG Unit',
    category: 'Gamifikasi Warung',
    tag: 'Misi & Poin XP',
    color: UNITS_TOKENS.colors.emerald,
    desc: 'Dapatkan XP, poin, dan naikkan level toko Anda setiap kali menyelesaikan tugas dan audit harian.',
    stats: '7-Hari Streak Active',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
  },
];

export const UnitsStyleLanding: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>(UNIT_CARDS[0].id);

  const activeUnit = UNIT_CARDS.find((u) => u.id === selectedUnit) || UNIT_CARDS[0];

  return (
    <View style={styles.unitsShell}>
      {/* ── UNITS BRAND HEADER ── */}
      <View style={styles.headerBar}>
        <View style={styles.brandGroup}>
          <View style={styles.unitsLogoSquare}>
            <Text style={styles.unitsLogoText}>U</Text>
          </View>
          <Text style={styles.brandTitle}>UNITS <Text style={styles.brandSub}>&bull; CATZT OS</Text></Text>
        </View>

        <View style={styles.navLinks}>
          <Pressable onPress={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Text style={styles.link}>Units Overview</Text>
          </Pressable>
          <Pressable onPress={() => document.getElementById('unit-showcase')?.scrollIntoView({ behavior: 'smooth' })}>
            <Text style={styles.link}>Units Explorer</Text>
          </Pressable>
          <Pressable onPress={() => document.getElementById('units-specs')?.scrollIntoView({ behavior: 'smooth' })}>
            <Text style={styles.link}>Spesifikasi</Text>
          </Pressable>
        </View>

        {/* Liquid Wave Button (Units.gr signature CTA from Design System) */}
        <LiquidCtaButton
          label="Book Your Unit &rarr;"
          color={activeUnit.color}
          onPress={() => window.open('http://localhost:5173', '_blank')}
        />
      </View>

      {/* ── HERO UNITS DISPLAY ── */}
      <View style={styles.heroSection}>
        <View style={styles.kickerPill}>
          <Sparkles size={14} color="#000000" />
          <Text style={styles.kickerPillText}>UNITS DESIGN SYSTEM &bull; CATZT E-COMMERCE</Text>
        </View>

        <Text style={styles.heroHeadline}>
          OUR WAY OF LIVING &{'\n'}
          <Text style={{ color: activeUnit.color }}>MANAGING YOUR UNITS.</Text>
        </Text>

        <Text style={styles.heroDescription}>
          Satu platform modular berbasis Unit untuk mengelola toko, rak gudang, keuntungan HPP, dan performa tim Anda dengan presisi maksimal.
        </Text>

        {/* Units Category Pills from Design System */}
        <View style={styles.unitPillsRow}>
          {UNIT_CARDS.map((unit) => (
            <UnitPill
              key={unit.id}
              label={unit.title}
              color={unit.color}
              isSelected={unit.id === selectedUnit}
              onPress={() => setSelectedUnit(unit.id)}
            />
          ))}
        </View>
      </View>

      {/* ── UNIT SHOWCASE GRID (UNITS.GR STYLE) ── */}
      <View id="unit-showcase" style={styles.showcaseSection}>
        <View style={styles.showcaseHeader}>
          <Text style={styles.showcaseTitle}>Explore Active Units</Text>
          <Text style={styles.showcaseSub}>Pilih unit operasional yang ingin Anda jalankan di toko Anda.</Text>
        </View>

        <View style={styles.gridContainer}>
          {UNIT_CARDS.map((unit) => {
            const isSelected = unit.id === selectedUnit;
            return (
              <Pressable
                key={unit.id}
                style={[
                  styles.unitCard,
                  isSelected && { borderColor: unit.color, borderWidth: 2 },
                ]}
                onPress={() => setSelectedUnit(unit.id)}
              >
                <View style={styles.cardVisualBox}>
                  <Image source={{ uri: unit.image }} style={styles.cardImage} resizeMode="cover" />
                  <View style={[styles.cardTagBadge, { backgroundColor: unit.color }]}>
                    <Text style={styles.cardTagText}>{unit.tag}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardCategory}>{unit.category}</Text>
                  <Text style={styles.cardTitle}>{unit.title}</Text>
                  <Text style={styles.cardDesc}>{unit.desc}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={[styles.cardStats, { color: unit.color }]}>{unit.stats}</Text>
                    <ArrowUpRight size={18} color="#ffffff" />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* ── UNITS SPECIFICATIONS ── */}
      <View id="units-specs" style={styles.specsSection}>
        <View style={styles.specsCard}>
          <Text style={styles.specsTitle}>Spesifikasi Unit Terpilih: {activeUnit.title}</Text>
          <Text style={styles.specsDesc}>{activeUnit.desc}</Text>

          <View style={styles.specsRow}>
            <View style={styles.specBox}>
              <Box size={20} color={activeUnit.color} />
              <Text style={styles.specLabel}>Modul Kategori</Text>
              <Text style={styles.specVal}>{activeUnit.category}</Text>
            </View>
            <View style={styles.specBox}>
              <Zap size={20} color={activeUnit.color} />
              <Text style={styles.specLabel}>Metrik Utama</Text>
              <Text style={styles.specVal}>{activeUnit.stats}</Text>
            </View>
            <View style={styles.specBox}>
              <ShieldCheck size={20} color={activeUnit.color} />
              <Text style={styles.specLabel}>Keamanan</Text>
              <Text style={styles.specVal}>Enterprise RLS Parity</Text>
            </View>
          </View>

          <LiquidCtaButton
            label="Aktifkan Unit Ini Sekarang &rarr;"
            color={activeUnit.color}
            onPress={() => window.open('http://localhost:5173', '_blank')}
            style={{ alignSelf: 'flex-start' }}
          />
        </View>
      </View>

      {/* ── UNITS FOOTER ── */}
      <View style={styles.unitsFooter}>
        <Text style={styles.footerText}>&copy; {new Date().getFullYear()} Units.gr Inspired &bull; Catzt Office OS</Text>
        <Text style={styles.footerLink}>units.gr &bull; catzt.app</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  unitsShell: {
    backgroundColor: UNITS_TOKENS.colors.bg,
    minHeight: '100vh' as any,
    color: UNITS_TOKENS.colors.textPrimary,
    paddingBottom: UNITS_TOKENS.spacing.xl,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: UNITS_TOKENS.spacing.md,
    paddingHorizontal: UNITS_TOKENS.spacing.xl,
    backgroundColor: 'rgba(10, 10, 12, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: UNITS_TOKENS.colors.border,
    position: 'sticky' as any,
    top: 0,
    zIndex: 100,
    // @ts-ignore
    backdropFilter: 'blur(16px)',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  unitsLogoSquare: {
    width: 36,
    height: 36,
    borderRadius: UNITS_TOKENS.radius.sm,
    backgroundColor: UNITS_TOKENS.colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitsLogoText: {
    color: UNITS_TOKENS.colors.textDark,
    fontSize: 22,
    fontWeight: '900',
  },
  brandTitle: {
    color: UNITS_TOKENS.colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  brandSub: {
    color: UNITS_TOKENS.colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 32,
  },
  link: {
    color: UNITS_TOKENS.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    cursor: 'pointer',
  },

  heroSection: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: UNITS_TOKENS.spacing.xl,
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: 1000,
    alignSelf: 'center',
    gap: 24,
  },
  kickerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: UNITS_TOKENS.colors.textPrimary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: UNITS_TOKENS.radius.card,
  },
  kickerPillText: {
    color: UNITS_TOKENS.colors.textDark,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: UNITS_TOKENS.typography.fontMono,
  },
  heroHeadline: {
    color: UNITS_TOKENS.colors.textPrimary,
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 60,
    textAlign: 'center',
    letterSpacing: -1,
  },
  heroDescription: {
    color: UNITS_TOKENS.colors.textSecondary,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    maxWidth: 680,
  },
  unitPillsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  showcaseSection: {
    paddingVertical: 60,
    paddingHorizontal: UNITS_TOKENS.spacing.xl,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    gap: 32,
  },
  showcaseHeader: {
    gap: 8,
  },
  showcaseTitle: {
    color: UNITS_TOKENS.colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
  },
  showcaseSub: {
    color: UNITS_TOKENS.colors.textSecondary,
    fontSize: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  unitCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: UNITS_TOKENS.colors.surface,
    borderRadius: UNITS_TOKENS.radius.card,
    borderWidth: 1,
    borderColor: UNITS_TOKENS.colors.border,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  cardVisualBox: {
    height: 180,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTagBadge: {
    position: 'absolute' as any,
    top: 12,
    left: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: UNITS_TOKENS.radius.box,
  },
  cardTagText: {
    color: UNITS_TOKENS.colors.textDark,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: UNITS_TOKENS.typography.fontMono,
  },
  cardContent: {
    padding: 20,
    gap: 10,
  },
  cardCategory: {
    color: UNITS_TOKENS.colors.textSecondary,
    fontSize: 11,
    fontFamily: UNITS_TOKENS.typography.fontMono,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: UNITS_TOKENS.colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  cardDesc: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: UNITS_TOKENS.colors.border,
  },
  cardStats: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: UNITS_TOKENS.typography.fontMono,
  },

  specsSection: {
    paddingVertical: 40,
    paddingHorizontal: UNITS_TOKENS.spacing.xl,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  specsCard: {
    backgroundColor: UNITS_TOKENS.colors.surface,
    borderRadius: UNITS_TOKENS.radius.card,
    padding: 36,
    borderWidth: 1,
    borderColor: UNITS_TOKENS.colors.borderActive,
    gap: 20,
  },
  specsTitle: {
    color: UNITS_TOKENS.colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  specsDesc: {
    color: UNITS_TOKENS.colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  specsRow: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    marginVertical: 12,
  },
  specBox: {
    flex: 1,
    minWidth: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    borderRadius: UNITS_TOKENS.radius.box,
    borderWidth: 1,
    borderColor: UNITS_TOKENS.colors.border,
    gap: 8,
  },
  specLabel: {
    color: UNITS_TOKENS.colors.textSecondary,
    fontSize: 12,
  },
  specVal: {
    color: UNITS_TOKENS.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },

  unitsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: UNITS_TOKENS.spacing.lg,
    paddingHorizontal: UNITS_TOKENS.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: UNITS_TOKENS.colors.border,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  footerText: {
    color: UNITS_TOKENS.colors.textMuted,
    fontSize: 13,
  },
  footerLink: {
    color: UNITS_TOKENS.colors.textSecondary,
    fontSize: 13,
  },
});
