import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/shared/theme';

/**
 * App-wide backdrop: a full-bleed base gradient plus soft accent "aurora"
 * blobs that span the entire width and breathe slowly. The glows are
 * intentionally edge-to-edge (not centered) so colour fills the whole screen.
 */
export function ScreenBackground({ children }: { children: ReactNode }) {
  const { width } = useWindowDimensions();
  const breathe = useSharedValue(0);

  useEffect(() => {
    breathe.value = withRepeat(
      withTiming(1, { duration: 7000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [breathe]);

  const topGlow = useAnimatedStyle(() => ({
    opacity: 0.55 + breathe.value * 0.35,
    transform: [{ scale: 1 + breathe.value * 0.06 }],
  }));

  const sideGlow = useAnimatedStyle(() => ({
    opacity: 0.25 + (1 - breathe.value) * 0.2,
  }));

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.bgGradientFrom, colors.bgGradientVia, colors.bgGradientTo]}
        style={StyleSheet.absoluteFill}
      />

      {/* Top accent aurora — full width, edge to edge. */}
      <Animated.View
        pointerEvents="none"
        style={[styles.topGlow, { width: width * 1.6, left: -width * 0.3 }, topGlow]}
      >
        <LinearGradient
          colors={[colors.accentGlow, colors.accentSoft, 'transparent']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Cool ambient wash bleeding from the lower side for depth. */}
      <Animated.View
        pointerEvents="none"
        style={[styles.sideGlow, { width: width * 1.4, right: -width * 0.35 }, sideGlow]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(90, 200, 250, 0.10)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgBase, overflow: 'hidden' },
  topGlow: {
    position: 'absolute',
    top: -180,
    height: 460,
    borderBottomLeftRadius: 600,
    borderBottomRightRadius: 600,
    overflow: 'hidden',
  },
  sideGlow: {
    position: 'absolute',
    top: '32%',
    height: 520,
    borderRadius: 600,
    overflow: 'hidden',
  },
});
