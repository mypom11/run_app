import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { RaceCard, type NormalizedRace } from '@/entities/race';
import { colors, spacing } from '@/shared/theme';
import { SectionHeader } from '@/shared/ui';
import { useUpcomingRaces } from '../model/useUpcomingRaces';

const CARD_WIDTH = 280;

interface FeaturedRacesProps {
  onPressRace?: (race: NormalizedRace) => void;
  onPressMore?: () => void;
}

export function FeaturedRaces({ onPressRace, onPressMore }: FeaturedRacesProps) {
  const { races, loading } = useUpcomingRaces(6);

  return (
    <View style={styles.section}>
      <SectionHeader
        overline="UPCOMING"
        title="다가오는 대회"
        actionLabel="전체보기"
        onPressAction={onPressMore}
      />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.accent} />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.track}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + spacing.md}
          snapToAlignment="start"
        >
          {races.map((race) => (
            <RaceCard key={race.id} race={race} width={CARD_WIDTH} onPress={onPressRace} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.lg },
  loader: { height: 280, alignItems: 'center', justifyContent: 'center' },
  track: { paddingHorizontal: spacing.xl, gap: spacing.md, paddingVertical: spacing.xs },
});
