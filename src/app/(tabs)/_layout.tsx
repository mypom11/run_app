import { Tabs } from 'expo-router';

import { TAB_ITEMS } from '@/shared/config';
import { colors } from '@/shared/theme';
import { GlassTabBar } from '@/widgets/mobile-tab-bar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bgBase },
      }}
    >
      {TAB_ITEMS.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.label }} />
      ))}
    </Tabs>
  );
}
