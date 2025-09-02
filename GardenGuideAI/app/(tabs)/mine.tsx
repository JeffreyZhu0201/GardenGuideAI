/*
 * @Date: 2025-09-01 21:35:23
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 12:01:24
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

// Define the RootStackParamList type
export type RootStackParamList = {
  "Mine": undefined;
  "LoginPage": undefined;
  "RegisterPage": undefined;
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
    else{
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
    <ThemedView style={{ height: '100%' }}>
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
        <ThemedView style={styles.LoginRegisterContainer}>
          <Image
            style={styles.image}
            source={require('@/assets/images/defaultUser.png')}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <ThemedText style={styles.BoldFont} onPress={() => navigation.navigate('LoginPage')}>Login / </ThemedText>
          <ThemedText style={styles.BoldFont} onPress={() => navigation.navigate('RegisterPage')}>Register</ThemedText>
        </ThemedView>
      )}
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  userAvatar:{

  },
  LoginRegisterContainer: {
    flex: 0.15,
    display: 'flex',
    flexDirection: 'row',
    height: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    paddingHorizontal: 20,
    margin:10
  },
  image: {
    height:30,
    width: 30,
    backgroundColor: '#0553',
    borderRadius: 15,
    display: 'flex',
    marginRight: 10,
  },
  BoldFont: {
    fontWeight: 'bold',
    fontSize: 24,
    height: 20,
  }

});


