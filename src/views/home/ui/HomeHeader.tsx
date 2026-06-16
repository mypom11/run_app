import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from '@/shared/ui';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 6) return '늦은 밤이에요';
  if (h < 12) return '좋은 아침이에요';
  if (h < 18) return '달리기 좋은 오후예요';
  return '오늘도 수고했어요';
}

/** Top bar: greeting + avatar, Nike-Run-style. */
export function HomeHeader() {
  return (
    <View style={styles.row}>
      <View style={styles.flex}>
        <AppText variant="caption" tone="muted">
          {greeting()}
        </AppText>
        <AppText variant="h2" style={styles.name}>
          러너님 👋
        </AppText>
      </View>
      <Pressable style={styles.avatar}>
        <LinearGradient
          colors={[colors.accentStrong, colors.accent]}
          style={StyleSheet.absoluteFill}
        />
        <Ionicons name="person" size={20} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  flex: { flex: 1, gap: 2 },
  name: { marginTop: 1 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
