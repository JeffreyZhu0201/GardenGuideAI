/*
 * @Date: 2025-09-02 15:59:13
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 16:57:41
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/AccountPage.tsx
 * @Description: 账号页
 */


import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import useStore from '@/app/store/store';
import UserInfo from "@/components/UserInfo";
import { Button } from "@react-navigation/elements";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from "@/constants/User";
import { ThemedView } from "@/components/ThemedView";
import ToolCard from "@/components/ToolCard";
import { MineTools } from '@/constants/MineTools'
import { RootStackParamList } from "./(tabs)/mine";

export default function Account() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'AccountPage'>>();
    
    return (
        <ThemedView style={[styles.Container, { height: '100%' }]}>
            <ThemedText style={[styles.BoldFont, { textAlignVertical: 'center' }]}>Account Screen</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    Container:{
        height: '100%',
    },
    BoldFont: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: '600',
        fontSize: 22,
        textAlignVertical: 'center',
        height: "100%",
        color: '#ffffffff',
    },
})

