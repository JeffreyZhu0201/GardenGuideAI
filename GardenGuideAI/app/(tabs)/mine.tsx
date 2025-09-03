/*
 * @Date: 2025-09-01 21:35:23
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 21:52:00
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/(tabs)/mine.tsx
 * @Description: 
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
import { MineAccountConstant, MineSettingConstant } from '@/constants/MineTools'
import { Colors } from "@/constants/Colors";

// Define the RootStackParamList type
export type RootStackParamList = {
    "Mine": undefined;
    "LoginPage": undefined;
    "RegisterPage": undefined;
    "HistoryPage": undefined,
    "LikePage": undefined,
    "SettingsPage": undefined
};

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function MineScreen() {
    const { setHeaderTitle, userInfo, setUserInfo, token, setToken } = useStore();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Mine'>>();



    const [userEmail, setUserEmail] = useState("");

    const fetchOnLoad = async () => {
        if (token && userInfo) {
            setUserEmail(userInfo.email);
        }
        else {
            setUserEmail("");
        }
    };

    useFocusEffect(
        useCallback(() => {
            setHeaderTitle("Profile");
        }, [setHeaderTitle])
    );

    useEffect(() => {
        fetchOnLoad();
    }, [userInfo, token]);

    return (
        <ThemedView style={[styles.Container, { height: '100%' }]}>
            {userInfo ? (
                <>
                    <ThemedView style={styles.LoginRegisterContainer}>
                        <Image
                            style={styles.image}
                            source={require('@/assets/images/defaultUser.png')}
                            placeholder={{ blurhash }}
                            contentFit="cover"
                            transition={1000}
                        />
                        <ThemedView style={[{ flexDirection: 'column', display: 'flex', flex: 1, backgroundColor: 'transparent' }]}>
                            <ThemedText style={[styles.BoldFont, { fontSize: 26, marginBottom: 4 }]}>Hello,</ThemedText>
                            <ThemedText style={[styles.BoldFont, { fontSize: 16 }]}>{userInfo.email}</ThemedText>
                        </ThemedView>
                    </ThemedView>
                </>
            ) : (
                <ThemedView style={styles.LoginRegisterContainer}>
                    <Image
                        style={styles.image}
                        source={require('@/assets/images/defaultUser.png')}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                    <ThemedText style={[styles.BoldFont, { textAlignVertical: 'center', color: `${Colors.light.LoginText}` }]} onPress={() => navigation.navigate('LoginPage')}>Login / </ThemedText>
                    <ThemedText style={[styles.BoldFont, { textAlignVertical: 'center', color: `${Colors.light.LoginText}` }]} onPress={() => navigation.navigate('RegisterPage')}>Register</ThemedText>
                </ThemedView>
            )}


            {/* Account卡片 */}
            <ThemedView style={[styles.toolsContainer, { marginTop: 16 }]}>
                <ThemedView style={{ borderRadius: 6, overflow: 'hidden' }}>
                    {
                        MineAccountConstant.map(element => {
                            return <ToolCard key={element.title} icon={element.icon} title={element.title} description={element.description} screen={element.navigate} />
                        })
                    }

                </ThemedView>
            </ThemedView>


            {/* 设置卡片 */}
            <ThemedText style={[{ fontSize: 12, fontWeight: 'bold', color: '#75797dff', marginTop: 20 }]}>Settings</ThemedText>
            <ThemedView style={[styles.toolsContainer]}>
                <ThemedView style={{ borderRadius: 6, overflow: 'hidden' }}>
                    {
                        MineSettingConstant.map(element => {
                            return <ToolCard key={element.title} icon={element.icon} title={element.title} description={element.description} screen={element.navigate} />
                        })
                    }
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    Container: {
        paddingBottom: 100,
        backgroundColor: '#f0f0f0ff',
        margin: 12,
    },
    userAvatar: {
    },
    LoginRegisterContainer: {
        height: 128,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#0c3e80ff',
        alignItems: 'center',
        borderRadius: 8,
        padding: 12,
    },
    image: {
        height: 72,
        width: 72,
        backgroundColor: 'rgba(115, 201, 201, 0.2)',
        borderRadius: 50,
        marginRight: 12,
    },
    BoldFont: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: '800',
        fontSize: 20,
        textAlignVertical: 'center',
        color: '#ffffffff',
    },
    toolsContainer: {
        display: "flex",
        flexDirection: "column",
        textAlignVertical: 'center',
        gap: 0,
        marginTop: 0,
        borderRadius: 10
    }
});


