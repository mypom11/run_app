import { memo, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from './AppText';

interface PillProps {
  label: string;
  icon?: ReactNode;
  tone?: 'glass' | 'accent';
  style?: StyleProp<ViewStyle>;
}

/** Small rounded label chip (e.g. "SEASON 2026", event tags). */
export const Pill = memo(function Pill({ label, icon, tone = 'glass', style }: PillProps) {
  const isAccent = tone === 'accent';
  return (
    <View
      style={[
        styles.base,
        isAccent ? styles.accent : styles.glass,
        style,
      ]}
    >
      {icon}
      <AppText
        variant="overline"
        tone={isAccent ? 'accent' : 'muted'}
        style={styles.label}
      >
        {label}
      </AppText>
    </View>
  );
});

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  glass: { backgroundColor: colors.glassBg, borderColor: colors.glassBorder },
  accent: { backgroundColor: colors.accentSoft, borderColor: colors.accentSoft },
  label: { textTransform: 'uppercase' },
});
