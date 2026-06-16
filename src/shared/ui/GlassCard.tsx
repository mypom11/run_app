import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius } from '@/shared/theme';

type Intensity = 'default' | 'strong';

interface GlassCardProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: Intensity;
  /** Disable the blur layer (e.g. when nested inside another blur). */
  flat?: boolean;
}

/**
 * Glassmorphism surface — frosted blur + hairline border + translucent fill.
 * Mirrors the web `.glass` / `GlassCard` primitive.
 */
export function GlassCard({ children, style, intensity = 'default', flat = false }: GlassCardProps) {
  const fill = intensity === 'strong' ? colors.glassBgStrong : colors.glassBg;
  const border = intensity === 'strong' ? colors.glassBorderStrong : colors.glassBorder;

  return (
    <View style={[styles.wrapper, { borderColor: border }, style]}>
      {!flat && (
        <BlurView
          intensity={intensity === 'strong' ? 40 : 24}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: fill }]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
});
