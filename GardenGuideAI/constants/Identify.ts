/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 01:55:53
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 00:47:54
 * @FilePath: /GardenGuideAI/GardenGuideAI/constants/Identify.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */



// ... existing comments ...

interface IdentifyConfig {
    IDENTIFY_API: string;
    DEEPSEEK_API: string;
    AUTH_TOKEN: string;
}

export const IdentifyConfig: IdentifyConfig = {
    IDENTIFY_API: 'identify',
    DEEPSEEK_API: 'deepseek',   
    AUTH_TOKEN: 'Bearer 123456'
};