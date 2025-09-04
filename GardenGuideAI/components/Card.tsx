/* @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 *
 * @Date: 2025-08-31 14:22:02
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 16:41:43
 * @FilePath: /GardenGuideAI/GardenGuideAI/components/Card.tsx
 * @Description: 
 *
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved.
 */

import { useState } from 'react';
import { View, StyleSheet, useColorScheme, Dimensions, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { SystemConfig } from '@/constants/SystemConfig';
import { Image } from 'expo-image'
import { Link, useRouter } from 'expo-router';
import { ThemedView } from './ThemedView';
import { addLike } from '@/network/postApi';
import useStore from '@/app/store/store';
import { createLike } from '@/network/likeApi';

const customStyles = {
  // 标题样式
  heading1: {
    fontSize: 16,
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
    color: '#333', // 文字颜色
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


const { width } = Dimensions.get('window');

const Card = ({ id, email, image, content, like_count }: { id: string, email: string, image: string; content: string, like_count: number }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const [clicked, setClicked] = useState(false)
  const [likes, setLikes] = useState(like_count)
  const { token } = useStore()

  const router = useRouter();
  const getMarkdownPreview = (markdownContent: string) => {
    if (!markdownContent) return '';
    const lines = markdownContent.trim().split('\n').filter(line => line.trim() !== '');
    return lines.slice(0, 2).join('\n');
  };

  const contentPreview = getMarkdownPreview(content);

  const dynamicStyles = {
    cardBackground: {
      backgroundColor: colorScheme === 'dark' ? Colors.dark.card : Colors.light.card,
    },
  };

  const addLikeFunc = async () => {
    if (!token) {
      alert('Please Login!')
      return;
    }
    setClicked(!clicked)
    setLikes((likes == like_count) ? like_count + 1 : like_count)
    try {
      const response = await addLike(id, token as string);
      if (response && response.data) {
        console.log(response)
      }
      const res = await createLike(email, id, token)
      if (res) {
        console.log(res)
      }
    }
    catch (err) {
      console.error('Error fetching posts:', err);
    }
  }

  return (
    <Link href={{
      pathname: '/DetailPage/[content]',
      params: { content: content }
    }} style={{margin:6}}>
      <View style={styles.container}>
        <View style={[styles.contentWrapper, dynamicStyles.cardBackground]}>
          <Image
            source={SystemConfig.IMAGE_SOURCE + image}
            style={styles.image}
            accessibilityLabel="Card content image"
          />
          <ThemedText style={styles.contentContainer}>
            <Markdown style={customStyles as any}>{contentPreview}</Markdown>
          </ThemedText>
          <ThemedView>
            <ThemedView style={{ flex: 1, marginTop: 32 }}>
              <Image
                source={require("@/assets/icons/right.png")}
                style={[styles.arrowIcon, { position: 'absolute', right: 5 }]}
                accessibilityLabel="Navigate to details"
              />
            </ThemedView>
            <TouchableOpacity onPress={() => { addLikeFunc() }}>
              <ThemedView style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                {
                  (clicked) ? (<Image source={require("@/assets/icons/heart.png")} style={{ width: 16, height: 16 }}></Image>) : (<Image source={require("@/assets/icons/heart (1).png")} style={{ width: 16, height: 16 }}></Image>)
                }
                <ThemedText>
                  {likes}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: '100%',
    alignItems: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 10,
    width: width * 0.95, // 使用屏幕宽度百分比
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 20,
    padding: 12,
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
});

export default Card;
