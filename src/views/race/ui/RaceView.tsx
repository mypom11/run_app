import { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { RaceCard } from '@/entities/race';
import { RaceMap } from '@/features/race-map';
import { EMPTY_FILTERS, filterRaces, RaceSearchBar, type RaceFilterState } from '@/features/race-search';
import { colors, spacing } from '@/shared/theme';
import { AppText, Reveal, ScreenHeader, ScreenScroll, Segmented, type SegmentOption } from '@/shared/ui';
import { useRaceList } from '../model/useRaceList';

type ViewMode = 'list' | 'map';

const VIEW_OPTIONS: SegmentOption<ViewMode>[] = [
  { value: 'list', label: '목록' },
  { value: 'map', label: '지도' },
];

export function RaceView() {
  const { races, loading } = useRaceList();
  const [filters, setFilters] = useState<RaceFilterState>(EMPTY_FILTERS);
  const [mode, setMode] = useState<ViewMode>('list');

  const items = useMemo(() => filterRaces(races, filters), [races, filters]);

  return (
    <ScreenScroll contentStyle={styles.content}>
      <Reveal index={0}>
        <ScreenHeader
          overline="RACE SCHEDULE"
          title="대회 일정"
          subtitle="국내·해외 마라톤 일정을 한눈에. 검색과 종목 필터로 빠르게 탐색하세요."
        />
      </Reveal>
      <Reveal index={1}>
        <RaceSearchBar value={filters} onChange={setFilters} />
      </Reveal>
      <Reveal index={2}>
        <Segmented value={mode} options={VIEW_OPTIONS} onChange={setMode} />
      </Reveal>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.accent} />
        </View>
      ) : mode === 'map' ? (
        <RaceMap races={items} />
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
          {items.map((race, i) => (
            <Reveal key={race.id} index={i} delay={120} step={55}>
              <RaceCard race={race} />
            </Reveal>
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
