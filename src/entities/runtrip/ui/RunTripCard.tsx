import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { formatDateShort } from '@/shared/lib';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText, Badge, PressableScale } from '@/shared/ui';
import { priceLabel } from '../model/trips';
import type { RunTrip } from '../model/types';

export const RunTripCard = memo(function RunTripCard({ trip, onPress }: { trip: RunTrip; onPress?: (trip: RunTrip) => void }) {
  return (
    <PressableScale onPress={() => onPress?.(trip)} scaleTo={0.97} style={styles.card}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: trip.cover }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={250}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          locations={[0.35, 1]}
          style={StyleSheet.absoluteFill}
        />
        {!!trip.badges?.length && (
          <View style={styles.badges}>
            {trip.badges.map((b) => (
              <Badge key={b} label={b} tone={b === 'BEST' ? 'accent' : 'glass'} />
            ))}
          </View>
        )}
        <View style={styles.imageFooter}>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.85)" />
            <AppText variant="caption" tone="inverse">
              {trip.country} · {trip.destination}
            </AppText>
          </View>
          <AppText variant="h2" tone="inverse" numberOfLines={1}>
            {trip.raceName}
          </AppText>
        </View>
      </View>

      <View style={styles.body}>
        <AppText variant="caption" tone="muted" numberOfLines={2}>
          {trip.tagline}
        </AppText>
        <View style={styles.infoRow}>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={13} color={colors.fgMuted} />
            <AppText variant="caption" tone="muted">
              {formatDateShort(trip.startDate)} ~ {formatDateShort(trip.endDate)}
            </AppText>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="airplane-outline" size={13} color={colors.fgMuted} />
            <AppText variant="caption" tone="muted">
              {trip.nights}박
            </AppText>
          </View>
        </View>
        <View style={styles.priceRow}>
          <View>
            <AppText variant="overline" tone="subtle">
              FROM
            </AppText>
            <AppText variant="h2">{priceLabel(trip.priceFrom)}</AppText>
          </View>
          <View style={styles.cta}>
            <AppText variant="caption" tone="inverse">
              자세히
            </AppText>
            <Ionicons name="arrow-forward" size={13} color={colors.white} />
          </View>
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
  imageWrap: { aspectRatio: 4 / 3, justifyContent: 'flex-end' },
  badges: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  imageFooter: { padding: spacing.lg, gap: 4 },
  body: { padding: spacing.lg, gap: spacing.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
  },
});
