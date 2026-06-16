import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PressableScaleProps extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  /** Scale at the bottom of the press (default 0.96). */
  scaleTo?: number;
  style?: StyleProp<ViewStyle>;
}

const SPRING = { mass: 0.5, damping: 14, stiffness: 220 };

/**
 * Pressable that springs down on touch and back on release — the tactile
 * "push" feel used across cards and tappable surfaces.
 */
export function PressableScale({
  children,
  scaleTo = 0.96,
  style,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      onPressIn={() => {
        scale.value = withSpring(scaleTo, SPRING);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, SPRING);
      }}
      style={[style, animatedStyle]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
