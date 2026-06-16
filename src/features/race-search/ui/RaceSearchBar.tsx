import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { RACE_EVENTS, RACE_EVENT_LABEL, type RaceEvent } from '@/entities/race';
import { colors, radius, spacing } from '@/shared/theme';
import { AppText, Segmented } from '@/shared/ui';
import { REGIONS, type RaceFilterState } from '../model/filters';

interface RaceSearchBarProps {
  value: RaceFilterState;
  onChange: (next: RaceFilterState) => void;
}

export function RaceSearchBar({ value, onChange }: RaceSearchBarProps) {
  const toggleEvent = (e: RaceEvent) => {
    const has = value.events.includes(e);
    onChange({ ...value, events: has ? value.events.filter((x) => x !== e) : [...value.events, e] });
  };

  return (
    <View style={styles.root}>
      {/* search input */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.fgMuted} />
        <TextInput
          value={value.keyword}
          onChangeText={(t) => onChange({ ...value, keyword: t.slice(0, 40) })}
          placeholder="대회명 / 지역으로 검색"
          placeholderTextColor={colors.fgSubtle}
          selectionColor={colors.accent}
          style={styles.input}
        />
        {!!value.keyword && (
          <Pressable onPress={() => onChange({ ...value, keyword: '' })} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.fgMuted} />
          </Pressable>
        )}
      </View>

      {/* region chips */}
      <Segmented
        value={value.region}
        options={REGIONS.map((r) => ({ value: r.value, label: r.label }))}
        onChange={(region) => onChange({ ...value, region })}
      />

      {/* event toggles */}
      <View style={styles.events}>
        <AppText variant="caption" tone="subtle" style={styles.eventsLabel}>
          종목
        </AppText>
        <View style={styles.eventChips}>
          {RACE_EVENTS.map((e) => {
            const active = value.events.includes(e);
            return (
              <Pressable
                key={e}
                onPress={() => toggleEvent(e)}
                style={[styles.eventChip, active && styles.eventChipActive]}
              >
                <AppText variant="caption" tone={active ? 'inverse' : 'muted'}>
                  {RACE_EVENT_LABEL[e]}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.md },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    height: 48,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  input: { flex: 1, color: colors.fg, fontSize: 15 },
  events: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg },
  eventsLabel: { textTransform: 'uppercase' },
  eventChips: { flexDirection: 'row', gap: spacing.sm, flex: 1 },
  eventChip: {
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.glassBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  eventChipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
});
