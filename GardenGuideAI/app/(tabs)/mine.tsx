/*
 * @Date: 2025-09-01 21:35:23
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 09:00:04
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/(tabs)/mine.tsx
 * @Description: 
 */

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import useStore from '@/app/store/store';
import UserInfo from "@/components/UserInfo";
import { Button } from "@react-navigation/elements";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from "@/constants/User";

// Define the RootStackParamList type
export type RootStackParamList = {
  Mine: undefined;
  LoginPage: undefined;
  RegisterPage: undefined;
};

export default function MineScreen() {
  const { setHeaderTitle, userInfo, setUserInfo, token, setToken } = useStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Mine'>>();

  const [userEmail, setUserEmail] = useState("");

  const fetchOnLoad = async () => {
    if (token && userInfo) {
      setUserEmail(userInfo.email);
    }
    else{
      setUserEmail("");
    }
  };

  useFocusEffect(
    useCallback(() => {
      setHeaderTitle("我的");
    }, [setHeaderTitle])
  );

  useEffect(() => {
    fetchOnLoad();
  }, [userInfo, token]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {userInfo ? (
        <>
          <ThemedText>User Info:</ThemedText>
          {/* <UserInfo userInfo={userInfo} /> */}
          <ThemedText>Email: {userEmail}</ThemedText>
          <Button onPress={() => {
            setUserInfo(undefined as unknown as User);
            setToken(undefined as unknown as string);
          }} >
            Logout
          </Button>
        </>
      ) : (
        <>
          <ThemedText>Please Login or Register</ThemedText>
          <Button onPress={() => navigation.navigate('LoginPage')}>Login</Button>
          <Button onPress={() => navigation.navigate('RegisterPage')}>Register</Button>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
});