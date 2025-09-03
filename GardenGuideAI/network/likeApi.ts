/*
 * @Date: 2025-09-03 16:22:36
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 16:27:56
 * @FilePath: /GardenGuideAI/GardenGuideAI/network/likeApi.ts
 * @Description: 
 */

import useStore from "@/app/store/store";
import { SystemConfig } from "@/constants/SystemConfig";
import axios from "axios";

export const createLike = async (email: string, postId: string, token: string) => {
    const apiUrl = `${SystemConfig.GOBASEURL}/like/create`;

    const body = {
        email,
        "post_id": postId
    }

    try {
        const response = await axios.post(apiUrl, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error adding like:', error);
        throw error;
    }
}

export const getUsersLikes = async (email:string)=>{
    const apiUrl = `${SystemConfig.GOBASEURL}/like/userlikes`;
    const { token } = useStore();

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                email
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching user likes:', error);
        throw error;
    }
}

export const removeLike = async (id:string) => {
    const apiUrl = `${SystemConfig.GOBASEURL}/like/remove`;
    const { token } = useStore();
    try {
        const response = await axios.delete(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                id
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error removing like:', error);
        throw error;
    }
}