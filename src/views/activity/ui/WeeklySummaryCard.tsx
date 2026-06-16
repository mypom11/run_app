import { StyleSheet, View } from 'react-native';

import { summarize, withinDays, type Workout } from '@/entities/workout';
import { formatDuration, formatPace } from '@/shared/lib';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from '@/shared/ui';

/** This-week running totals — hero distance + supporting metrics. */
export function WeeklySummaryCard({ workouts }: { workouts: Workout[] }) {
  const week = summarize(withinDays(workouts, 7));

  return (
    <View style={styles.card}>
      <AppText variant="overline" tone="accent">
        THIS WEEK · 이번 주
      </AppText>
      <View style={styles.heroRow}>
        <AppText style={styles.hero}>{week.totalDistanceKm.toFixed(1)}</AppText>
        <AppText variant="h2" tone="muted" style={styles.heroUnit}>
          km
        </AppText>
      </View>
      <View style={styles.stats}>
        <Stat label="러닝" value={`${week.runCount}회`} />
        <Stat label="평균 페이스" value={`${formatPace(week.avgPaceSec)}/km`} />
        <Stat label="누적 시간" value={formatDuration(week.totalDurationSec)} />
      </View>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <AppText variant="overline" tone="subtle">
        {label}
      </AppText>
      <AppText variant="title" style={styles.statValue}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.accentSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accent,
    gap: spacing.xs,
  },
  heroRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 2 },
  hero: {
    color: colors.fg,
    fontSize: 56,
    fontWeight: '800',
    letterSpacing: -2,
    fontVariant: ['tabular-nums'],
  },
  heroUnit: { marginBottom: 6 },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.glassBorder,
    paddingTop: spacing.lg,
  },
  stat: { flex: 1, gap: 4 },
  statValue: { fontVariant: ['tabular-nums'] },
});
