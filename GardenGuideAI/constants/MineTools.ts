/*
 * @Date: 2025-09-02 15:37:59
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 16:52:34
 * @FilePath: /GardenGuideAI/GardenGuideAI/constants/MineTools.ts
 * @Description: 
 */

import { navigate } from "expo-router/build/global-state/routing";


export const MineTools = [
    { 'icon': require('@/assets/icons/circle-user.png'), 'title': 'Mining Tool', 'description': 'A tool for mining resources.' ,navigate:'AccountPage'},
    { 'icon': require('@/assets/icons/love.png'), 'title': 'Gardening Tool', 'description': 'A tool for gardening tasks.' ,navigate:'LikePage'}
]
