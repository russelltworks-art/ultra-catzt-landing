import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Preloader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            if (onFinish) onFinish();
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>LOADING CATZT OS...</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#041021',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    color: '#38bdf8',
    fontFamily: 'DM Mono, monospace',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 16,
    fontWeight: '600',
  },
  track: {
    width: 180,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#38bdf8',
    borderRadius: 2,
  },
});
