/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 00:44:51
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-04 16:22:38
 * @FilePath: /GardenGuideAI/GardenGuideAI/constants/SystemConfig.ts
 * @Description: 系统配置
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */

interface SystemConfig{
    IMAGE_SOURCE:string,
    GO_BASE_URL:string,
    IDENTIFY_BASE_URL:string
}

export const SystemConfig:SystemConfig = {
    IMAGE_SOURCE:'http://192.168.108.76:8080/',
    GO_BASE_URL:'http://192.168.108.76:8080/api/v1',
    IDENTIFY_BASE_URL:"http://192.168.108.76:8000/api/v1"
}
