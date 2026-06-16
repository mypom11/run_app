import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { summarize, withinDays, type Workout } from '@/entities/workout';
import { colors, radius, spacing } from '@/shared/theme';
import { AnimatedBar, AppText, CountUp, GlassCard } from '@/shared/ui';
import { activityStats } from '../model/stats';

const WEEKLY_GOAL_KM = 30;

/** Weekly distance goal ring + streak + week-over-week momentum. */
export function GoalProgressCard({ workouts }: { workouts: Workout[] }) {
  const week = summarize(withinDays(workouts, 7));
  const stats = activityStats(workouts);
  const pct = Math.min(100, Math.round((week.totalDistanceKm / WEEKLY_GOAL_KM) * 100));
  const up = stats.weekDeltaKm >= 0;

  return (
    <GlassCard intensity="strong" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.flex}>
          <AppText variant="overline" tone="accent">
            WEEKLY GOAL · 주간 목표
          </AppText>
          <View style={styles.goalRow}>
            <CountUp value={week.totalDistanceKm} decimals={1} style={styles.goalValue} />
            <AppText variant="title" tone="muted" style={styles.goalUnit}>
              / {WEEKLY_GOAL_KM}km
            </AppText>
          </View>
        </View>
        <View style={styles.pctWrap}>
          <CountUp value={pct} style={styles.pct} suffix="%" />
        </View>
      </View>

      <AnimatedBar fraction={pct / 100} thickness={12} delay={200} style={styles.bar} />

      <View style={styles.footer}>
        <View style={styles.chip}>
          <Ionicons name="flame" size={14} color={colors.accent} />
          <AppText variant="caption" tone="default" style={styles.chipText}>
            {stats.streakDays}일 연속
          </AppText>
        </View>
        <View style={styles.chip}>
          <Ionicons
            name={up ? 'arrow-up' : 'arrow-down'}
            size={14}
            color={up ? colors.success : colors.fgMuted}
          />
          <AppText variant="caption" tone="muted" style={styles.chipText}>
            지난주 대비 {up ? '+' : ''}
            {stats.weekDeltaKm.toFixed(1)}km
          </AppText>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: spacing.lg, padding: spacing.xl, gap: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  flex: { flex: 1 },
  goalRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 2 },
  goalValue: {
    color: colors.fg,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1.5,
    fontVariant: ['tabular-nums'],
    padding: 0,
  },
  goalUnit: { marginBottom: 4 },
  pctWrap: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accent,
  },
  pct: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
    padding: 0,
  },
  bar: {},
  footer: { flexDirection: 'row', gap: spacing.md },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.glassBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  chipText: { fontWeight: '600' },
});
