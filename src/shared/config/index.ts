import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

/** Runable.me public API (called directly from the app — no BFF in RN). */
export const RUNABLE_API_BASE = 'https://runable.me/next-api/index/v1';
export const RUNABLE_STORAGE_BASE = 'https://storage.runable.me';

type IconName = ComponentProps<typeof Ionicons>['name'];

/**
 * Vertical space the floating glass tab bar occupies above the safe-area
 * inset. Screens add this to their scroll content's bottom padding so the
 * last item clears the capsule.
 */
export const FLOATING_TAB_CLEARANCE = 84;

/** Bottom tab navigation — mirrors the web NAV_ITEMS. */
export const TAB_ITEMS: {
  name: string;
  label: string;
  icon: IconName;
  iconActive: IconName;
}[] = [
  { name: 'index', label: '홈', icon: 'home-outline', iconActive: 'home' },
  { name: 'activity', label: '기록', icon: 'fitness-outline', iconActive: 'fitness' },
  { name: 'race', label: '대회', icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'magazine', label: '매거진', icon: 'book-outline', iconActive: 'book' },
  { name: 'runtrip', label: '런트립', icon: 'airplane-outline', iconActive: 'airplane' },
];
