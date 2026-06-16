import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { ComponentProps, useCallback, useRef } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_ITEMS } from '@/shared/config';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from '@/shared/ui';

type BottomTabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const PILL_PADDING = 6;
const TAB_HEIGHT = 44;
const INDICATOR_SPRING = { mass: 0.6, damping: 16, stiffness: 180 };

/**
 * Floating glass tab bar, App-Store style: a frosted capsule with a single
 * accent oval that slides — and stretches — under the active tab. The active
 * tab reveals its label so its highlight becomes a wide pill (타원), inactive
 * tabs collapse to icon-only. Each tap springs the icon for tactile feedback.
 */
export function GlassTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Latest measured frame of every tab, used to drive the sliding indicator.
  const layouts = useRef<Record<number, { x: number; width: number }>>({});
  const indicatorX = useSharedValue(0);
  const indicatorW = useSharedValue(0);
  const ready = useSharedValue(0);

  const moveIndicator = useCallback(
    (index: number) => {
      const frame = layouts.current[index];
      if (!frame) return;
      indicatorX.value = withSpring(frame.x, INDICATOR_SPRING);
      indicatorW.value = withSpring(frame.width, INDICATOR_SPRING);
      ready.value = withTiming(1, { duration: 200 });
    },
    [indicatorX, indicatorW, ready],
  );

  const onTabLayout = useCallback(
    (index: number, e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      layouts.current[index] = { x, width };
      if (index === state.index) moveIndicator(index);
    },
    [state.index, moveIndicator],
  );

  const indicatorStyle = useAnimatedStyle(() => ({
    width: indicatorW.value,
    opacity: ready.value,
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <Animated.View
      entering={FadeIn.duration(500).delay(120)}
      style={[styles.wrap, { bottom: insets.bottom + spacing.md }]}
      pointerEvents="box-none"
    >
      <View style={styles.pill}>
        <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, styles.pillFill]} />

        {/* Sliding accent oval that lives behind the active tab. */}
        <Animated.View style={[styles.indicator, indicatorStyle]} pointerEvents="none">
          <LinearGradient
            colors={[colors.accentStrong, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        {state.routes.map((route, index) => {
          const meta = TAB_ITEMS.find((t) => t.name === route.name);
          if (!meta) return null;
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabButton
              key={route.key}
              meta={meta}
              focused={focused}
              onPress={onPress}
              onLayout={(e) => onTabLayout(index, e)}
            />
          );
        })}
      </View>
    </Animated.View>
  );
}

interface TabButtonProps {
  meta: (typeof TAB_ITEMS)[number];
  focused: boolean;
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
}

function TabButton({ meta, focused, onPress, onLayout }: TabButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      onPressIn={() => {
        scale.value = withSpring(0.86, { mass: 0.4, damping: 12, stiffness: 260 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { mass: 0.4, damping: 12, stiffness: 260 });
      }}
      accessibilityRole="button"
      accessibilityState={focused ? { selected: true } : {}}
      accessibilityLabel={meta.label}
    >
      <Animated.View
        layout={LinearTransition.springify().damping(18).mass(0.6)}
        style={[styles.tab, focused && styles.tabActive]}
      >
        <Animated.View style={animatedStyle}>
          <Ionicons
            name={focused ? meta.iconActive : meta.icon}
            size={21}
            color={focused ? colors.white : colors.fgMuted}
          />
        </Animated.View>
        {focused && (
          <Animated.View entering={FadeIn.duration(220)} exiting={FadeOut.duration(120)}>
            <AppText variant="caption" tone="inverse" style={styles.label}>
              {meta.label}
            </AppText>
          </Animated.View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    padding: PILL_PADDING,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorderStrong,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },
  pillFill: { backgroundColor: 'rgba(18,18,20,0.55)' },
  indicator: {
    position: 'absolute',
    top: PILL_PADDING,
    height: TAB_HEIGHT,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  tab: {
    height: TAB_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
  },
  tabActive: { paddingHorizontal: 18 },
  label: { fontWeight: '700', letterSpacing: -0.2 },
});
