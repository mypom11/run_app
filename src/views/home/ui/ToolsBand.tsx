import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText, GlassCard } from '@/shared/ui';

type IconName = ComponentProps<typeof Ionicons>['name'];

const TOOLS: { key: string; title: string; desc: string; icon: IconName; route: string }[] = [
  { key: 'pace', title: '페이스 계산기', desc: '완주 시간 예측', icon: 'stopwatch-outline', route: '/activity?tab=pace' },
  { key: 'runtrip', title: '런트립', desc: '참가권 보장 패키지', icon: 'airplane-outline', route: '/runtrip' },
  { key: 'magazine', title: '매거진', desc: '트레이닝 인사이트', icon: 'book-outline', route: '/magazine' },
  { key: 'race', title: '대회 검색', desc: '월·종목·지역', icon: 'search-outline', route: '/race' },
];

export function ToolsBand({ onPressTool }: { onPressTool?: (route: string) => void }) {
  return (
    <View style={styles.grid}>
      {TOOLS.map((t) => (
        <Pressable
          key={t.key}
          onPress={() => onPressTool?.(t.route)}
          style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
        >
          <GlassCard style={styles.card}>
            <View style={styles.icon}>
              <Ionicons name={t.icon} size={20} color={colors.accentStrong} />
            </View>
            <AppText variant="title" numberOfLines={1}>
              {t.title}
            </AppText>
            <AppText variant="caption" tone="muted" numberOfLines={1}>
              {t.desc}
            </AppText>
          </GlassCard>
        </Pressable>
      ))}
    </View>
  );
}

const GAP = spacing.md;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    paddingHorizontal: spacing.lg,
  },
  cell: { width: '47.8%' },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  card: { padding: spacing.lg, gap: 4, minHeight: 120, justifyContent: 'center' },
  icon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
});
