import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Flame, Bell, Zap, Star, Package, ShoppingBag, ArrowUpRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const CatztDesktopPrototype: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stok' | 'piutang' | 'laporan' | 'koin'>('stok');
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  return (
    <View style={[styles.shell, isLightMode && styles.shellLight]}>
      {/* Top Banner / Theme Indicator */}
      <View style={styles.topInfoBar}>
        <Text style={styles.topInfoTitle}>CATZT CONCEPT V2 &bull; DESKTOP RECOVERY (2 WEEKS AGO)</Text>
        <Pressable
          style={styles.modeToggleBtn}
          onPress={() => setIsLightMode(!isLightMode)}
        >
          <Text style={styles.modeToggleText}>{isLightMode ? '🌙 DARK MODE' : '☀️ LIGHT MODE'}</Text>
        </Pressable>
      </View>

      {/* Main Container Phone / Card Mockup */}
      <View style={styles.phoneContainer}>
        {/* Top Bar Meta */}
        <View style={styles.topMetaRow}>
          <View style={styles.streakBadge}>
            <Flame size={14} color="#ff6f00" />
            <Text style={styles.streakText}>7 Hari Streak</Text>
          </View>

          <View style={styles.metaRight}>
            <View style={styles.iconCircle}>
              <Bell size={16} color={isLightMode ? '#1d1b18' : '#ffffff'} />
              <View style={styles.notifDot} />
            </View>
            <View style={styles.coinBadge}>
              <Zap size={14} color="#ff6f00" />
              <Text style={styles.coinText}>420 koin</Text>
            </View>
          </View>
        </View>

        {/* Profile Card Header */}
        <View style={[styles.profileCard, isLightMode && styles.profileCardLight]}>
          <View style={styles.profileMeta}>
            <Text style={styles.overline}>WARUNG BU SARI &bull; OPERATIONAL OS</Text>
            <Text style={[styles.title, isLightMode && styles.textDark]}>Catzt Business</Text>
          </View>
          <View style={styles.levelBadge}>
            <Star size={12} color="#ffffff" />
            <Text style={styles.levelText}>LV 4</Text>
          </View>
        </View>

        {/* XP Progress Bar */}
        <View style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpLabel}>PENGALAMAN & STREAK AUDIT</Text>
            <Text style={styles.xpVal}>180 / 250 XP</Text>
          </View>
          <View style={styles.xpTrack}>
            <View style={[styles.xpFill, { width: '72%' }]} />
          </View>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabsRow}>
          {(['stok', 'piutang', 'laporan', 'koin'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabBtnText, isActive && styles.tabBtnTextActive]}>
                  {tab.toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Tab Content */}
        {activeTab === 'stok' && (
          <View style={styles.contentBox}>
            <Text style={[styles.sectionHeading, isLightMode && styles.textDark]}>Daftar Inventaris Utama</Text>
            {[
              { name: 'Kopi Arabika Gayo 250g', stock: '42 Unit', status: 'STOK CUKUP', color: '#b4ff5a', isOk: true },
              { name: 'Teh Melati Premium', stock: '4 Unit', status: 'RESTOK SEGERA', color: '#ff6f00', isOk: false },
              { name: 'Gula Pasir Kristal 1kg', stock: '28 Unit', status: 'STOK CUKUP', color: '#b4ff5a', isOk: true },
              { name: 'Susu Kental Manis 370g', stock: '2 Unit', status: 'STOK KRITIS', color: '#e63946', isOk: false },
            ].map((item, idx) => (
              <View key={idx} style={[styles.itemCard, isLightMode && styles.itemCardLight]}>
                <View style={[styles.itemIconBox, { backgroundColor: item.isOk ? 'rgba(180,255,90,0.12)' : 'rgba(230,57,70,0.12)' }]}>
                  <Package size={20} color={item.isOk ? '#7ec820' : '#e63946'} />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, isLightMode && styles.textDark]}>{item.name}</Text>
                  <Text style={styles.itemSub}>{item.stock}</Text>
                </View>
                <View style={[styles.statusTag, { backgroundColor: item.color }]}>
                  <Text style={styles.statusTagText}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'piutang' && (
          <View style={styles.contentBox}>
            <Text style={[styles.sectionHeading, isLightMode && styles.textDark]}>Buku Piutang & Tagihan Pelanggan</Text>
            {[
              { customer: 'Bu Endang (Katering)', total: 'Rp 450.000', dueDate: 'Jatuh tempo hari ini', pending: true },
              { customer: 'Pak Budi (Toko Pojok)', total: 'Rp 1.200.000', dueDate: 'Lunas 14 Juli', pending: false },
            ].map((item, idx) => (
              <View key={idx} style={[styles.itemCard, isLightMode && styles.itemCardLight]}>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, isLightMode && styles.textDark]}>{item.customer}</Text>
                  <Text style={styles.itemSub}>{item.dueDate}</Text>
                </View>
                <Text style={{ color: item.pending ? '#e63946' : '#7ec820', fontWeight: '800', fontSize: 14 }}>
                  {item.total}
                </Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'laporan' && (
          <View style={styles.contentBox}>
            <Text style={[styles.sectionHeading, isLightMode && styles.textDark]}>Ringkasan Omzet & HPP</Text>
            <View style={styles.statGrid}>
              <View style={styles.statTile}>
                <Text style={styles.statTileLabel}>Omzet Hari Ini</Text>
                <Text style={styles.statTileVal}>Rp 1.840.000</Text>
              </View>
              <View style={styles.statTile}>
                <Text style={styles.statTileLabel}>Keuntungan Bersih</Text>
                <Text style={[styles.statTileVal, { color: '#7ec820' }]}>Rp 420.000</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'koin' && (
          <View style={styles.contentBox}>
            <Text style={[styles.sectionHeading, isLightMode && styles.textDark]}>Misi Warung & Hadiah XP</Text>
            <View style={[styles.itemCard, isLightMode && styles.itemCardLight]}>
              <Text style={[styles.itemName, isLightMode && styles.textDark]}>🎯 Lakukan Stok Opname Harian</Text>
              <Text style={{ color: '#ff6f00', fontWeight: '800' }}>+50 XP</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    backgroundColor: '#060913',
    minHeight: '100vh' as any,
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  shellLight: {
    backgroundColor: '#f0f2f7',
  },
  topInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 520,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  topInfoTitle: {
    color: '#ff6f00',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'DM Mono, monospace',
  },
  modeToggleBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#ff6f00',
    cursor: 'pointer',
  },
  modeToggleText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },

  phoneContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#0d1220',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6)' as any,
    gap: 18,
  },

  topMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 111, 0, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 111, 0, 0.3)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  streakText: {
    color: '#ff6f00',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'DM Mono, monospace',
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute' as any,
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e63946',
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 111, 0, 0.12)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  coinText: {
    color: '#ff6f00',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'DM Mono, monospace',
  },

  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  profileCardLight: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  profileMeta: {
    gap: 4,
  },
  overline: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: 'DM Mono, monospace',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },
  textDark: {
    color: '#060913',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ff6f00',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  levelText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },

  xpCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 14,
    borderRadius: 16,
    gap: 8,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpLabel: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'DM Mono, monospace',
  },
  xpVal: {
    color: '#ff6f00',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'DM Mono, monospace',
  },
  xpTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#ff6f00',
    borderRadius: 3,
  },

  tabsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    cursor: 'pointer',
  },
  tabBtnActive: {
    backgroundColor: '#ff6f00',
  },
  tabBtnText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'DM Mono, monospace',
  },
  tabBtnTextActive: {
    color: '#ffffff',
    fontWeight: '800',
  },

  contentBox: {
    gap: 12,
  },
  sectionHeading: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  itemCardLight: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  itemIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  itemSub: {
    color: '#94a3b8',
    fontSize: 11,
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusTagText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'DM Mono, monospace',
  },

  statGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statTile: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    gap: 6,
  },
  statTileLabel: {
    color: '#94a3b8',
    fontSize: 11,
  },
  statTileVal: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'DM Mono, monospace',
  },
});
