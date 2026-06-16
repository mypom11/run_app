import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import type { Workout } from '@/entities/workout';
import { formatPace } from '@/shared/lib';
import { colors, radius, spacing } from '@/shared/theme';
import { AnimatedBar, AppText, GlassCard } from '@/shared/ui';
import { recentPaces } from '../model/stats';

const CHART_HEIGHT = 96;

/**
 * Recent runs' pace as a bar trend. Faster runs grow taller (pace is
 * inverted), and the personal best in the window is accented.
 */
export function PaceTrendChart({ workouts }: { workouts: Workout[] }) {
  const points = recentPaces(workouts, 8);
  if (points.length === 0) return null;

  const paces = points.map((p) => p.paceSec);
  const min = Math.min(...paces);
  const max = Math.max(...paces);
  const span = Math.max(1, max - min);
  const avg = paces.reduce((s, p) => s + p, 0) / paces.length;

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText variant="overline" tone="accent">
            PACE TREND · 페이스 추이
          </AppText>
          <AppText variant="caption" tone="muted" style={styles.sub}>
            최근 {points.length}회 · 평균 {formatPace(avg)}/km
          </AppText>
        </View>
        <View style={styles.bestBadge}>
          <Ionicons name="flash" size={12} color={colors.accent} />
          <AppText variant="caption" tone="default" style={styles.bestText}>
            최고 {formatPace(min)}
          </AppText>
        </View>
      </View>

      <View style={styles.chart}>
        {points.map((p, i) => {
          // Faster (smaller sec) → taller. Keep a floor so every bar reads.
          const fraction = 0.28 + ((max - p.paceSec) / span) * 0.72;
          const isBest = p.paceSec === min;
          return (
            <View key={p.ts} style={styles.column}>
              <View style={styles.barArea}>
                <AnimatedBar
                  orientation="vertical"
                  fraction={fraction}
                  thickness={10}
                  delay={160 + i * 70}
                  gradient={
                    isBest
                      ? [colors.accentStrong, colors.accent]
                      : ['rgba(90,200,250,0.5)', 'rgba(90,200,250,0.22)']
                  }
                />
              </View>
              <AppText variant="overline" tone={isBest ? 'accent' : 'subtle'} style={styles.km}>
                {p.distanceKm.toFixed(0)}k
              </AppText>
            </View>
          );
        })}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: spacing.lg, padding: spacing.xl, gap: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  sub: { marginTop: 3 },
  bestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accent,
  },
  bestText: { fontWeight: '700' },
  chart: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, height: CHART_HEIGHT + 22 },
  column: { flex: 1, alignItems: 'center', gap: 6 },
  barArea: { height: CHART_HEIGHT, justifyContent: 'flex-end', alignItems: 'center' },
  km: { fontVariant: ['tabular-nums'] },
});
