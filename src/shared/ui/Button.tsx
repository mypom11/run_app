import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText } from './AppText';

type Variant = 'primary' | 'glass' | 'ghost';
type Size = 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const pad = size === 'lg' ? styles.padLg : styles.padMd;
  const isPrimary = variant === 'primary';

  const inner = (
    <View style={styles.row}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.black : colors.fg} />
      ) : (
        <>
          <AppText variant="title" tone={isPrimary ? 'inverse' : 'default'} style={isPrimary && styles.primaryLabel}>
            {label}
          </AppText>
          {icon}
        </>
      )}
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        pad,
        variant === 'glass' && styles.glass,
        variant === 'ghost' && styles.ghost,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {isPrimary && (
        <LinearGradient
          colors={[colors.accentStrong, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  padMd: { paddingVertical: 12, paddingHorizontal: spacing.xl },
  padLg: { paddingVertical: 16, paddingHorizontal: spacing['2xl'] },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  primaryLabel: { color: colors.black },
  glass: {
    backgroundColor: colors.glassBgStrong,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorderStrong,
  },
  ghost: { backgroundColor: 'transparent' },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.5 },
});
