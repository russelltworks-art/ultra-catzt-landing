import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { ArrowUpRight, Plus, Pause, Play, Sparkles, CheckCircle2 } from 'lucide-react';

interface AccordionItem {
  id: number;
  title: string;
  desc: string;
  image: string;
  badge: string;
}

const ACCORDION_ITEMS: AccordionItem[] = [
  {
    id: 0,
    title: 'HITUNG UNTUNG-RUGI PER BARANG',
    desc: 'Bukan cuma omzet kotor. Catzt menghitung modal HPP tiap barang secara otomatis, sehingga Anda tahu produk mana yang benar-benar memberi keuntungan.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop',
    badge: 'Kalkulasi HPP Real-time',
  },
  {
    id: 1,
    title: 'PENCATATAN OTOMATIS & FOTO BARANG',
    desc: 'Cukup foto produk atau scan barcode. Stok dan harga beli tercatat langsung tanpa ketik manual satu per satu.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67daf64f42?q=80&w=1000&auto=format&fit=crop',
    badge: 'Scan Barcode & Kamera',
  },
  {
    id: 2,
    title: 'MISI HARIAN & GAMIFIKASI RPG',
    desc: 'Pencatatan warung jadi tidak membosankan! Dapatkan XP, poin, dan naikkan level toko Anda setiap kali menyelesaikan tugas harian.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
    badge: 'Catzt RPG Leveling System',
  },
];

export const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const intervalMs = 50;
    const totalMs = 4000;
    const increment = (intervalMs / totalMs) * 100;

    const timer = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIdx) => (prevIdx + 1) % ACCORDION_ITEMS.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  const handleSelectTab = (index: number) => {
    setActiveIndex(index);
    setTimerProgress(0);
  };

  return (
    <View style={styles.heroShell}>
      {/* Background Gradient & Glow Orbs */}
      <View style={styles.glowOrbTopLeft} />
      <View style={styles.glowOrbRight} />

      <View style={styles.heroGrid}>
        {/* Left Side: Headline & Orbit Visual */}
        <View style={styles.mainCopyContainer}>
          <View style={styles.kickerBadge}>
            <Sparkles size={14} color="#38bdf8" />
            <Text style={styles.kickerText}>CATZT OFFICE &bull; OPERATING SYSTEM WARUNG & RETEL</Text>
          </View>

          <Text style={styles.heroTitle}>
            Warungmu laku.{'\n'}
            <Text style={styles.heroTitleGradient}>Tapi untungnya berapa?</Text>
          </Text>

          <Text style={styles.heroSubtext}>
            Ramai belum tentu untung. Catzt mencatat stok dan jualanmu, lalu menghitung untung-rugi <Text style={styles.boldSub}>per barang secara otomatis</Text>. Cukup foto atau scan barangnya.
          </Text>

          {/* Trust points */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <CheckCircle2 size={15} color="#38bdf8" />
              <Text style={styles.trustText}>Gratis 50 Barang Pertama</Text>
            </View>
            <View style={styles.trustItem}>
              <CheckCircle2 size={15} color="#38bdf8" />
              <Text style={styles.trustText}>Tanpa Kartu Kredit</Text>
            </View>
            <View style={styles.trustItem}>
              <CheckCircle2 size={15} color="#38bdf8" />
              <Text style={styles.trustText}>Jalan Saat Sinyal Hilang</Text>
            </View>
          </View>

          {/* Orbit Interactive Visual */}
          <View style={styles.orbitVisualContainer}>
            {/* Rotating Outer Ring */}
            <View style={[styles.orbitRingOuter, { className: 'animate-spin-slow' } as any]} />
            {/* Rotating Inner Ring */}
            <View style={[styles.orbitRingInner, { className: 'animate-spin-reverse' } as any]} />

            {/* Orbit Core */}
            <View style={styles.orbitCore}>
              <Text style={styles.coreCatIcon}>🐱</Text>
              <View style={[styles.coreDot, styles.coreDotTop]} />
              <View style={[styles.coreDot, styles.coreDotRight]} />
              <View style={[styles.coreDot, styles.coreDotBottom]} />
              <View style={[styles.coreDot, styles.coreDotLeft]} />
            </View>

            {/* Floating Invite / Order Card */}
            <View style={[styles.floatingCard, { className: 'animate-float-1' } as any]}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>📈</Text>
              </View>
              <View>
                <Text style={styles.floatingCardTitle}>Indomie Goreng (40 pcs)</Text>
                <Text style={styles.floatingCardSub}>Untung Bersih: +Rp 16.000</Text>
              </View>
            </View>

            {/* Floating Action Chips */}
            <Pressable style={[styles.chipButton, styles.chipTop, { className: 'animate-float-2' } as any]}>
              <View style={styles.chipPlus}><Plus size={12} color="#ffffff" /></View>
              <Text style={styles.chipLabel}>CEK UNTUNG</Text>
            </Pressable>

            <Pressable style={[styles.chipButton, styles.chipRight, { className: 'animate-float-3' } as any]}>
              <View style={styles.chipPlus}><Plus size={12} color="#ffffff" /></View>
              <Text style={styles.chipLabel}>AUTO STOK</Text>
            </Pressable>

            <Pressable style={[styles.chipButton, styles.chipBottom, { className: 'animate-float-1' } as any]}>
              <View style={styles.chipPlus}><Plus size={12} color="#ffffff" /></View>
              <Text style={styles.chipLabel}>CATAT BON</Text>
            </Pressable>
          </View>
        </View>

        {/* Right Side: Description & Auto Accordion */}
        <View style={styles.sideContainer}>
          <Text style={styles.sideSubtitle}>
            SATU SYSTEM UNTUK PENCATATAN RIEL, KEUNTUNGAN KELUAR-MASUK, DAN RETENSI HARIAN WARUNG.
          </Text>

          {/* Accordion Items */}
          <View style={styles.accordionGroup}>
            {ACCORDION_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <View key={item.id} style={[styles.accordionCard, isActive && styles.accordionCardActive]}>
                  <Pressable style={styles.accordionHeader} onPress={() => handleSelectTab(idx)}>
                    <Text style={[styles.accordionTitle, isActive && styles.accordionTitleActive]}>
                      {item.title}
                    </Text>

                    <Pressable
                      style={styles.actionControlBtn}
                      onPress={(e) => {
                        e.stopPropagation();
                        setIsPaused(!isPaused);
                      }}
                    >
                      {isActive && !isPaused ? (
                        <Pause size={14} color="#38bdf8" />
                      ) : (
                        <Play size={14} color="#94a3b8" />
                      )}
                    </Pressable>
                  </Pressable>

                  {/* Progress Line */}
                  {isActive && (
                    <View style={styles.progressLineTrack}>
                      <View style={[styles.progressLineFill, { width: `${timerProgress}%` }]} />
                    </View>
                  )}

                  {/* Content Area */}
                  {isActive && (
                    <View style={styles.accordionContent}>
                      <Text style={styles.accordionDesc}>{item.desc}</Text>
                      <View style={styles.imagePreviewContainer}>
                        <Image source={{ uri: item.image }} style={styles.previewImage} resizeMode="cover" />
                        <View style={styles.imageBadge}>
                          <Text style={styles.badgeText}>{item.badge}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Documentation Button */}
          <Pressable style={styles.docsLinkButton} onPress={() => window.open('http://localhost:5173', '_blank')}>
            <Text style={styles.docsLinkText}>Buka Dashboard Catzt ERP</Text>
            <ArrowUpRight size={16} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroShell: {
    paddingTop: 110,
    paddingBottom: 80,
    paddingHorizontal: 28,
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh' as any,
    justifyContent: 'center',
  },
  glowOrbTopLeft: {
    position: 'absolute' as any,
    top: -100,
    left: -100,
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: 'rgba(56, 189, 248, 0.14)',
    // @ts-ignore
    filter: 'blur(110px)',
  },
  glowOrbRight: {
    position: 'absolute' as any,
    top: '30%' as any,
    right: -100,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: 'rgba(129, 140, 248, 0.12)',
    // @ts-ignore
    filter: 'blur(120px)',
  },
  heroGrid: {
    flexDirection: 'row',
    gap: 48,
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  mainCopyContainer: {
    flex: 1,
    minWidth: 320,
  },
  kickerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  kickerText: {
    color: '#38bdf8',
    fontFamily: 'DM Mono, monospace',
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 44,
    fontWeight: '800',
    lineHeight: 52,
    letterSpacing: -1,
  },
  heroTitleGradient: {
    color: '#38bdf8',
    // @ts-ignore
    backgroundImage: 'linear-gradient(90deg, #38bdf8, #818cf8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtext: {
    color: '#94a3b8',
    fontSize: 16,
    lineHeight: 26,
    marginTop: 16,
    maxWidth: 540,
  },
  boldSub: {
    color: '#ffffff',
    fontWeight: '700',
  },
  trustRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 18,
    flexWrap: 'wrap',
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '600',
  },

  orbitVisualContainer: {
    marginTop: 36,
    width: '100%',
    height: 340,
    borderRadius: 24,
    backgroundColor: 'rgba(14, 38, 70, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  orbitRingOuter: {
    position: 'absolute' as any,
    width: 270,
    height: 270,
    borderRadius: 135,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    borderStyle: 'dashed' as any,
  },
  orbitRingInner: {
    position: 'absolute' as any,
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.3)',
  },
  orbitCore: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(56, 189, 248, 0.18)',
    borderWidth: 2,
    borderColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  coreCatIcon: {
    fontSize: 26,
  },
  coreDot: {
    position: 'absolute' as any,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38bdf8',
  },
  coreDotTop: { top: -12, alignSelf: 'center' },
  coreDotRight: { right: -12, top: '45%' as any },
  coreDotBottom: { bottom: -12, alignSelf: 'center' },
  coreDotLeft: { left: -12, top: '45%' as any },

  floatingCard: {
    position: 'absolute' as any,
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(7, 27, 52, 0.92)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
  },
  floatingCardTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  floatingCardSub: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '700',
  },

  chipButton: {
    position: 'absolute' as any,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(22, 54, 96, 0.88)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    cursor: 'pointer',
  },
  chipTop: { top: 28, left: 28 },
  chipRight: { top: 50, right: 28 },
  chipBottom: { bottom: 32, right: 32 },
  chipPlus: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipLabel: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'DM Mono, monospace',
    letterSpacing: 1,
  },

  sideContainer: {
    flex: 1,
    minWidth: 320,
    gap: 28,
  },
  sideSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: 20,
    fontFamily: 'DM Mono, monospace',
  },
  accordionGroup: {
    gap: 16,
  },
  accordionCard: {
    backgroundColor: 'rgba(14, 38, 70, 0.5)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  accordionCardActive: {
    borderColor: 'rgba(56, 189, 248, 0.4)',
    backgroundColor: 'rgba(22, 54, 96, 0.7)',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    cursor: 'pointer',
  },
  accordionTitle: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
  },
  accordionTitleActive: {
    color: '#ffffff',
  },
  actionControlBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLineTrack: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  progressLineFill: {
    height: '100%',
    backgroundColor: '#38bdf8',
  },
  accordionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  accordionDesc: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 20,
  },
  imagePreviewContainer: {
    height: 170,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute' as any,
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(7, 27, 52, 0.85)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
  },
  badgeText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'DM Mono, monospace',
  },
  docsLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    cursor: 'pointer',
  },
  docsLinkText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
