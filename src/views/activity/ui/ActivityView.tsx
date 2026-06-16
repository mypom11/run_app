import { StyleSheet, View } from 'react-native';

import { WorkoutCard } from '@/entities/workout';
import { useHealthWorkouts } from '@/features/health-sync';
import { spacing } from '@/shared/theme';
import { AppText, ScreenHeader, ScreenScroll, SectionHeader } from '@/shared/ui';
import { HealthConnectBanner } from './HealthConnectBanner';
import { WeeklySummaryCard } from './WeeklySummaryCard';

export function ActivityView() {
  const { workouts, source, available, loading, connect } = useHealthWorkouts();

  return (
    <ScreenScroll contentStyle={styles.content}>
      <ScreenHeader
        overline="MY ACTIVITY"
        title="내 기록"
        subtitle="Apple 건강과 연동해 러닝 기록을 한곳에서 확인하세요."
      />
      <HealthConnectBanner
        source={source}
        available={available}
        loading={loading}
        onConnect={connect}
      />
      <WeeklySummaryCard workouts={workouts} />

      <View style={styles.section}>
        <SectionHeader overline="HISTORY" title="최근 러닝" />
        <View style={styles.list}>
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
          {workouts.length === 0 && (
            <AppText variant="caption" tone="muted" style={styles.empty}>
              아직 기록이 없어요. 첫 러닝을 시작해보세요!
            </AppText>
          )}
        </View>
      </View>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.lg },
  section: { gap: spacing.lg },
  list: { paddingHorizontal: spacing.lg, gap: spacing.md },
  empty: { paddingHorizontal: spacing.xl },
});
