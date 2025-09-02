/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 01:19:14
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 09:50:08
 * @FilePath: /GardenGuideAI/GardenGuideAI/network/identifyApi.ts
 * @Description:    识别相关接口
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */

import { IdentifyConfig } from "@/constants/Identify";
import { SystemConfig } from "@/constants/SystemConfig";
import { joinRoutes, buildURL } from '@/utils/utils'
import axios from "axios";

import * as Network from 'expo-network';

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

function getMimeTypeFromFilename(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  switch (ext) {
    case 'png': return 'image/png';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'gif': return 'image/gif';
    default: return 'application/octet-stream';
  }
}

export const identifyPlant = async (
    fileUri: string,
    token: string
): Promise<IdentifyResponse> => {
    try {
        const formData = new FormData();

        // normalize file URI
        let uri = fileUri;
        if (!uri.startsWith('file://') && !uri.startsWith('content://')) {
          uri = `file://${uri}`;
        }

        const filename = uri.split('/').pop() || `photo_${Date.now()}.jpg`;
        const mimeType = getMimeTypeFromFilename(filename);

        formData.append('file', {
          uri,
          name: filename,
          type: mimeType
        } as any);

        const base = (SystemConfig.IDENTIFYBASETURL || '').replace(/\/$/, '');
        const apiPath = (IdentifyConfig.IDENTIFY_API || '').replace(/^\//, '');
        const URL = `${base}/${apiPath}`;

        console.log('[identifyPlant] URL:', URL, 'fileUri:', uri);

        const ip = await Network.getIpAddressAsync();

        const response = await axios.post(URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${token}`,
                'Origin': `http://${ip}:8081`
            },
            timeout: 15000
        });

        return response.data;
    } catch (error: any) {
        console.error('identifyPlant error:', error?.response?.status, error?.response?.data || error?.message || String(error));
        return {
            code: 400,
            message: error?.message || String(error),
            data: null as any
        };
    }
};

export const deepseekPlant = async (
    question: string,
    token: string
): Promise<IdentifyResponse> => {

    const query = {
        question : question
    }

    const URL = buildURL(SystemConfig.IDENTIFYBASETURL, IdentifyConfig.DEEPSEEK_API, {}, query);
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
