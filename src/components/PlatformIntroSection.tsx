import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HelpCircle, AlertTriangle, FileX, CreditCard } from 'lucide-react';

export const PlatformIntroSection: React.FC = () => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.contentGrid}>
        {/* Visual Frame Left */}
        <View style={styles.visualContainer}>
          <View style={styles.imageFrame}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000&auto=format&fit=crop' }}
              style={styles.frameImage}
              resizeMode="cover"
            />
            <View style={styles.overlayGlow} />
          </View>
        </View>

        {/* Copy Right */}
        <View style={styles.copyContainer}>
          <Text style={styles.sectionTitle}>Bukan malas mencatat. Memang repot.</Text>
          <Text style={styles.sectionDesc}>
            Buku tulis penuh coretan, kalkulator, dan ingatan. Sampai suatu hari uang di laci tidak cocok dengan yang dirasa. Catzt hadir menyelesaikan 4 masalah terbesar pencatatan toko:
          </Text>

          <View style={styles.highlightsGrid}>
            {/* Masalah 1 */}
            <View style={styles.highlightCard}>
              <View style={styles.iconCircle}>
                <HelpCircle size={18} color="#38bdf8" />
              </View>
              <Text style={styles.highlightTitle}>"Untung apa rugi, ya?"</Text>
              <Text style={styles.highlightDesc}>Omzet kelihatan besar, tapi setelah modal barang dihitung ulang, sisanya ternyata tipis.</Text>
            </View>

            {/* Masalah 2 */}
            <View style={styles.highlightCard}>
              <View style={styles.iconCircle}>
                <AlertTriangle size={18} color="#818cf8" />
              </View>
              <Text style={styles.highlightTitle}>Barang habis tanpa sadar</Text>
              <Text style={styles.highlightDesc}>Pembeli datang, barangnya kosong. Yang laris telat dibeli, yang mati menumpuk di rak.</Text>
            </View>

            {/* Masalah 3 */}
            <View style={styles.highlightCard}>
              <View style={styles.iconCircle}>
                <FileX size={18} color="#f43f5e" />
              </View>
              <Text style={styles.highlightTitle}>Catatan basah & hilang</Text>
              <Text style={styles.highlightDesc}>Buku basah, sobek, atau lupa dicatat waktu ramai. Data hilang dan tidak bisa dicek lagi.</Text>
            </View>

            {/* Masalah 4 */}
            <View style={styles.highlightCard}>
              <View style={styles.iconCircle}>
                <CreditCard size={18} color="#fbbf24" />
              </View>
              <Text style={styles.highlightTitle}>Bon yang tak enak ditagih</Text>
              <Text style={styles.highlightDesc}>Sudah lewat sebulan tapi sungkan mengingatkan. Akhirnya dianggap lupa padahal itu uang modal.</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 100,
    paddingHorizontal: 28,
    backgroundColor: '#041021',
  },
  contentGrid: {
    flexDirection: 'row',
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    gap: 56,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  visualContainer: {
    flex: 1,
    minWidth: 320,
  },
  imageFrame: {
    height: 480,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  frameImage: {
    width: '100%',
    height: '100%',
  },
  overlayGlow: {
    position: 'absolute' as any,
    inset: 0,
    backgroundColor: 'rgba(7, 27, 52, 0.2)',
  },
  copyContainer: {
    flex: 1,
    minWidth: 320,
    gap: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  sectionDesc: {
    color: '#94a3b8',
    fontSize: 16,
    lineHeight: 26,
  },
  highlightsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  highlightCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: 'rgba(14, 38, 70, 0.5)',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 8,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  highlightTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  highlightDesc: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 19,
  },
});
