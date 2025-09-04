/*
 * @Date: 2025-09-02 15:59:13
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-04 16:40:41
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/SettingsPage.tsx
 * @Description: 账号页
 */


import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import useStore from '@/app/store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from "@/constants/User";
import { ThemedView } from "@/components/ThemedView";

import { RootStackParamList } from "./(tabs)/mine";

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function SettingsPage() {
    const { setUserInfo, setToken } = useStore()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SettingsPage'>>();

    const { token } = useStore()
    return (
        <Pressable onPress={async () => {
            if (!token) {
                alert("You didn't Log in!")
            } else {
                setUserInfo(undefined as unknown as User);
                setToken(undefined as unknown as string);
                alert("Log out successfully!")
                await new Promise(resolve => setTimeout(resolve, 1000));
                navigation.goBack()

            }
        }}>
            <ThemedView style={[styles.Container]}>
                <ThemedView style={styles.ToolCardContainer} >
                    <Image source={require("@/assets/icons/user-logout.png")} placeholder={blurhash} style={[styles.image, { backgroundColor: "#ffffffff" }]} />
                    <ThemedView style={{ flexDirection: 'column', display: 'flex', flex: 1 }}>
                        <ThemedText style={[styles.BoldFont, { fontSize: 16, fontWeight: '600' }]}>Log out</ThemedText>
                        <ThemedText style={[styles.BoldFont, { fontSize: 12, color: '#8b9196ff' }]}>Log out you account from device</ThemedText>
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
