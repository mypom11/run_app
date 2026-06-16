import { StyleSheet, View } from 'react-native';

import { RUNTRIPS, RunTripCard } from '@/entities/runtrip';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText, Reveal, ScreenHeader, ScreenScroll } from '@/shared/ui';

export function RunTripView() {
  return (
    <ScreenScroll>
      <Reveal index={0}>
        <ScreenHeader
          overline="RUNTRIP"
          title="런트립"
          subtitle="참가권부터 항공·숙박까지 한 번에. 러너에게 필요한 디테일만 모았습니다."
        />
      </Reveal>
      <View style={styles.list}>
        {RUNTRIPS.map((t, i) => (
          <Reveal key={t.id} index={i} delay={100} step={70}>
            <RunTripCard trip={t} />
          </Reveal>
        ))}
      </View>
      <Reveal index={RUNTRIPS.length} delay={100} step={70}>
        <View style={styles.notice}>
          <AppText variant="caption" tone="muted" style={styles.noticeText}>
            모든 상품은 참가권 보장. 항공권 단독 구매 가능 여부와 단체 할인은 각 상품 상세에서 확인하세요.
            일정·가격은 출발 시점에 따라 변동될 수 있습니다.
          </AppText>
        </View>
      </Reveal>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: spacing.lg, gap: spacing.lg },
  notice: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.glassBgStrong,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorderStrong,
    padding: spacing.lg,
  },
  noticeText: { lineHeight: 19 },
});
