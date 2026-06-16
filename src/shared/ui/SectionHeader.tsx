import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/shared/theme';
import { AppText } from './AppText';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

export function SectionHeader({ overline, title, actionLabel, onPressAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.flex}>
        {!!overline && (
          <AppText variant="overline" tone="accent">
            {overline}
          </AppText>
        )}
        <AppText variant="h1" style={styles.title}>
          {title}
        </AppText>
      </View>
      {!!actionLabel && (
        <Pressable onPress={onPressAction} style={styles.action} hitSlop={8}>
          <AppText variant="caption" tone="muted">
            {actionLabel}
          </AppText>
          <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  flex: { flex: 1, gap: 3 },
  title: { marginTop: 1 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingBottom: 3 },
});
