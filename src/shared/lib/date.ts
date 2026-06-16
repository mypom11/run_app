/** Date helpers used across the app — framework-agnostic. */

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Whole days from today until `date` (negative if past). null on bad input. */
export function daysUntil(date: string | null): number | null {
  if (!date) return null;
  const target = new Date(date);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  const a = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  const b = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((a - b) / MS_PER_DAY);
}

/** "D-12" / "D-DAY" / "종료" style label for a race date. */
export function dDayLabel(date: string | null): string {
  const d = daysUntil(date);
  if (d === null) return '';
  if (d === 0) return 'D-DAY';
  if (d < 0) return '종료';
  return `D-${d}`;
}

/** "6월 21일 (토)" style short Korean date. */
export function formatKoreanDate(date: string | null): string {
  if (!date) return '날짜 미정';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '날짜 미정';
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${weekday})`;
}
