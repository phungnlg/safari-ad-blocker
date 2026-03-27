import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useStore } from '../src/store/useStore';

export default function RootLayout() {
  const hydrate = useStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen
          name="settings"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Settings',
          }}
        />
        <Stack.Screen
          name="whitelist"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Whitelist',
          }}
        />
        <Stack.Screen
          name="stats"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Statistics',
          }}
        />
      </Stack>
    </>
  );
}
