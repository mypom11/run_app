import { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { RaceCard } from '@/entities/race';
import { EMPTY_FILTERS, filterRaces, RaceSearchBar, type RaceFilterState } from '@/features/race-search';
import { colors, spacing } from '@/shared/theme';
import { AppText, ScreenHeader, ScreenScroll } from '@/shared/ui';
import { useRaceList } from '../model/useRaceList';

export function RaceView() {
  const { races, loading } = useRaceList();
  const [filters, setFilters] = useState<RaceFilterState>(EMPTY_FILTERS);

  const items = useMemo(() => filterRaces(races, filters), [races, filters]);

  return (
    <ScreenScroll contentStyle={styles.content}>
      <ScreenHeader
        overline="RACE SCHEDULE"
        title="대회 일정"
        subtitle="국내·해외 마라톤 일정을 한눈에. 검색과 종목 필터로 빠르게 탐색하세요."
      />
      <RaceSearchBar value={filters} onChange={setFilters} />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.accent} />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.center}>
          <AppText variant="title" tone="muted">
            조건에 맞는 대회가 없어요
          </AppText>
          <AppText variant="caption" tone="subtle">
            검색어나 필터를 바꿔보세요.
          </AppText>
        </View>
      ) : (
        <View style={styles.list}>
          <AppText variant="caption" tone="subtle" style={styles.count}>
            {items.length}개 대회
          </AppText>
          {items.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </View>
      )}
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.lg },
  list: { paddingHorizontal: spacing.lg, gap: spacing.lg },
  count: { paddingHorizontal: spacing.xs },
  center: { paddingVertical: spacing['3xl'], alignItems: 'center', gap: spacing.xs },
});
