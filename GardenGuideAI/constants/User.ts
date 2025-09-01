/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 00:43:43
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 01:14:23
 * @FilePath: /GardenGuideAI/GardenGuideAI/constants/User.ts
 * @Description: 用户实体
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */


export interface User{
    email:string,
    password:string
}

interface UserConfig{
    LoginUrl:string,
    LogoutUrl:string,
    RegisterUrl:string
}

export const UserConfig:UserConfig = {
    LoginUrl:"login",
    LogoutUrl:"logout",
    RegisterUrl:"register"
}
