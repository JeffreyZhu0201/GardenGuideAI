/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 00:37:35
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 01:07:24
 * @FilePath: /GardenGuideAI/GardenGuideAI/network/userApi.ts
 * @Description: 用户api接口
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */

import { SystemConfig } from "@/constants/SystemConfig"
import { UserConfig } from "@/constants/User"
import { buildURL, joinRoutes } from "@/utils/utils"
import { useInterpolateConfig } from "react-native-reanimated"

interface LoginData{
    token:string
}

interface LogoutData{
    
}

interface RegisterData{
    
}

interface Response<Type>{
    code:number,
    messgage: string,
    data:Type
}

export const Login =  async (userEmail:string,userPassword:string):Promise<Response<LoginData>> => {

    const URL = buildURL(SystemConfig.BASEURL,UserConfig.LoginUrl,{},{})

    const body = {
        email:userEmail,
        password:userPassword
    }

    const response = await fetch(URL,{
        method:'POST',
        body:JSON.stringify(body)
    })

    if(!response.ok){
        throw new Error(`登陆失败: ${response.statusText}`)
    }

    return response.json();
}

export const Register =  async (userEmail:string,userPassword:string):Promise<Response<LoginData>> => {

    const URL = buildURL(SystemConfig.BASEURL,UserConfig.RegisterUrl,{},{})

    const body = {
        email:userEmail,
        password:userPassword
    }

    const response = await fetch(URL,{
        method:'POST',
        body:JSON.stringify(body)
    })

    if(!response.ok){
        throw new Error(`注册失败: ${response.statusText}`)
    }

    return response.json();
}

export const Logout =  async (token :string):Promise<Response<LogoutData>> => {

    const URL = buildURL(SystemConfig.BASEURL,UserConfig.LogoutUrl,{},{})

    const response = await fetch(URL,{
        method:'POST',
        headers:{
            'authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error(`退出登陆失败: ${response.statusText}`)
    }

    return response.json();
}
