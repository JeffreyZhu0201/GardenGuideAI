/*
 * @Date: 2025-09-03 10:11:47
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 20:03:43
 * @FilePath: /GardenGuideAI/GardenGuideAI/network/postApi.ts
 * @Description: 
 */
import { SystemConfig } from "@/constants/SystemConfig";
import axios from "axios";
import * as Network from 'expo-network';
import useStore from "@/app/store/store";
import { buildURL } from "@/utils/utils";
/**
 * @description The data required to create a post.
 */
export interface CreatePostPayload {
    email: string;
    content: string;
    imageUri: string; // The local URI of the image file (e.g., from image picker)
    token: string;
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
/** 
 * @description Creates a new post by uploading an image and data to the backend.
 * @param {CreatePostPayload} payload The data for the new post.
 * @returns {Promise<any>} A promise that resolves with the server's response.
 */
export const createPost = async (payload: CreatePostPayload): Promise<any> => {
    const { email, content, imageUri, token } = payload;
    const apiUrl = `${SystemConfig.GOBASEURL}/posts`;

    // Create a FormData object to build the multipart request body.
    const formData = new FormData();

    // Append the text fields.
    formData.append('email', email);
    formData.append('content', content);

    // Append the image file.
    // React Native's fetch needs an object with uri, name, and type for files.
    // We extract the filename from the URI.
    let uri = imageUri;
    if (!uri.startsWith('file://') && !uri.startsWith('content://')) {
        uri = `file://${uri}`;
    }

    const filename = uri.split('/').pop() || `photo_${Date.now()}.jpg`;
    const mimeType = getMimeTypeFromFilename(filename);


    formData.append('image', {
        uri,
        name: filename,
        type: mimeType
    } as any);

    const ip = await Network.getIpAddressAsync()

    const response = await axios.post(apiUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Origin': `http://${ip}:8081`,
            "Connection": "keep-alive",
            // "Accept": "application/json",
            // "Accept-Encoding": "gzip, deflate, br",
            // 'Content-Type' is not set manually.
            // fetch will automatically set it to 'multipart/form-data'
            // with the correct boundary when the body is a FormData object.
        }
    });
    console.log(response)
    // If successful, parse the JSON response and return it.
    return response.data;
}

export const getAllPosts = async (): Promise<any> => {
    const apiUrl = `${SystemConfig.GOBASEURL}/posts/allpost`;

    const ip = await Network.getIpAddressAsync()

    const response = await axios.get(apiUrl, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Origin': `http://${ip}:8081`,
        }
    }
    );
    return response.data;
}


export const getOnePost = async (postId: string): Promise<any> => {
    const apiUrl = `${SystemConfig.GOBASEURL}/posts/getone`;
    const { token } = useStore();
    const ip = await Network.getIpAddressAsync()
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Origin': `http://${ip}:8081`,
            },
            params: {
                id: postId
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

export const addLike = async (postId: string, token: string) => {
    // const apiUrl = `${SystemConfig.GOBASEURL}/posts/like?id=${postId}`;
    const apiUrl = buildURL(`${SystemConfig.GOBASEURL}`,'/posts/like',{},{id:postId})
    const ip = await Network.getIpAddressAsync()
    console.log(apiUrl)
    const response = await axios.post(apiUrl, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Origin': `http://${ip}:8081`,
        }
    });
    console.log(response);
    return response.data;
}

export const unLike = async (postId: string, token: string) => {
    // const apiUrl = `${SystemConfig.GOBASEURL}/posts/like?id=${postId}`;
    const apiUrl = buildURL(`${SystemConfig.GOBASEURL}`,'/posts/unlike',{},{id:postId})
    const ip = await Network.getIpAddressAsync()
    console.log(apiUrl)
    const response = await axios.post(apiUrl, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Origin': `http://${ip}:8081`,
        }
    });
    console.log(response);
    return response.data;
}

export const getUsersPosts = async (email: string) => {
    const apiUrl = `${SystemConfig.GOBASEURL}/posts/userposts`;
    const { token } = useStore();
    const ip = await Network.getIpAddressAsync()
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Origin': `http://${ip}:8081`,
            },
            params: {
                email
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error;
    }
}