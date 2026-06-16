import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText, GlassCard } from '@/shared/ui';
import {
  PRESETS,
  paceSecToSpeed,
  paceSecondsToString,
  speedToPaceSec,
  totalSecondsToHms,
  totalTimeSec,
} from '../model/pace';

export function PaceCalculator() {
  return (
    <View style={styles.stack}>
      <PaceBlock />
      <TreadmillBlock />
    </View>
  );
}

function PaceBlock() {
  const [distance, setDistance] = useState('10');
  const [paceMin, setPaceMin] = useState('5');
  const [paceSec, setPaceSec] = useState('30');

  const result = useMemo(() => {
    const d = Number(distance) || 0;
    const totalPaceSec = (Number(paceMin) || 0) * 60 + (Number(paceSec) || 0);
    const total = totalTimeSec(d, totalPaceSec);
    const speed = paceSecToSpeed(totalPaceSec);
    return {
      time: totalSecondsToHms(total),
      pace: paceSecondsToString(totalPaceSec),
      speed: speed > 0 ? speed.toFixed(2) : '—',
    };
  }, [distance, paceMin, paceSec]);

  return (
    <GlassCard style={styles.card}>
      <Kicker icon="timer-outline" label="페이스 계산" />
      <AppText variant="h2">거리 + 페이스 → 완주 시간</AppText>

      <View style={styles.fields}>
        <Field
          label="거리 (km)"
          value={distance}
          onChangeText={setDistance}
          right={
            <View style={styles.presets}>
              {PRESETS.map((p) => (
                <Pressable
                  key={p.label}
                  onPress={() => setDistance(String(p.km))}
                  style={styles.preset}
                >
                  <AppText variant="overline" tone="muted" style={styles.presetLabel}>
                    {p.label}
                  </AppText>
                </Pressable>
              ))}
            </View>
          }
        />
        <View style={styles.row}>
          <Field label="페이스 (분/km)" value={paceMin} onChangeText={setPaceMin} style={styles.flex} />
          <Field label="페이스 (초)" value={paceSec} onChangeText={setPaceSec} style={styles.flex} />
        </View>
      </View>

      <View style={styles.stats}>
        <Stat label="완주 시간" value={result.time} primary />
        <Stat label="페이스" value={result.pace} />
        <Stat label="속도" value={`${result.speed} km/h`} />
      </View>
    </GlassCard>
  );
}

function TreadmillBlock() {
  const [speedKmh, setSpeedKmh] = useState('10');
  const speed = Number(speedKmh) || 0;
  const paceSec = speedToPaceSec(speed);

  return (
    <GlassCard style={styles.card}>
      <Kicker icon="speedometer-outline" label="트레드밀 변환" />
      <AppText variant="h2">트레드밀 속도 → 페이스</AppText>

      <View style={styles.fields}>
        <Field label="트레드밀 속도 (km/h)" value={speedKmh} onChangeText={setSpeedKmh} />
      </View>

      <View style={styles.stats}>
        <Stat label="페이스" value={paceSecondsToString(paceSec)} primary />
        <Stat label="10K 예상" value={totalSecondsToHms(10 * paceSec)} />
        <Stat label="하프 예상" value={totalSecondsToHms(21.0975 * paceSec)} />
      </View>

      <AppText variant="caption" tone="subtle" style={styles.note}>
        실제 야외 러닝은 노면·바람·고도에 따라 페이스가 5~10초/km 더 느릴 수 있습니다.
      </AppText>
    </GlassCard>
  );
}

function Kicker({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.kicker}>
      <Ionicons name={icon} size={15} color={colors.accent} />
      <AppText variant="overline" tone="accent">
        {label}
      </AppText>
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
  right,
  style,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  right?: React.ReactNode;
  style?: object;
}) {
  return (
    <View style={style}>
      <View style={styles.fieldHead}>
        <AppText variant="caption" tone="muted">
          {label}
        </AppText>
        {right}
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        style={styles.input}
        placeholderTextColor={colors.fgSubtle}
        selectionColor={colors.accent}
      />
    </View>
  );
}

function Stat({ label, value, primary }: { label: string; value: string; primary?: boolean }) {
  return (
    <View style={styles.flex}>
      <AppText variant="overline" tone="subtle">
        {label}
      </AppText>
      <AppText
        variant={primary ? 'h1' : 'h2'}
        tone={primary ? 'accent' : 'default'}
        style={styles.statValue}
      >
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.lg, paddingHorizontal: spacing.lg },
  card: { padding: spacing.xl, gap: spacing.md },
  kicker: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  fields: { gap: spacing.lg, marginTop: spacing.xs },
  row: { flexDirection: 'row', gap: spacing.md },
  flex: { flex: 1 },
  fieldHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  input: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    paddingHorizontal: spacing.md,
    color: colors.fg,
    fontSize: 17,
    fontVariant: ['tabular-nums'],
  },
  presets: { flexDirection: 'row', gap: 4 },
  preset: {
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 4,
    paddingHorizontal: 9,
  },
  presetLabel: { textTransform: 'none' },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.glassBorder,
    paddingTop: spacing.lg,
    marginTop: spacing.xs,
  },
  statValue: { marginTop: 4, fontVariant: ['tabular-nums'] },
  note: { lineHeight: 17 },
});
