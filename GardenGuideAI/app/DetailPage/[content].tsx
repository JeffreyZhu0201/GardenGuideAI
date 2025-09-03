/*
 * @Date: 2025-09-03 19:13:46
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 20:58:53
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/DetailPage/[content].tsx
 * @Description: 
 */



/*
 * @Date: 2025-09-02 20:17:01
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 16:54:28
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/PostPage.tsx
 * @Description: 帖子页面
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useStore from '@/app/store/store'; // 请根据你的实际路径修改
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';

import { useLocalSearchParams } from 'expo-router';

const markdownItInstance = MarkdownIt({ typographer: true }).set({ breaks: true }); // 启用 breaks 选项

const customStyles = {
  // 标题样式
  heading1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: 14,
    color: '#333', // 文字颜色
    fontWeight: '300',
    marginBottom: 15,
  },
  // 段落样式
  paragraph: {
    fontSize: 14,
    color: '#555555ff', // 文字颜色
    fontWeight: '300',
    marginBottom: 15,
  },
  // 链接样式
  link: {
    color: 'purple',
    textDecorationLine: 'underline',
  },
  // 粗体样式
  strong: {
    fontWeight: 'bold',
    color: 'green', // 可以改变加粗文字的颜色
  },
};

export default function DetailPage() {
    const { setHeaderTitle, fileUri, token, userInfo } = useStore();

    // useFocusEffect(
    //     useCallback(() => {
    //         setHeaderTitle('Post');
    //     }, [setHeaderTitle])
    // );

    const { content }: { content: string } = useLocalSearchParams();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={{ marginBottom: 96, borderRadius: 8, padding: 16 }}>
                <Markdown markdownit={markdownItInstance} style={customStyles as any}>
                    {content}
                    {/* .replace(/\\n/g, '\n') */}
                </Markdown>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        paddingVertical: 16,
        gap: 24,
    },
    resultText: {
        fontSize: 24,
        paddingVertical: 16,
        paddingHorizontal: 8,
        fontWeight: 'bold',
    },
    deepSeekContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    PostBotton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        padding: 16,
        backgroundColor: 'transparent',
        alignItems: 'center'
    }
});