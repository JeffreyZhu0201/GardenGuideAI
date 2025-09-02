/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-30 00:43:57
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 19:35:32
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/(tabs)/index.tsx
 * @Description: 首页
 *
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved.
 */
import { useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import useStore from '@/app/store/store';
import Card from '@/components/Card';

// Mock data representing posts from a plant enthusiast community
const mockData = [
  {
    id: '1',
    title: '求助！我的龟背竹叶子发黄了怎么办？',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=3132&auto=format&fit=crop',
    content: `
# 叶子发黄求助

大家好，这是我养了半年的龟背竹，最近发现底部的叶子开始变黄，而且有点软。
是不是水浇多了？还是缺什么肥料？求大神指点！
`,
  },
  {
    id: '2',
    title: '分享我的多肉小花园',
    image: 'https://images.unsplash.com/photo-1520429357367-74a8c84815a1?q=80&w=3132&auto=format&fit=crop',
    content: `
# 多肉花园

终于把阳台打造成了我梦想中的多肉花园！
每天看着这些小可爱心情都变好了。欢迎大家来交流养护经验。
`,
  },
  {
    id: '3',
    title: '新手入坑琴叶榕，记录一下',
    image: 'https://images.unsplash.com/photo-1591348122653-a3b897d1a309?q=80&w=3174&auto=format&fit=crop',
    content: `
# 琴叶榕成长日记

今天刚入手一盆琴叶榕，听说不太好养，有点紧张。
先放在客厅靠窗的位置，希望它能健康成长。以后会持续更新它的状态！
`,
  },
  {
    id: '4',
    title: '空气凤梨原来可以这么养！',
    image: 'https://images.unsplash.com/photo-1600448139338-a68a1423a437?q=80&w=3174&auto=format&fit=crop',
    content: `
# 空气凤梨养护技巧

一直以为空气凤梨只要喷喷水就行，结果差点养死。
后来才知道，定期泡水和保证通风才是关键！
`,
  },
];


export default function HomeScreen() {
  const { setHeaderTitle } = useStore();

  // Set header title when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setHeaderTitle('Community');
    }, [setHeaderTitle])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mockData.map((item) => (
        <Card key={item.id} title={item.title} image={item.image} content={item.content} />
      ))}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});
