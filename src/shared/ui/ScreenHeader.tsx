import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';
import { AppText } from './AppText';

/** Page header used by the top-level tab screens: overline + title + subtitle. */
export function ScreenHeader({
  overline,
  title,
  subtitle,
}: {
  overline: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.root}>
      <AppText variant="overline" tone="accent">
        {overline}
      </AppText>
      <AppText variant="display" style={styles.title}>
        {title}
      </AppText>
      {!!subtitle && (
        <AppText variant="body" tone="muted" style={styles.sub}>
          {subtitle}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: spacing.xl, gap: spacing.xs },
  title: { marginTop: 2, fontSize: 38, lineHeight: 40 },
  sub: { marginTop: spacing.xs, maxWidth: 340 },
});
