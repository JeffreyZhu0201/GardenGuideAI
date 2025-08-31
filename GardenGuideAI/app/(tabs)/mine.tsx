/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 01:12:40
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 01:45:55
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/(tabs)/mine.tsx
 * @Description: 我的页面
 * 
 * Copyright (c) 2025 by ${Jeffrey Zhu}, All Rights Reserved. 
 */

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStore } from '@/app/store/store';
import { useCallback, useEffect } from 'react';
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {

    const { setHeaderTitle } = useStore();
      // 在 useEffect 中更新标题
    useFocusEffect(
        useCallback(() => {
            setHeaderTitle("我的");
        }, [setHeaderTitle]) // 添加依赖项
    );
      
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedText>123</ThemedText>
        <ThemedText>456</ThemedText>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
});
