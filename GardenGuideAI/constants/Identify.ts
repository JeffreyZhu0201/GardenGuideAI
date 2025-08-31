/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 01:55:53
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 02:03:06
 * @FilePath: /GardenGuideAI/GardenGuideAI/constants/Identify.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${Jeffrey Zhu}, All Rights Reserved. 
 */



// ... existing comments ...

interface Config {
  IDENTIFY_API: string;
  DEEPSEEK_API: string;
  AUTH_TOKEN: string;
}

export const AppConfig: Config = {
    IDENTIFY_API: 'http://192.168.215.2:8000/api/v1/identify',
    AUTH_TOKEN: 'Bearer 123456'
};