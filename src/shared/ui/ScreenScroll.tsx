import { ReactNode } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FLOATING_TAB_CLEARANCE } from '@/shared/config';
import { spacing } from '@/shared/theme';
import { ScreenBackground } from './ScreenBackground';

/**
 * Standard scrollable tab screen: gradient backdrop + a ScrollView that
 * insets for the status bar (top) and the floating glass tab bar (bottom).
 */
export function ScreenScroll({
  children,
  contentStyle,
}: {
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}) {
  const insets = useSafeAreaInsets();
  return (
    <ScreenBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: insets.bottom + FLOATING_TAB_CLEARANCE + spacing.lg,
            gap: spacing.xl,
          },
          contentStyle,
        ]}
      >
        {children}
      </ScrollView>
    </ScreenBackground>
  );
}
