import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

/**
 * UNITS.GR DESIGN TOKENS SYSTEM
 * Structured design system architecture for Catzt Units.
 */
export const UNITS_TOKENS = {
  colors: {
    bg: '#0a0a0c',
    surface: 'rgba(255, 255, 255, 0.03)',
    surfaceHover: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderActive: 'rgba(255, 255, 255, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    textDark: '#000000',
    // Brand Semantic Accent Units
    purple: '#AB54F7', // WMS & Warehouse Unit
    amber: '#FFB200',  // Omnichannel Sync Unit
    coral: '#E6313A',  // Financial HPP Unit
    emerald: '#267E6E',// RPG & Gamification Unit
  },
  typography: {
    fontDisplay: 'Manrope, system-ui, sans-serif',
    fontMono: 'DM Mono, monospace',
    fontSans: 'Inter, system-ui, sans-serif',
  },
  radius: {
    pill: 999,
    card: 24,
    box: 16,
    sm: 8,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 36,
    xxl: 60,
  },
};

/**
 * ATOM: Liquid Waves Button (Signature Units.gr CTA)
 */
export interface LiquidCtaButtonProps {
  label: string;
  color?: string;
  onPress?: () => void;
  style?: any;
}

export const LiquidCtaButton: React.FC<LiquidCtaButtonProps> = ({
  label,
  color = UNITS_TOKENS.colors.purple,
  onPress,
  style,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={[
        buttonStyles.liquidBtn,
        { backgroundColor: color },
        isHovered && buttonStyles.liquidBtnHovered,
        style,
      ]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPress={onPress}
    >
      <Text style={buttonStyles.liquidBtnText}>{label}</Text>
      {isHovered && (
        <View style={buttonStyles.liquidWaveContainer}>
          <View style={[buttonStyles.waveLayer, { backgroundColor: UNITS_TOKENS.colors.amber }]} />
          <View style={[buttonStyles.waveLayer, { backgroundColor: UNITS_TOKENS.colors.coral }]} />
          <View style={[buttonStyles.waveLayer, { backgroundColor: UNITS_TOKENS.colors.emerald }]} />
        </View>
      )}
    </Pressable>
  );
};

/**
 * ATOM: Unit Pill Filter Tag
 */
export interface UnitPillProps {
  label: string;
  color: string;
  isSelected: boolean;
  onPress: () => void;
}

export const UnitPill: React.FC<UnitPillProps> = ({
  label,
  color,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        pillStyles.pill,
        isSelected && { backgroundColor: color, borderColor: color },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          pillStyles.pillText,
          isSelected && { color: UNITS_TOKENS.colors.textDark, fontWeight: '800' },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  liquidBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: UNITS_TOKENS.radius.pill,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    minHeight: 44, // WCAG Touch target
    justifyContent: 'center',
    alignItems: 'center',
  },
  liquidBtnHovered: {
    // @ts-ignore
    transform: 'scale(1.03)',
  },
  liquidBtnText: {
    color: UNITS_TOKENS.colors.textDark,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: UNITS_TOKENS.typography.fontDisplay,
    zIndex: 2,
  },
  liquidWaveContainer: {
    position: 'absolute' as any,
    inset: 0,
    flexDirection: 'row',
  },
  waveLayer: {
    flex: 1,
    height: '100%',
    opacity: 0.85,
  },
});

const pillStyles = StyleSheet.create({
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: UNITS_TOKENS.radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    cursor: 'pointer',
    minHeight: 40,
    justifyContent: 'center',
  },
  pillText: {
    color: UNITS_TOKENS.colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: UNITS_TOKENS.typography.fontDisplay,
  },
});
