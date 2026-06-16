import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from '@/shared/ui';

/** Wide promo banner driving to the pace calculator. */
export function PaceCTA({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image
        source={{ uri: 'https://picsum.photos/seed/runable-pace-2/1200/600' }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={250}
      />
      <LinearGradient
        colors={['rgba(5,5,7,0.92)', 'rgba(5,5,7,0.55)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <View style={styles.kicker}>
          <Ionicons name="stopwatch-outline" size={14} color={colors.accent} />
          <AppText variant="overline" tone="accent">
            PACE CALCULATOR
          </AppText>
        </View>
        <AppText variant="h2" tone="inverse" style={styles.title}>
          내 페이스로{'\n'}완주 시간 알아보기
        </AppText>
        <View style={styles.link}>
          <AppText variant="caption" tone="inverse">
            계산기 열기
          </AppText>
          <Ionicons name="arrow-forward" size={14} color={colors.white} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    marginHorizontal: spacing.lg,
    borderRadius: radius.xl,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.92 },
  content: { padding: spacing.xl, gap: spacing.sm },
  kicker: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { lineHeight: 28 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
});
