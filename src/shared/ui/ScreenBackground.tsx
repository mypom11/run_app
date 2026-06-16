import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/shared/theme';

/**
 * App-wide backdrop: vertical base gradient + a soft orange accent glow
 * bleeding from the top, echoing the web `body` radial gradients.
 */
export function ScreenBackground({ children }: { children: ReactNode }) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.bgGradientFrom, colors.bgGradientVia, colors.bgGradientTo]}
        style={StyleSheet.absoluteFill}
      />
      {/* accent glow, top */}
      <View pointerEvents="none" style={styles.glow}>
        <LinearGradient
          colors={[colors.accentSoft, 'transparent']}
          style={StyleSheet.absoluteFill}
        />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgBase },
  glow: {
    position: 'absolute',
    top: -120,
    left: -80,
    right: -80,
    height: 360,
    opacity: 0.7,
  },
});
