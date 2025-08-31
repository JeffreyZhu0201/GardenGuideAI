/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-30 00:43:57
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 08:06:27
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/(tabs)/index.tsx
 * @Description: 首页
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */
import { useCallback, useState } from 'react';
//  import { CameraView, useCameraPermissions } from 'expo-camera';
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { identifyPlant } from '@/network/identifyApi';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useFocusEffect } from 'expo-router';
import  useStore from '@/app/store/store';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function HomeScreen() {
  const { setHeaderTitle } = useStore();

  // 标题设置
  useFocusEffect(
    useCallback(() => {
      setHeaderTitle("首页");
    }, [setHeaderTitle])
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}>
      <></>
    </ScrollView>
  );
}

// 样式扩展
const styles = StyleSheet.create({
  container: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
