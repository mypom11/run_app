import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import type { NormalizedRace } from '@/entities/race';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from '@/shared/ui';

/**
 * Web fallback — react-native-maps is native-only. Shows a friendly note
 * and a count of pinned venues so the screen stays meaningful on web.
 */
export function RaceMap({ races, height = 460 }: { races: NormalizedRace[]; height?: number; onPressRace?: (race: NormalizedRace) => void }) {
  const pinned = races.filter((r) => typeof r.lat === 'number' && typeof r.lng === 'number');
  return (
    <View style={[styles.wrap, { height }]}>
      <Ionicons name="map-outline" size={40} color={colors.accent} />
      <AppText variant="title" style={styles.title}>
        지도는 모바일 앱에서 제공됩니다
      </AppText>
      <AppText variant="caption" tone="muted" style={styles.sub}>
        {pinned.length}개 대회 위치가 네이티브 지도에 표시돼요.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    backgroundColor: colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  title: { textAlign: 'center' },
  sub: { textAlign: 'center' },
});
