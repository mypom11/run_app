import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NormalizedRace } from '@/entities/race';
import { spacing } from '@/shared/theme';
import { ScreenBackground } from '@/shared/ui';
import { FeaturedRaces } from './FeaturedRaces';
import { HomeHeader } from './HomeHeader';
import { HomeHero } from './HomeHero';
import { PaceCTA } from './PaceCTA';
import { ToolsBand } from './ToolsBand';

/** Home screen — Nike-Run-style composition of hero, tools and race carousel. */
export function HomeView() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const goRace = (_race?: NormalizedRace) => router.push('/race');

  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.sm, paddingBottom: insets.bottom + spacing['3xl'] },
        ]}
      >
        <HomeHeader />
        <HomeHero onPressCta={goRace} />
        <ToolsBand onPressTool={(route) => router.push(route as never)} />
        <FeaturedRaces onPressRace={goRace} onPressMore={goRace} />
        <PaceCTA onPress={() => router.push('/pace')} />
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing['2xl'] },
});
