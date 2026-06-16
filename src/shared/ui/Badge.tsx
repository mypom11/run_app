import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius } from '@/shared/theme';
import { AppText } from './AppText';

type Tone = 'glass' | 'accent';

/** Small label chip overlaid on imagery (event/category badges). */
export function Badge({
  label,
  tone = 'glass',
  style,
}: {
  label: string;
  tone?: Tone;
  style?: StyleProp<ViewStyle>;
}) {
  const isAccent = tone === 'accent';
  return (
    <View style={[styles.base, isAccent ? styles.accent : styles.glass, style]}>
      <AppText variant="overline" tone={isAccent ? 'inverse' : 'inverse'} style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderWidth: StyleSheet.hairlineWidth,
  },
  glass: { backgroundColor: 'rgba(0,0,0,0.4)', borderColor: colors.glassBorderStrong },
  accent: { backgroundColor: colors.accent, borderColor: colors.accent },
  label: { textTransform: 'none', letterSpacing: 0.3 },
});
