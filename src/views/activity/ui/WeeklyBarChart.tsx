import { StyleSheet, View } from 'react-native';

import type { Workout } from '@/entities/workout';
import { colors, radius, spacing } from '@/shared/theme';
import { AnimatedBar, AppText, CountUp, GlassCard } from '@/shared/ui';
import { dailyDistance } from '../model/stats';

const CHART_HEIGHT = 132;

/** 7-day distance as a column chart — bars grow up on mount, today accented. */
export function WeeklyBarChart({ workouts }: { workouts: Workout[] }) {
  const days = dailyDistance(workouts, 7);
  const max = Math.max(1, ...days.map((d) => d.distanceKm));
  const total = days.reduce((s, d) => s + d.distanceKm, 0);
  const activeDays = days.filter((d) => d.distanceKm > 0).length;

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText variant="overline" tone="accent">
            LAST 7 DAYS · 주간 거리
          </AppText>
          <View style={styles.totalRow}>
            <CountUp value={total} decimals={1} style={styles.total} />
            <AppText variant="title" tone="muted" style={styles.unit}>
              km
            </AppText>
          </View>
        </View>
        <View style={styles.activePill}>
          <AppText variant="caption" tone="default" style={styles.activePillText}>
            {activeDays}일 러닝
          </AppText>
        </View>
      </View>

      <View style={styles.chart}>
        {days.map((d, i) => (
          <View key={d.ts} style={styles.column}>
            <AppText
              variant="overline"
              tone={d.distanceKm > 0 ? 'default' : 'subtle'}
              style={styles.value}
            >
              {d.distanceKm > 0 ? d.distanceKm.toFixed(1) : ''}
            </AppText>
            <View style={styles.barArea}>
              <AnimatedBar
                orientation="vertical"
                fraction={d.distanceKm / max}
                thickness={12}
                delay={140 + i * 70}
                gradient={
                  d.isToday
                    ? [colors.accentStrong, colors.accent]
                    : ['rgba(255,122,58,0.55)', 'rgba(255,90,31,0.32)']
                }
              />
            </View>
            <AppText
              variant="caption"
              tone={d.isToday ? 'accent' : 'subtle'}
              style={[styles.dayLabel, d.isToday && styles.dayLabelToday]}
            >
              {d.label}
            </AppText>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: spacing.lg, padding: spacing.xl, gap: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  totalRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5, marginTop: 2 },
  total: {
    color: colors.fg,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
    padding: 0,
  },
  unit: { marginBottom: 1 },
  activePill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.glassBgStrong,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorderStrong,
  },
  activePillText: { fontWeight: '600' },
  chart: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.xs, height: CHART_HEIGHT + 36 },
  column: { flex: 1, alignItems: 'center', gap: 6 },
  value: { fontVariant: ['tabular-nums'], height: 14 },
  barArea: { height: CHART_HEIGHT, justifyContent: 'flex-end', alignItems: 'center' },
  dayLabel: { fontWeight: '600' },
  dayLabelToday: { fontWeight: '800' },
});
