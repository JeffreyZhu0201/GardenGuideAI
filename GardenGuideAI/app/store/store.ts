/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 01:29:19
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 01:31:09
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/store/store.ts
 * @Description: 全局状态管理
 * 
 * Copyright (c) 2025 by ${Jeffrey Zhu}, All Rights Reserved. 
 */
import { create } from 'zustand';

type Store = {
  headerTitle: string;
  setHeaderTitle: (title: string) => void;
};

export const useStore = create<Store>((set) => ({
  headerTitle: 'GardenGuideAI',
  setHeaderTitle: (title) => set({ headerTitle: title }),
}));