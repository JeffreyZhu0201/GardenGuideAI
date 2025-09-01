/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 01:22:34
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 01:22:36
 * @FilePath: /GardenGuideAI/GardenGuideAI/components/UserInfo.tsx
 * @Description: 
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */
import React from 'react';
import { View, Text } from 'react-native';

interface UserInfoProps {
  userInfo: any; // Replace with the actual type of userInfo
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {
  return (
    <View>
      <Text>User Info Component</Text>
      <Text>User: {userInfo ? userInfo.name : 'Not Logged In'}</Text>
    </View>
  );
};

export default UserInfo;
