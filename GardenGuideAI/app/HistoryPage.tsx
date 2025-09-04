/*
 * @Date: 2025-09-02 15:59:13
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-04 16:37:46
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/HistoryPage.tsx
 * @Description: 账号页
 */


import { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import Card from '@/components/Card';
import { getUsersPosts } from '@/network/postApi';
import useStore from './store/store';
import { router, useFocusEffect } from 'expo-router';

interface Post {
  id: string;
  image_path: string;
  content: string;
  email: string;
  like_count: number;
  created_at: string;
}

export default function HistoryScreen() {
  // 定义状态来存储数据、加载状态和可能的错误
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token, setHeaderTitle, userInfo } = useStore()

  useFocusEffect(
    useCallback(() => {
      setHeaderTitle('History');
    }, [setHeaderTitle])
  );

  // 使用 useEffect 在组件挂载后执行数据获取
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!token) {
          alert("Please Login!")
          router.back()
          return;
        }
        const response = await getUsersPosts(userInfo?.email || "null", token || "null");
        if (response && response.data) {
          setPostsList(response.data);
        } else {
          setError('Received invalid response from server');
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        alert("Unknown Err...")
        router.back()
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // 空依赖数组确保此 effect 只在组件挂载后运行一次[6](@ref)

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {postsList.map((item) => (
        <Card key={item.id} id={item.id} email={item.email} image={item.image_path} content={item.content} like_count={item.like_count} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%'
  },
});