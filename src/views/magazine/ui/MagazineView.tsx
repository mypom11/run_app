import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  ARTICLES,
  ARTICLE_CATEGORY_LABEL,
  ArticleCard,
  type ArticleCategory,
} from '@/entities/article';
import { spacing } from '@/shared/theme';
import { Reveal, ScreenHeader, ScreenScroll, Segmented, type SegmentOption } from '@/shared/ui';

type Filter = 'all' | ArticleCategory;

const FILTERS: SegmentOption<Filter>[] = [
  { value: 'all', label: '전체' },
  { value: 'training', label: ARTICLE_CATEGORY_LABEL.training },
  { value: 'nutrition', label: ARTICLE_CATEGORY_LABEL.nutrition },
  { value: 'gear', label: ARTICLE_CATEGORY_LABEL.gear },
  { value: 'guide', label: ARTICLE_CATEGORY_LABEL.guide },
  { value: 'interview', label: ARTICLE_CATEGORY_LABEL.interview },
  { value: 'lifestyle', label: ARTICLE_CATEGORY_LABEL.lifestyle },
];

export function MagazineView() {
  const [filter, setFilter] = useState<Filter>('all');

  const items = useMemo(
    () => (filter === 'all' ? ARTICLES : ARTICLES.filter((a) => a.category === filter)),
    [filter],
  );

  return (
    <ScreenScroll contentStyle={styles.content}>
      <Reveal index={0}>
        <ScreenHeader
          overline="MAGAZINE"
          title="러너 매거진"
          subtitle="더 잘 달리기 위한 가이드, 영양, 장비 그리고 사람들의 이야기."
        />
      </Reveal>
      <Reveal index={1}>
        <Segmented value={filter} options={FILTERS} onChange={setFilter} />
      </Reveal>
      <View style={styles.list}>
        {items.map((a, i) => (
          <Reveal key={a.id} index={i} delay={120} step={55}>
            <ArticleCard article={a} />
          </Reveal>
        ))}
      </View>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.lg },
  list: { paddingHorizontal: spacing.lg, gap: spacing.lg, marginTop: spacing.xs },
});
