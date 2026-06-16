import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { WorkoutCard } from '@/entities/workout';
import { useHealthWorkouts } from '@/features/health-sync';
import { PaceCalculator } from '@/features/pace-calculator';
import { spacing } from '@/shared/theme';
import { AppText, ScreenHeader, ScreenScroll, SectionHeader, Segmented, type SegmentOption } from '@/shared/ui';
import { HealthConnectBanner } from './HealthConnectBanner';
import { WeeklySummaryCard } from './WeeklySummaryCard';

type ActivityTab = 'record' | 'pace';

const TABS: SegmentOption<ActivityTab>[] = [
  { value: 'record', label: '내 기록' },
  { value: 'pace', label: '페이스 계산기' },
];

export function ActivityView() {
  const params = useLocalSearchParams<{ tab?: string }>();
  const desired: ActivityTab | null =
    params.tab === 'pace' ? 'pace' : params.tab === 'record' ? 'record' : null;

  const [tab, setTab] = useState<ActivityTab>(desired ?? 'record');
  // Sync to the URL param when it changes (deep link from home), without an
  // effect — React's "adjust state during render" pattern.
  const [prevDesired, setPrevDesired] = useState(desired);
  if (desired !== prevDesired) {
    setPrevDesired(desired);
    if (desired) setTab(desired);
  }

  const { workouts, source, available, loading, connect } = useHealthWorkouts();

  return (
    <ScreenScroll contentStyle={styles.content}>
      <ScreenHeader
        overline="MY ACTIVITY"
        title="내 기록"
        subtitle="러닝 기록과 페이스 계산을 한곳에서. Apple 건강과 연동돼요."
      />
      <Segmented value={tab} options={TABS} onChange={setTab} />

      {tab === 'record' ? (
        <>
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
        </>
      ) : (
        <PaceCalculator />
      )}
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.lg },
  section: { gap: spacing.lg },
  list: { paddingHorizontal: spacing.lg, gap: spacing.md },
  empty: { paddingHorizontal: spacing.xl },
});
