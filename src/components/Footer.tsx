import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export const Footer: React.FC = () => {
  return (
    <View style={styles.footerShell}>
      <View style={styles.container}>
        <Text style={styles.copy}>&copy; {new Date().getFullYear()} Catzt Office (Warebox). All rights reserved.</Text>
        <View style={styles.linksRow}>
          <Pressable onPress={() => window.open('/privacy', '_blank')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Pressable>
          <Pressable onPress={() => window.open('/terms', '_blank')}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </Pressable>
          <Pressable onPress={() => window.open('/imprint', '_blank')}>
            <Text style={styles.linkText}>Imprint</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerShell: {
    paddingVertical: 32,
    paddingHorizontal: 28,
    backgroundColor: '#041021',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  container: {
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  copy: {
    color: '#64748b',
    fontSize: 13,
  },
  linksRow: {
    flexDirection: 'row',
    gap: 24,
  },
  linkText: {
    color: '#94a3b8',
    fontSize: 13,
  },
});
