/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 01:19:14
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 01:07:40
 * @FilePath: /GardenGuideAI/GardenGuideAI/network/identifyApi.ts
 * @Description:    识别相关接口
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */

import { IdentifyConfig } from "@/constants/Identify";
import { SystemConfig } from "@/constants/SystemConfig";
import { joinRoutes, buildURL } from '@/utils/utils'

interface IdentifyResponseData {
    id: number;
    name: string;
}

interface IdentifyResponse {
    code: number,
    message: string,
    data: IdentifyResponseData
}

interface DeepSeekResponse {
  code: number;
  message: string;
  answer: string; // 修正响应字段
}

export const identifyPlant = async (
    file: File,
    token: string
): Promise<IdentifyResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const URL = joinRoutes(SystemConfig.BASEURL, IdentifyConfig.IDENTIFY_API);
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`识别请求失败: ${response.statusText}`);
    }

    return response.json();
};


export const deepseekPlant = async (
    question: string,
    token: string
): Promise<IdentifyResponse> => {

    const query = {
        question : question
    }

    // const URL = joinRoutes(IdentifyConfig.BASEURL, IdentifyConfig.DEEPSEEK_API);
    const URL = buildURL(SystemConfig.BASEURL, IdentifyConfig.DEEPSEEK_API, {}, query);
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`识别请求失败: ${response.statusText}`);
    }

    return response.json();
};
