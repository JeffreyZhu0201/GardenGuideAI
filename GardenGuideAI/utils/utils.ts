import * as FileSystem from 'expo-file-system';

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

export async function base64ToFile(base64String: string, filename = 'image.jpeg'): Promise<string> {
  // Accept both "data:<mime>;base64,..." and raw base64 strings from expo-camera
  let rawBase64 = base64String;
  let mimeType = 'image/jpeg';

  if (base64String.startsWith('data:')) {
    const parts = base64String.split(';base64,');
    mimeType = parts[0]?.split(':')[1] || mimeType;
    rawBase64 = parts[1] || '';
  }

  const dir = FileSystem.documentDirectory || '';
  const fileUri = `${dir}${filename}`;

  // write base64 to disk and return the file URI
  await FileSystem.writeAsStringAsync(fileUri, rawBase64, { encoding: FileSystem.EncodingType.Base64 });

  return fileUri;
};