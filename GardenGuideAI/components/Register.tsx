/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 01:22:43
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 01:22:44
 * @FilePath: /GardenGuideAI/GardenGuideAI/components/Register.tsx
 * @Description: 
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */
import React from 'react';
import { View, Text, Button } from 'react-native';

interface RegisterProps {
  navigation: any; // Replace with the actual type of navigation
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Register Component</Text>
      <Button title="Go to Register" onPress={() => alert('Register')} />
    </View>
  );
};

export default Register;
