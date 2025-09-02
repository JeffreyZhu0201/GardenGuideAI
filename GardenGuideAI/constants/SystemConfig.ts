/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 00:44:51
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 09:39:00
 * @FilePath: /GardenGuideAI/GardenGuideAI/constants/SystemConfig.ts
 * @Description: 系统配置
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */

interface SystemConfig{
    GOBASEURL:string,
    IDENTIFYBASETURL:string
}

export const SystemConfig:SystemConfig = {
    GOBASEURL:'http://192.168.108.76:8080/api/v1',
    IDENTIFYBASETURL:"http://192.168.108.76:8000/api/v1/"
    
}
