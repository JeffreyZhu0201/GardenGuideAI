/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 01:55:53
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 02:12:40
 * @FilePath: /GardenGuideAI/GardenGuideAI/constants/Identify.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */



// ... existing comments ...

interface Config {
    BASEURL: string;
    IDENTIFY_API: string;
    DEEPSEEK_API: string;
    AUTH_TOKEN: string;
}

export const IdentifyConfig: Config = {
    BASEURL: 'http://192.168.215.2:8000/api/v1',
    IDENTIFY_API: 'identify',
    DEEPSEEK_API: 'deepseek',   
    AUTH_TOKEN: 'Bearer 123456'
};