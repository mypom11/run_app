import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { WorkoutCard } from '@/entities/workout';
import { useHealthWorkouts } from '@/features/health-sync';
import { PaceCalculator } from '@/features/pace-calculator';
import { spacing } from '@/shared/theme';
import {
  AppText,
  Reveal,
  ScreenHeader,
  ScreenScroll,
  SectionHeader,
  Segmented,
  type SegmentOption,
} from '@/shared/ui';
import { GoalProgressCard } from './GoalProgressCard';
import { HealthConnectBanner } from './HealthConnectBanner';
import { PaceTrendChart } from './PaceTrendChart';
import { StatsGrid } from './StatsGrid';
import { WeeklyBarChart } from './WeeklyBarChart';

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
      <Reveal index={0}>
        <ScreenHeader
          overline="MY ACTIVITY"
          title="내 기록"
          subtitle="러닝 기록과 페이스 계산을 한곳에서. Apple 건강과 연동돼요."
        />
      </Reveal>
      <Reveal index={1}>
        <Segmented value={tab} options={TABS} onChange={setTab} />
      </Reveal>

      {tab === 'record' ? (
        // `key` remounts the block on tab switch so the charts re-animate in.
        <View key="record" style={styles.recordBlock}>
          <Reveal index={2}>
            <HealthConnectBanner
              source={source}
              available={available}
              loading={loading}
              onConnect={connect}
            />
          </Reveal>
          <Reveal index={3}>
            <GoalProgressCard workouts={workouts} />
          </Reveal>
          <Reveal index={4}>
            <StatsGrid workouts={workouts} />
          </Reveal>
          <Reveal index={5}>
            <WeeklyBarChart workouts={workouts} />
          </Reveal>
          <Reveal index={6}>
            <PaceTrendChart workouts={workouts} />
          </Reveal>

          <Reveal index={7} style={styles.section}>
            <SectionHeader overline="HISTORY" title="최근 러닝" />
            <View style={styles.list}>
              {workouts.map((w, i) => (
                <Reveal key={w.id} index={i} delay={520} step={60}>
                  <WorkoutCard workout={w} />
                </Reveal>
              ))}
              {workouts.length === 0 && (
                <AppText variant="caption" tone="muted" style={styles.empty}>
                  아직 기록이 없어요. 첫 러닝을 시작해보세요!
                </AppText>
              )}
            </View>
          </Reveal>
        </View>
      ) : (
        <View key="pace">
          <Reveal index={2}>
            <PaceCalculator />
          </Reveal>
        </View>
      )}
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.lg },
  recordBlock: { gap: spacing.lg },
  section: { gap: spacing.lg },
  list: { paddingHorizontal: spacing.lg, gap: spacing.md },
  empty: { paddingHorizontal: spacing.xl },
});
