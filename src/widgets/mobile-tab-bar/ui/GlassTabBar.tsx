import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_ITEMS } from '@/shared/config';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from '@/shared/ui';

/** The props expo-router passes to a custom `tabBar` renderer. */
type BottomTabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

/**
 * Floating glass capsule tab bar — ported from the web `MobileTabBar`.
 * A `glass-strong` rounded pill centered above the safe-area inset; the
 * active tab gets a solid orange pill.
 */
export function GlassTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { bottom: insets.bottom + spacing.md }]} pointerEvents="box-none">
      <View style={styles.pill}>
        <BlurView intensity={48} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, styles.pillFill]} />
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
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[styles.tab, focused && styles.tabActive]}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={meta.label}
            >
              <Ionicons
                name={focused ? meta.iconActive : meta.icon}
                size={20}
                color={focused ? colors.white : colors.fgMuted}
              />
              <AppText
                variant="overline"
                tone={focused ? 'inverse' : 'muted'}
                style={styles.label}
              >
                {meta.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    padding: 6,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorderStrong,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },
  pillFill: { backgroundColor: 'rgba(20,20,22,0.55)' },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    minWidth: 58,
  },
  tabActive: { backgroundColor: colors.accent },
  label: { textTransform: 'none', letterSpacing: 0 },
});
