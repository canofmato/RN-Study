import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomSpace = Math.max(insets.bottom, 20);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#602BFF',
        tabBarInactiveTintColor: '#8F82B8',
        tabBarStyle: {
          height: 64 + bottomSpace,
          paddingTop: 8,
          paddingBottom: bottomSpace,
          borderTopWidth: 0,
          backgroundColor: '#FFF',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: 'Weather',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cloud.sun.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
