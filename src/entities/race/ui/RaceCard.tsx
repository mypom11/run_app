import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { dDayLabel, formatKoreanDate } from '@/shared/lib';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText, PressableScale } from '@/shared/ui';
import { RACE_EVENT_LABEL, RaceEvent, type NormalizedRace } from '../model/types';

interface RaceCardProps {
  race: NormalizedRace;
  onPress?: (race: NormalizedRace) => void;
  /** Fixed width for horizontal carousels; omit to fill parent. */
  width?: number;
}

export const RaceCard = memo(function RaceCard({ race, onPress, width }: RaceCardProps) {
  const dday = dDayLabel(race.startDate);

  return (
    <PressableScale
      onPress={() => onPress?.(race)}
      scaleTo={0.97}
      style={[styles.card, width != null && { width }]}
    >
      <View style={styles.imageWrap}>
        <Image
          source={race.thumbnail ? { uri: race.thumbnail } : undefined}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={250}
        />
        <LinearGradient
          colors={['transparent', 'rgba(5,5,7,0.92)']}
          locations={[0.35, 1]}
          style={StyleSheet.absoluteFill}
        />
        {!!dday && (
          <View style={[styles.ddayBadge, dday === '종료' && styles.ddayMuted]}>
            <AppText variant="overline" tone="inverse">
              {dday}
            </AppText>
          </View>
        )}
        <View style={styles.imageFooter}>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={13} color={colors.fgMuted} />
            <AppText variant="caption" tone="muted" numberOfLines={1} style={styles.flex}>
              {race.location ?? '장소 미정'}
            </AppText>
          </View>
          <AppText variant="title" tone="inverse" numberOfLines={2}>
            {race.title}
          </AppText>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={13} color={colors.accent} />
          <AppText variant="caption" tone="muted">
            {formatKoreanDate(race.startDate)}
          </AppText>
        </View>
        <View style={styles.tags}>
          {race.events.slice(0, 4).map((e) => (
            <View key={e} style={styles.tag}>
              <AppText variant="overline" tone="muted">
                {RACE_EVENT_LABEL[e as RaceEvent] ?? e}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </PressableScale>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.bgElevated,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  imageWrap: { height: 168, justifyContent: 'flex-end' },
  ddayBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  ddayMuted: { backgroundColor: 'rgba(120,120,128,0.6)' },
  imageFooter: { padding: spacing.lg, gap: 4 },
  body: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  flex: { flex: 1 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    borderRadius: radius.sm,
    backgroundColor: colors.glassBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
});
