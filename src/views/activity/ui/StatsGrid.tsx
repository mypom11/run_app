import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import type { Workout } from '@/entities/workout';
import { formatPace } from '@/shared/lib';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText, CountUp, GlassCard } from '@/shared/ui';
import { activityStats } from '../model/stats';

/** Four headline lifetime metrics with values that tick up on mount. */
export function StatsGrid({ workouts }: { workouts: Workout[] }) {
  const s = activityStats(workouts);

  return (
    <View style={styles.grid}>
      <Tile
        icon="map-outline"
        label="총 거리"
        unit="km"
        node={<CountUp value={s.totalDistanceKm} decimals={1} style={styles.value} />}
      />
      <Tile
        icon="footsteps-outline"
        label="총 러닝"
        unit="회"
        node={<CountUp value={s.totalRuns} style={styles.value} />}
      />
      <Tile
        icon="flame-outline"
        label="소모 칼로리"
        unit="kcal"
        node={<CountUp value={s.totalCalories} style={styles.value} />}
      />
      <Tile
        icon="trending-up-outline"
        label="최고 페이스"
        unit="/km"
        node={<AppText style={styles.value}>{formatPace(s.bestPaceSec)}</AppText>}
      />
    </View>
  );
}

function Tile({
  icon,
  label,
  unit,
  node,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  unit: string;
  node: React.ReactNode;
}) {
  return (
    <GlassCard style={styles.tile}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={16} color={colors.accent} />
      </View>
      <AppText variant="overline" tone="subtle">
        {label}
      </AppText>
      <View style={styles.valueRow}>
        {node}
        <AppText variant="caption" tone="muted" style={styles.unit}>
          {unit}
        </AppText>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  value: {
    color: colors.fg,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.6,
    fontVariant: ['tabular-nums'],
    padding: 0,
  },
  unit: {},
});
