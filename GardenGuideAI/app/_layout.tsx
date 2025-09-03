/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-30 00:43:57
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 20:59:44
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/_layout.tsx
 * @Description: 应用根布局
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import useStore from '@/app/store/store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { headerTitle } = useStore();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: true, headerTitle: headerTitle || "GardenGuideAI" }} />
        <Stack.Screen name="LoginPage" options={{ headerShown: true }} />
        <Stack.Screen name="RegisterPage" options={{ headerShown: true }} />

        <Stack.Screen name="CameraPage" options={{ headerShown: true, headerTitle: "Camera" }} />
        <Stack.Screen name="PostPage" options={{ headerShown: true, headerTitle: "Post" }} />

        <Stack.Screen name="DetailPage/[content]" options={{ title:"Detail",headerShown: true, headerTitle: "Post Detail" }} />

        <Stack.Screen name="HistoryPage" options={{ headerShown: true, headerTitle: "History" }} />
        <Stack.Screen name="LikePage" options={{ headerShown: true, headerTitle: "Like" }} />

        <Stack.Screen name="SettingsPage" options={{ headerShown: true, headerTitle: "Settings" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
