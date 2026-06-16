import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, type Region } from 'react-native-maps';

import type { NormalizedRace } from '@/entities/race';
import { dDayLabel } from '@/shared/lib';
import { colors, radius } from '@/shared/theme';
import { AppText } from '@/shared/ui';

const KOREA_REGION: Region = {
  latitude: 36.2,
  longitude: 127.9,
  latitudeDelta: 5.2,
  longitudeDelta: 5.2,
};

interface RaceMapProps {
  races: NormalizedRace[];
  height?: number;
  onPressRace?: (race: NormalizedRace) => void;
}

/** Native map of race venues (markers for races with coordinates). */
export function RaceMap({ races, height = 460, onPressRace }: RaceMapProps) {
  const pinned = useMemo(
    () => races.filter((r) => typeof r.lat === 'number' && typeof r.lng === 'number'),
    [races],
  );

  return (
    <View style={[styles.wrap, { height }]}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        initialRegion={KOREA_REGION}
        userInterfaceStyle="dark"
      >
        {pinned.map((race) => (
          <Marker
            key={race.id}
            coordinate={{ latitude: race.lat as number, longitude: race.lng as number }}
            title={race.title}
            description={`${dDayLabel(race.startDate)} · ${race.location ?? ''}`}
            pinColor={colors.accent}
            onCalloutPress={() => onPressRace?.(race)}
          />
        ))}
      </MapView>
      {pinned.length === 0 && (
        <View style={styles.empty} pointerEvents="none">
          <AppText variant="caption" tone="muted">
            지도에 표시할 위치 정보가 없어요
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    backgroundColor: colors.bgElevated,
  },
  empty: { position: 'absolute', top: 12, alignSelf: 'center' },
});
