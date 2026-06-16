import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText, Button, Pill } from '@/shared/ui';

interface HomeHeroProps {
  onPressCta?: () => void;
}

/** Hero card — full-bleed image, season pill, bold headline, primary CTA. */
export function HomeHero({ onPressCta }: HomeHeroProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://picsum.photos/seed/runable-hero-2/1400/1700' }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.45)', 'rgba(5,5,7,0.35)', 'rgba(5,5,7,0.96)']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      {/* accent glow bottom */}
      <View pointerEvents="none" style={styles.glow}>
        <LinearGradient colors={[colors.accentSoft, 'transparent']} style={StyleSheet.absoluteFill} />
      </View>

      <View style={styles.content}>
        <Pill label="SEASON 2026 · 가을 시즌 오픈" tone="glass" />
        <View style={styles.headline}>
          <AppText variant="display" tone="inverse">
            달리자,
          </AppText>
          <AppText variant="display" tone="accent">
            나답게.
          </AppText>
        </View>
        <AppText variant="body" tone="muted" style={styles.sub}>
          월드 메이저부터 한강 5K까지, 다음 출발선이 여기 있습니다.
        </AppText>
        <Button
          label="대회 캘린더"
          size="lg"
          onPress={onPressCta}
          icon={<Ionicons name="arrow-forward" size={18} color={colors.black} />}
          style={styles.cta}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 460,
    marginHorizontal: spacing.lg,
    borderRadius: radius.xl,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  glow: { position: 'absolute', bottom: -120, left: 0, right: 0, height: 260 },
  content: { padding: spacing.xl, gap: spacing.md },
  headline: { marginTop: spacing.xs },
  sub: { maxWidth: 280 },
  cta: { alignSelf: 'flex-start', marginTop: spacing.sm },
});
