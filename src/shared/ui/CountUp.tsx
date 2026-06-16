import { useEffect } from 'react';
import { StyleProp, TextInput, TextStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface CountUpProps {
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  style?: StyleProp<TextStyle>;
}

/**
 * Number that tweens from 0 → `value` on the UI thread when it mounts or the
 * target changes. Renders through a read-only TextInput so the digits can be
 * driven by an animated prop without re-rendering React on every frame.
 */
export function CountUp({
  value,
  decimals = 0,
  duration = 1000,
  prefix = '',
  suffix = '',
  style,
}: CountUpProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [value, duration, progress]);

  const animatedProps = useAnimatedProps(() => {
    const text = `${prefix}${progress.value.toFixed(decimals)}${suffix}`;
    return { text, defaultValue: text } as { text: string; defaultValue: string };
  });

  return (
    <AnimatedTextInput
      editable={false}
      pointerEvents="none"
      underlineColorAndroid="transparent"
      style={style}
      animatedProps={animatedProps}
    />
  );
}
