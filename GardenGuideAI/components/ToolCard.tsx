/*
 * @Date: 2025-09-02 14:44:38
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 20:16:11
 * @FilePath: /GardenGuideAI/GardenGuideAI/components/ToolCard.tsx
 * @Description: 工具卡片
 */


import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import useStore from '@/app/store/store';
import UserInfo from "@/components/UserInfo";
import { Button } from "@react-navigation/elements";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from "@/constants/User";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "./ui/IconSymbol";
import { RollInRight } from "react-native-reanimated";
import { RootStackParamList } from '@/app/(tabs)/mine'

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function ToolCard({ icon, title, description, screen }: { icon: ImageSource, title: string, description: string, screen: string }) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Mine'>>();

    return (
        <Pressable onPress={() => { navigation.navigate(screen as keyof typeof navigation.navigate) }}>
            <ThemedView style={[styles.Container]}>
                <ThemedView style={styles.ToolCardContainer} >
                    <Image source={icon as ImageSource} placeholder={blurhash} style={[styles.image, { backgroundColor: "#ffffffff" }]} />
                    <ThemedView style={{ flexDirection: 'column', display: 'flex', flex: 1 }}>
                        <ThemedText style={[styles.BoldFont, { fontSize: 16, fontWeight: '600' }]}>{title}</ThemedText>
                        <ThemedText style={[styles.BoldFont, { fontSize: 12, color: '#8b9196ff' }]}>{description}</ThemedText>
                    </ThemedView>
                    <Image source={require('@/assets/icons/right.png')} style={[{ height: 24, width: 24 }]} />
                </ThemedView>
            </ThemedView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    Container: {
        height: 86,
    },
    ToolCardContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffffff',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 24,
    },
    image: {
        height: 28,
        width: 28,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 10,
        marginRight: 12,
        resizeMode: 'center',
    },
    BoldFont: {
        display: 'flex',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: '#000000ff',
        backgroundColor: 'transparent',
    }

})