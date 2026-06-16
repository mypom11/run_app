import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import type { WorkoutSource } from '@/entities/workout';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText, Button, GlassCard } from '@/shared/ui';

/**
 * Shows Apple Health connection state. When connected, a confirmation chip;
 * otherwise an explainer + connect button (demo data shown meanwhile).
 */
export function HealthConnectBanner({
  source,
  available,
  loading,
  onConnect,
}: {
  source: WorkoutSource;
  available: boolean;
  loading: boolean;
  onConnect: () => void;
}) {
  if (source === 'health') {
    return (
      <View style={styles.connected}>
        <Ionicons name="checkmark-circle" size={16} color={colors.success} />
        <AppText variant="caption" tone="muted">
          Apple 건강과 연동됨 · 실제 러닝 기록
        </AppText>
      </View>
    );
  }

  return (
    <GlassCard style={styles.card}>
      <View style={styles.head}>
        <View style={styles.icon}>
          <Ionicons name="heart" size={20} color={colors.accent} />
        </View>
        <View style={styles.flex}>
          <AppText variant="title">Apple 건강 연결</AppText>
          <AppText variant="caption" tone="muted">
            {available
              ? '건강 앱의 러닝 기록을 불러옵니다.'
              : '데모 데이터를 보는 중 · iOS 앱에서 실제 기록과 연동돼요.'}
          </AppText>
        </View>
      </View>
      <Button
        label={available ? 'Apple 건강 연결' : '데모 다시 불러오기'}
        variant={available ? 'primary' : 'glass'}
        loading={loading}
        onPress={onConnect}
        icon={
          available ? <Ionicons name="arrow-forward" size={16} color={colors.black} /> : undefined
        }
      />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: spacing.lg, padding: spacing.lg, gap: spacing.lg },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1, gap: 2 },
  icon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connected: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: spacing.xl,
  },
});
