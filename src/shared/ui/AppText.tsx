import { Text, TextProps, TextStyle } from 'react-native';

import { colors, typography } from '@/shared/theme';

type Variant = keyof typeof typography;
type Tone = 'default' | 'muted' | 'subtle' | 'accent' | 'inverse';

const TONE_COLOR: Record<Tone, string> = {
  default: colors.fg,
  muted: colors.fgMuted,
  subtle: colors.fgSubtle,
  accent: colors.accent,
  inverse: colors.white,
};

interface AppTextProps extends TextProps {
  variant?: Variant;
  tone?: Tone;
}

/**
 * Themed text primitive. `variant` picks a slot from the type scale,
 * `tone` picks a color. Defaults to body/default.
 */
export function AppText({
  variant = 'body',
  tone = 'default',
  style,
  ...rest
}: AppTextProps) {
  const base = typography[variant] as TextStyle;
  return <Text style={[base, { color: TONE_COLOR[tone] }, style]} {...rest} />;
}
