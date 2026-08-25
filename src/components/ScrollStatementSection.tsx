import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STATEMENT_WORDS = [
  'Aplikasi', 'lain', 'cuma', 'kasih', 'laporan', 'omzet.', 'Catzt', 'kasih', 'jawaban', 'untung-rugi',
  'per', 'barang.', 'Kebanyakan', 'aplikasi', 'berhenti', 'di', 'penjualan.', 'Catzt', 'lanjut',
  'menghitung', 'modal', 'tiap', 'barang', 'dan', 'memberi', 'tahu', 'mana', 'yang', 'benar-benar',
  'menghidupi', 'warungmu.'
];

export const ScrollStatementSection: React.FC = () => {
  const [revealedCount, setRevealedCount] = useState(STATEMENT_WORDS.length);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('scroll-statement-section');
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0), 1);

      const activeWords = Math.floor(progress * (STATEMENT_WORDS.length + 5));
      setRevealedCount(Math.min(activeWords, STATEMENT_WORDS.length));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <View id="scroll-statement-section" style={styles.sectionShell}>
      <View style={styles.contentBox}>
        <Text style={styles.statementParagraph}>
          {STATEMENT_WORDS.map((word, i) => {
            const isLit = i <= revealedCount;
            return (
              <Text
                key={i}
                style={[
                  styles.wordBase,
                  isLit ? styles.wordLit : styles.wordDimmed,
                ]}
              >
                {word}{' '}
              </Text>
            );
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionShell: {
    paddingVertical: 120,
    paddingHorizontal: 28,
    backgroundColor: '#071b34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBox: {
    maxWidth: 960,
    alignSelf: 'center',
  },
  statementParagraph: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 48,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  wordBase: {
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
  },
  wordLit: {
    color: '#ffffff',
    textShadowColor: 'rgba(56, 189, 248, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  wordDimmed: {
    color: 'rgba(255, 255, 255, 0.18)',
  },
});
