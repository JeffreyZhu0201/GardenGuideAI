/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 01:29:19
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 20:32:34
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/store/store.ts
 * @Description: 全局状态管理
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */
import { create } from 'zustand';
import { User } from "@/constants/User"

type Store = {
  headerTitle: string;
  setHeaderTitle: (title: string) => void;
  userInfo: User | null,
  setUserInfo: (user: User) => void;

  token: string | null
  setToken: (token: string) => void;

  fileUri: string | null;
  setFileUri: (uri: string | null) => void;

};

const useStore = create<Store>((set) => ({
  headerTitle: 'GardenGuideAI',
  setHeaderTitle: (title) => set({ headerTitle: title }),

  userInfo: null,
  setUserInfo: (user) => set({ userInfo: user }),

  token: null,
  setToken: (token) => set({ token: token }),

  fileUri: null,
  setFileUri: (uri: string | null) => set({ fileUri: uri }),
}));

export default useStore;