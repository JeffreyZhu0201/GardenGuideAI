import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import useStore from '@/app/store/store';
import UserInfo from "@/components/UserInfo";
import { Button } from "@react-navigation/elements";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the RootStackParamList type
export type RootStackParamList = {
  Mine: undefined;
  LoginPage: undefined;
  RegisterPage: undefined;
};

export default function MineScreen() {
  const { setHeaderTitle, userInfo } = useStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Mine'>>();

  useFocusEffect(
    useCallback(() => {
      setHeaderTitle("我的");
    }, [setHeaderTitle])
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {userInfo ? (
        <>
          <ThemedText>User Info:</ThemedText>
          <UserInfo userInfo={userInfo} />
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