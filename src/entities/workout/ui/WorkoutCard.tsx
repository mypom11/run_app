import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { formatDuration, formatPace, relativeDay } from '@/shared/lib';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText, GlassCard } from '@/shared/ui';
import type { Workout } from '../model/types';

/** A single run: big distance, with pace / time / heart-rate metrics. */
export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.head}>
        <View style={styles.runIcon}>
          <Ionicons name="walk" size={18} color={colors.accent} />
        </View>
        <View style={styles.flex}>
          <AppText variant="caption" tone="muted">
            {relativeDay(workout.date)} · 러닝
          </AppText>
          <View style={styles.distanceRow}>
            <AppText variant="h1" style={styles.distance}>
              {workout.distanceKm.toFixed(2)}
            </AppText>
            <AppText variant="title" tone="muted" style={styles.unit}>
              km
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.metrics}>
        <Metric icon="stopwatch-outline" label="시간" value={formatDuration(workout.durationSec)} />
        <Metric icon="speedometer-outline" label="평균 페이스" value={`${formatPace(workout.avgPaceSec)}/km`} />
        {workout.avgHeartRate != null && (
          <Metric icon="heart-outline" label="평균 심박" value={`${workout.avgHeartRate} bpm`} />
        )}
      </View>
    </GlassCard>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metric}>
      <View style={styles.metricLabel}>
        <Ionicons name={icon} size={12} color={colors.fgSubtle} />
        <AppText variant="overline" tone="subtle" style={styles.metricLabelText}>
          {label}
        </AppText>
      </View>
      <AppText variant="title" style={styles.metricValue}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.lg, gap: spacing.lg },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  runIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 1 },
  distance: { fontVariant: ['tabular-nums'] },
  unit: { marginBottom: 2 },
  metrics: {
    flexDirection: 'row',
    gap: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.glassBorder,
    paddingTop: spacing.md,
  },
  metric: { flex: 1, gap: 4 },
  metricLabel: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metricLabelText: { textTransform: 'uppercase' },
  metricValue: { fontVariant: ['tabular-nums'] },
});
