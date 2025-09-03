/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 01:27:08
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 22:14:24
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/RegisterPage.tsx
 * @Description: 登陆页面
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { RootStackParamList } from "./(tabs)/mine"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useFocusEffect, ThemeContext } from "@react-navigation/native";
import useStore from './store/store';
import { User } from '@/constants/User';
import { useCameraPermissions } from 'expo-camera';
import { Login, Register } from "../network/userApi"
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';


export default function RegiterPage() {
  const { userInfo, setUserInfo, token, setToken } = useStore()

  const [currentUserEmail, setCurrentUserEmail] = useState<string>("")
  const [currentUserPassword, setCurrentUserPassword] = useState<string>("")

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'RegisterPage'>>();


  const handleLogin = async (Email: string, Password: string) => {
    // Implement your login logic here
    console.log('Logging in with:', Email, Password);
    const response = await Register(Email, Password)

    if (response.code == 200 && response.data) {
      console.log(response.data.token);
      setToken(response.data.token || "")
      setUserInfo({
        email: Email,
        password: Password
      })
      alert("Registered in successfully")
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.goBack()
    } else {
      alert(response.message)
      navigation.goBack()
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.smallText}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={currentUserEmail}
        onChangeText={setCurrentUserEmail}
      />
      <Text style={styles.smallText}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={currentUserPassword}
        onChangeText={setCurrentUserPassword}
      />
      <Pressable onPress={() => handleLogin(currentUserEmail, currentUserPassword)} style={styles.buttonStyle}>
          <ThemedText style={{color:"#ffffff",padding:12,fontSize:18,fontWeight:"600",alignItems:'center'}}>Register & Login</ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffffff',
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 20,
  },
  smallText:{
    fontSize:14,
    fontWeight:"600",
    color:"#5c5c5cff"
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "400"
  },
  buttonStyle: {
    borderRadius:20,
    marginVertical:16,
    display:'flex',
    alignItems:'center',
    backgroundColor:"#00528cff",
  }
});
