import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Who is Catzt OS built for?',
    a: 'Catzt OS is built for e-commerce sellers, brand owners, small operation teams, and agencies that want to bring multi-channel sync, inventory, marketing assets, and team workflow into one connected workspace.',
  },
  {
    q: 'Is Catzt OS only for small teams?',
    a: 'No. Catzt OS works just as well for an individual seller as it does for a growing brand or multi-store agency. You can start with one workspace, invite staff when needed, and scale across more stores and brands as your revenue grows.',
  },
  {
    q: 'Which marketplaces and channels are supported?',
    a: 'Catzt OS supports Shopee, TikTok Shop, Tokopedia, Lazada, as well as Google Drive and social channels, keeping stock levels and order statuses synchronized.',
  },
  {
    q: 'What happens to our store and stock data?',
    a: 'Your store credentials, inventory counts, buyer data, and operational guidelines remain strictly protected inside isolated tenant boundaries using enterprise RLS security.',
  },
  {
    q: 'How is Catzt OS different from traditional project or ERP tools?',
    a: 'Catzt OS connects live store execution directly with your team workflows. Instead of managing static task lists or complex detached spreadsheets, your team works with live marketplace inventory, automated webhooks, and contextual brand assets.',
  },
  {
    q: 'Can I keep using my existing marketplace accounts?',
    a: 'Yes! Catzt OS connects securely via marketplace API integrations, allowing you to manage orders and stock in Catzt without changing how your stores operate on Shopee or TikTok.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <View id="faq" style={styles.sectionShell}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.kicker}>FAQ</Text>
          <Text style={styles.title}>
            Common questions{'\n'}
            <Text style={styles.highlightText}>clearly answered</Text>
          </Text>
        </View>

        <View style={styles.faqList}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <View key={idx} style={[styles.faqCard, isOpen && styles.faqCardOpen]}>
                <Pressable style={styles.faqHeader} onPress={() => toggle(idx)}>
                  <Text style={styles.faqQuestion}>{faq.q}</Text>
                  <View style={styles.iconCircle}>
                    {isOpen ? <Minus size={16} color="#38bdf8" /> : <Plus size={16} color="#94a3b8" />}
                  </View>
                </Pressable>

                {isOpen && (
                  <View style={styles.faqBody}>
                    <Text style={styles.faqAnswer}>{faq.a}</Text>
                  </View>
                )}
              </View>
            );
          })}
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
  contentContainer: {
    maxWidth: 960,
    alignSelf: 'center',
    width: '100%',
    gap: 40,
  },
  header: {
    gap: 12,
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
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  highlightText: {
    color: '#818cf8',
  },
  faqList: {
    gap: 16,
  },
  faqCard: {
    backgroundColor: 'rgba(14, 38, 70, 0.4)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  faqCardOpen: {
    borderColor: 'rgba(56, 189, 248, 0.3)',
    backgroundColor: 'rgba(22, 54, 96, 0.6)',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    cursor: 'pointer',
  },
  faqQuestion: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
    paddingRight: 16,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqBody: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  faqAnswer: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 24,
  },
});
