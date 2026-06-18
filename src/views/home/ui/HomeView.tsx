import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NormalizedRace } from '@/entities/race';
import { FLOATING_TAB_CLEARANCE } from '@/shared/config';
import { spacing } from '@/shared/theme';
import { Reveal, ScreenBackground } from '@/shared/ui';
import { FeaturedRaces } from './FeaturedRaces';
import { HomeHeader } from './HomeHeader';
import { HomeHero } from './HomeHero';
import { PaceCTA } from './PaceCTA';
import { ToolsBand } from './ToolsBand';

/** Home screen — Nike-Run-style composition of hero, tools and race carousel. */
export function HomeView() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const goRace = useCallback((_race?: NormalizedRace) => router.push('/race'), [router]);
  const goTool = useCallback((route: string) => router.push(route as never), [router]);
  const goPace = useCallback(() => router.push('/activity?tab=pace'), [router]);

  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.sm,
            paddingBottom: insets.bottom + FLOATING_TAB_CLEARANCE + spacing.lg,
          },
        ]}
      >
        <Reveal index={0}>
          <HomeHeader />
        </Reveal>
        <Reveal index={1}>
          <HomeHero onPressCta={goRace} />
        </Reveal>
        <Reveal index={2}>
          <ToolsBand onPressTool={goTool} />
        </Reveal>
        <Reveal index={3}>
          <FeaturedRaces onPressRace={goRace} onPressMore={goRace} />
        </Reveal>
        <Reveal index={4}>
          <PaceCTA onPress={goPace} />
        </Reveal>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing['2xl'] },
});
