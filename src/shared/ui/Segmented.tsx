import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from './AppText';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedProps<T extends string> {
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
}

/** Horizontally scrollable filter chips (magazine categories, etc.). */
export function Segmented<T extends string>({ value, options, onChange }: SegmentedProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.track}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <AppText variant="caption" tone={active ? 'inverse' : 'muted'} style={active && styles.activeLabel}>
              {opt.label}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  track: { gap: spacing.sm, paddingHorizontal: spacing.xl, paddingVertical: spacing.xs },
  chip: {
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.glassBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  chipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  activeLabel: { fontWeight: '700' },
});
