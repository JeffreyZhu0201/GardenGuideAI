/*
 * @Date: 2025-09-02 16:01:12
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-04 16:39:18
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/LikePage.tsx
 * @Description: 
 */


import { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import Card from '@/components/Card';
import useStore from './store/store';
import { router, useFocusEffect } from 'expo-router';
import { getUsersLikes } from '@/network/likeApi';

interface Post {
    id: string;
    image_path: string;
    content: string;
    email: string;
    like_count: number;
    created_at: string;
}

export default function LikePage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token, setHeaderTitle, userInfo } = useStore()

    const [postIDList, setPostIDList] = useState<Post[]>([])

    useFocusEffect(
        useCallback(() => {
            setHeaderTitle('Like');
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
                const response = await getUsersLikes(userInfo?.email || "null", token || "null");
                if (response) {
                    console.log(response.likes)
                    setPostIDList(response.likes)
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
    }, []);

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
            {postIDList.map((item) => (
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