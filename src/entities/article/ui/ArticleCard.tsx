import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { formatDateShort } from '@/shared/lib';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText, Badge } from '@/shared/ui';
import { ARTICLE_CATEGORY_LABEL, type Article } from '../model/types';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'large';
  onPress?: (article: Article) => void;
}

export function ArticleCard({ article, variant = 'default', onPress }: ArticleCardProps) {
  const isLarge = variant === 'large';

  return (
    <Pressable
      onPress={() => onPress?.(article)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.imageWrap, isLarge ? styles.imageLarge : styles.imageDefault]}>
        <Image
          source={{ uri: article.cover }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={250}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.65)']}
          locations={[0.4, 1]}
          style={StyleSheet.absoluteFill}
        />
        <Badge label={ARTICLE_CATEGORY_LABEL[article.category]} style={styles.badge} />
      </View>
      <View style={styles.body}>
        <AppText variant={isLarge ? 'h2' : 'title'} numberOfLines={2}>
          {article.title}
        </AppText>
        <AppText variant="caption" tone="muted" numberOfLines={2} style={styles.excerpt}>
          {article.excerpt}
        </AppText>
        <View style={styles.meta}>
          <AppText variant="caption" tone="muted">
            {article.author}
          </AppText>
          <AppText variant="caption" tone="subtle">
            ·
          </AppText>
          <AppText variant="caption" tone="subtle">
            {formatDateShort(article.publishedAt)}
          </AppText>
          <AppText variant="caption" tone="subtle">
            ·
          </AppText>
          <View style={styles.read}>
            <Ionicons name="time-outline" size={12} color={colors.fgSubtle} />
            <AppText variant="caption" tone="subtle">
              {article.readMinutes}분
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.bgElevated,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.9 },
  imageWrap: { width: '100%', justifyContent: 'flex-start' },
  imageDefault: { aspectRatio: 16 / 10 },
  imageLarge: { aspectRatio: 16 / 10 },
  badge: { margin: spacing.md },
  body: { padding: spacing.lg, gap: spacing.sm },
  excerpt: { lineHeight: 18 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  read: { flexDirection: 'row', alignItems: 'center', gap: 3 },
});
