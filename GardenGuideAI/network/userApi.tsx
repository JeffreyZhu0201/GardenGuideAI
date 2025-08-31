/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 01:19:14
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 01:58:12
 * @FilePath: /GardenGuideAI/GardenGuideAI/network/userApi.tsx
 * @Description: 用户相关接口
 * 
 * Copyright (c) 2025 by ${Jeffrey Zhu}, All Rights Reserved. 
 */

import { IDENTIFY_API_URL } from "@/constants/Identify";

interface IdentifyResponseData {
    id: number;
    name: string;
}

interface IdentifyResponse {
    code:number,
    message:string,
    data:IdentifyResponseData
}

export const identifyPlant = async (
  file: File,
  token: string
): Promise<IdentifyResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(IDENTIFY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`识别请求失败: ${response.statusText}`);
  }

  return response.json();
};