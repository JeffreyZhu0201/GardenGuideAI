/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 01:27:08
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 09:02:56
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/LoginPage.tsx
 * @Description: 登陆页面
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { RootStackParamList } from "./(tabs)/mine"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import useStore from './store/store';
import { User } from '@/constants/User';
import { useCameraPermissions } from 'expo-camera';
import { Login } from "../network/userApi"


export default function LoginPage() {
  const { userInfo, setUserInfo, token, setToken } = useStore()

  const [currentUserEmail, setCurrentUserEmail] = useState<string>("")
  const [currentUserPassword, setCurrentUserPassword] = useState<string>("")


  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'LoginPage'>>();

  const handleLogin = async (Email: string, Password: string) => {
    // Implement your login logic here
    console.log('Logging in with:', Email, Password);
    const response = await Login(Email, Password)

    if (response.code == 200 && response.data) {
      console.log(response.data.token);
      setToken(response.data.token || "")
      setUserInfo({
        email: Email,
        password: Password
      })
      console.log("Logged in successfully")
      alert("Logged in successfully")
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.goBack()
    }else{
      alert(response.message)
      navigation.navigate("Mine")
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={currentUserEmail}
        onChangeText={setCurrentUserEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={currentUserPassword}
        onChangeText={setCurrentUserPassword}
      />
      <Button title="Login" onPress={() => handleLogin(currentUserEmail, currentUserPassword)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
