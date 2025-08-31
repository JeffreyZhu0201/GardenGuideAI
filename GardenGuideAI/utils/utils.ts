/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 02:12:09
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 02:20:55
 * @FilePath: /GardenGuideAI/GardenGuideAI/utils/utils.ts
 * @Description:  工具类
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */

type RouteParams = Record<string, string | number>;
type QueryParams = Record<string, string | number | boolean>;


export function joinRoutes(base: string, ...paths: string[]): string {
  const url = new URL(base);
  url.pathname = paths.join('/');
  return url.toString();
}

/**
 * 类型安全的路由拼接函数
 * @param baseUrl 根路由
 * @param path 子路由路径
 * @param params 路径参数
 * @param query 查询参数
 * @returns 完整的URL字符串
 */
export function buildURL(
  baseUrl: string,
  path: string,
  params?: RouteParams,
  query?: QueryParams
): string {
  // 处理根路由和路径的斜杠
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 替换路径参数
  let fullPath = normalizedBase + normalizedPath;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      fullPath = fullPath.replace(`:${key}`, encodeURIComponent(String(value)));
    }
  }
  
  // 添加查询参数
  if (query && Object.keys(query).length > 0) {
    const queryString = Object.entries(query)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
    fullPath += `?${queryString}`;
  }
  
  return fullPath;
}