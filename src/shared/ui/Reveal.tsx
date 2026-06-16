import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface RevealProps {
  children: ReactNode;
  /** Position in a list — drives the stagger delay. */
  index?: number;
  /** Extra delay (ms) added on top of the per-index stagger. */
  delay?: number;
  /** Per-item stagger step (ms). */
  step?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Entrance wrapper: fades + lifts its content into place on mount, staggered
 * by `index`. Used to bring screens to life as they appear.
 */
export function Reveal({ children, index = 0, delay = 0, step = 65, style }: RevealProps) {
  return (
    <Animated.View
      style={style}
      entering={FadeInDown.duration(460)
        .delay(delay + index * step)
        .springify()
        .damping(20)
        .mass(0.7)}
    >
      {children}
    </Animated.View>
  );
}
