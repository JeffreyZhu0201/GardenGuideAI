/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 01:22:40
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 01:22:42
 * @FilePath: /GardenGuideAI/GardenGuideAI/components/Login.tsx
 * @Description: 
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */
import React from 'react';
import { View, Text, Button } from 'react-native';

interface LoginProps {
  navigation: any; // Replace with the actual type of navigation
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Login Component</Text>
      <Button title="Go to Login" onPress={() => alert('Login')} />
    </View>
  );
};

export default Login;
