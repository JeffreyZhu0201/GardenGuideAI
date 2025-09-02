/*
 * @Date: 2025-09-02 10:16:38
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 10:16:43
 * @FilePath: /GardenGuideAI/GardenGuideAI/components/sharedStyles.tsx
 * @Description: 共享样式和颜色常量
 */
// components/sharedStyles.tsx
import { StyleSheet } from 'react-native';

export const COLORS = {
  primaryRed: '#FF6F61', // 示例中的主要红色
  secondaryRed: '#FFADAD', // 较浅的红色背景
  darkRed: '#D32F2F',    // 可能用于按钮或深色文本
  white: '#FFFFFF',
  black: '#000000',
  textGray: '#666666',
  lightGray: '#F5F5F5',
  mediumGray: '#CCCCCC',
  darkGray: '#333333',
};

export const GLOBAL_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 10,
  },
  paragraphText: {
    fontSize: 14,
    color: COLORS.textGray,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});