import { PaceCalculator } from '@/features/pace-calculator';
import { ScreenHeader, ScreenScroll } from '@/shared/ui';

export function PaceCalculatorView() {
  return (
    <ScreenScroll>
      <ScreenHeader
        overline="TOOLS"
        title="페이스 계산기"
        subtitle="거리·페이스로 완주 시간을 구하고, 트레드밀 속도를 km당 페이스로 환산하세요."
      />
      <PaceCalculator />
    </ScreenScroll>
  );
}
