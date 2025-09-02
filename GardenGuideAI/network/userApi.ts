/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 00:37:35
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 01:25:20
 * @FilePath: /GardenGuideAI/GardenGuideAI/network/userApi.ts
 * @Description: 用户api接口
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */

import { SystemConfig } from "@/constants/SystemConfig"
import { UserConfig } from "@/constants/User"
import { buildURL, joinRoutes } from "@/utils/utils"
import { useInterpolateConfig } from "react-native-reanimated"
import * as Network from 'expo-network';
import axios from 'axios';

interface LoginData {
    token: string
}

interface LogoutData {

}

interface RegisterData {

}

interface Response<Type> {
    code: number,
    message: string,
    data: Type
}

export const Login = async (userEmail: string, userPassword: string): Promise<Response<LoginData>> => {

    const URL = buildURL(SystemConfig.GOBASEURL, UserConfig.LoginUrl, {}, {})
    console.log(URL)
    const body = {
        email: userEmail,
        password: userPassword
    }
    const ip = await Network.getIpAddressAsync()
    try {
        const response = await axios.post(URL, body, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': `http://${ip}:8081`
            }
        });
        console.log(response.data);
        console.log(response.data.code)
        console.log(response.data.data.token)
        console.log(response.data.message)
        return response.data;
    } catch (error: any) {
        // console.error("登录失败:", error);
        // throw error;
        alert(error)
        return {
            code: 400,
            message: error.message,
            data: null as any
        }
    }
}
export const Register = async (userEmail: string, userPassword: string): Promise<Response<LoginData>> => {

    const URL = buildURL(SystemConfig.GOBASEURL, UserConfig.RegisterUrl, {}, {})

    const body = {
        email: userEmail,
        password: userPassword
    }
    const ip = await Network.getIpAddressAsync()
    try {
        const response = await axios.post(URL, body, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': `http://${ip}:8081`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("注册失败:", error);
        throw error;
    }
}
export const Logout = async (token: string): Promise<Response<LogoutData>> => {

    const URL = buildURL(SystemConfig.GOBASEURL, UserConfig.LogoutUrl, {}, {})
    try {
        const response = await axios.post(URL, {}, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("退出登录失败:", error);
        throw error;
    }
}