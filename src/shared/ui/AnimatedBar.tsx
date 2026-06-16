import { useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { colors, radius } from '@/shared/theme';

interface AnimatedBarProps {
  /** Fill fraction 0..1. */
  fraction: number;
  /** 'vertical' grows up (bar charts), 'horizontal' grows right (progress). */
  orientation?: 'vertical' | 'horizontal';
  /** Track thickness — height for horizontal, width for vertical. */
  thickness?: number;
  /** Stagger delay (ms). */
  delay?: number;
  gradient?: readonly [string, string];
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
  rounded?: boolean;
}

/**
 * A single animated bar/progress fill that grows from zero on mount. Shared by
 * the activity charts and progress meters. Pure-View based (no SVG dependency).
 */
export function AnimatedBar({
  fraction,
  orientation = 'horizontal',
  thickness = 10,
  delay = 0,
  gradient = [colors.accentStrong, colors.accent],
  trackColor = colors.glassBg,
  style,
  rounded = true,
}: AnimatedBarProps) {
  const grow = useSharedValue(0);
  const target = Math.max(0, Math.min(1, fraction));

  useEffect(() => {
    grow.value = withDelay(
      delay,
      withTiming(target, { duration: 900, easing: Easing.out(Easing.cubic) }),
    );
  }, [target, delay, grow]);

  const fillStyle = useAnimatedStyle(() =>
    orientation === 'vertical'
      ? { height: `${grow.value * 100}%` }
      : { width: `${grow.value * 100}%` },
  );

  const isVertical = orientation === 'vertical';
  const br = rounded ? radius.pill : 0;

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor: trackColor,
          borderRadius: br,
          justifyContent: isVertical ? 'flex-end' : 'center',
        },
        isVertical ? { width: thickness, height: '100%' } : { height: thickness, width: '100%' },
        style,
      ]}
    >
      <Animated.View style={[styles.fill, { borderRadius: br }, fillStyle]}>
        <LinearGradient
          colors={gradient}
          start={isVertical ? { x: 0, y: 1 } : { x: 0, y: 0 }}
          end={isVertical ? { x: 0, y: 0 } : { x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden' },
  fill: { overflow: 'hidden' },
});
