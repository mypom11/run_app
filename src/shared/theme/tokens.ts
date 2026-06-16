/**
 * Design tokens — Nike Run motif + glassmorphism + Apple refinement.
 * Dark-first, ported from the Runable web app's CSS custom properties.
 * Single source of truth for colors, radii, spacing and typography.
 */

export const colors = {
  // surfaces
  bgBase: '#0a0a0a',
  bgElevated: '#141414',
  bgGradientFrom: '#0b0b0c',
  bgGradientVia: '#111114',
  bgGradientTo: '#050507',

  // text
  fg: '#f5f5f7',
  fgMuted: 'rgba(245, 245, 247, 0.62)',
  fgSubtle: 'rgba(245, 245, 247, 0.42)',

  // accents — running orange
  accent: '#ff5a1f',
  accentStrong: '#ff7a3a',
  accentGlow: 'rgba(255, 90, 31, 0.55)',
  accentSoft: 'rgba(255, 90, 31, 0.12)',
  success: '#39ff7a',
  info: '#5ac8fa',

  // glass
  glassBg: 'rgba(255, 255, 255, 0.06)',
  glassBgStrong: 'rgba(255, 255, 255, 0.10)',
  glassBorder: 'rgba(255, 255, 255, 0.10)',
  glassBorderStrong: 'rgba(255, 255, 255, 0.18)',

  // misc
  black: '#000000',
  white: '#ffffff',
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

/**
 * Type scale tuned for a Nike-Run-style bold display look.
 * `display` weights lean heavy with tight tracking.
 */
export const typography = {
  display: {
    fontSize: 44,
    lineHeight: 46,
    fontWeight: '800' as const,
    letterSpacing: -1.5,
  },
  h1: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800' as const,
    letterSpacing: -1,
  },
  h2: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700' as const,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '500' as const,
  },
  overline: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
  },
} as const;

export const theme = { colors, radius, spacing, typography } as const;

export type AppTheme = typeof theme;
