import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from './AppText';
import { Pill } from './Pill';
import { ScreenBackground } from './ScreenBackground';

type IconName = ComponentProps<typeof Ionicons>['name'];

/** Stand-in for tabs whose screens are not yet migrated from the web app. */
export function PlaceholderScreen({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: IconName;
}) {
  return (
    <ScreenBackground>
      <View style={styles.center}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={36} color={colors.accent} />
        </View>
        <AppText variant="h1" style={styles.title}>
          {title}
        </AppText>
        <AppText variant="body" tone="muted" style={styles.desc}>
          {description}
        </AppText>
        <Pill label="COMING SOON" tone="accent" style={styles.pill} />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing['2xl'], gap: spacing.md },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: radius.xl,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: { textAlign: 'center' },
  desc: { textAlign: 'center', maxWidth: 300 },
  pill: { alignSelf: 'center', marginTop: spacing.sm },
});
