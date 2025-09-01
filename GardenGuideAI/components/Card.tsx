/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 14:22:02
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 00:35:28
 * @FilePath: /GardenGuideAI/GardenGuideAI/components/Card.tsx
 * @Description: 
 *
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved.
 */

import React from 'react';
import { View, Image, StyleSheet, useColorScheme } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

interface CardProps {
  title: string;
  image: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, image, content }) => {
  const colorScheme = useColorScheme() ?? 'light';

  // Function to get the first two lines of markdown as a preview
  const getMarkdownPreview = (markdownContent: string) => {
    if (!markdownContent) return '';
    // Split by newline, filter out empty lines, and take the first 2.
    const lines = markdownContent.trim().split('\n').filter(line => line.trim() !== '');
    return lines.slice(0, 2).join('\n');
  };

  const contentPreview = getMarkdownPreview(content);

  return (
    <View style={[styles.card, { backgroundColor: Colors[colorScheme].card, shadowColor: Colors[colorScheme].text }]}>
      <ThemedText type="subtitle">{title}</ThemedText>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Markdown style={{ body: { color: Colors[colorScheme].text } }}>{contentPreview}</Markdown>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '95%',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  contentContainer: {
    // Container for markdown content
  },
});

export default Card;
