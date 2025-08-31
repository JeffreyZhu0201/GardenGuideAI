<!--
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-30 00:43:57
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 16:31:08
 * @FilePath: /GardenGuideAI/GardenGuideAI/README.md
 * @Description: 
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
-->
# 🌿 GardenGuideAI - 智能园艺助手移动端

<p align="center">
  <img src="https://img.shields.io/badge/Expo-4630EB.svg?style=for-the-badge&logo=Expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/github/license/Jeffrey-Zhu/GardenGuideAI?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript" />
</p>

本项目是 GardenGuideAI 智能园艺助手解决方案的移动客户端，基于 [Expo](https://expo.dev) 和 React Native 构建，为用户提供跨平台的流畅体验。

## ✨ 功能特性

- **植物识别：** 用户可以通过拍照或上传图片，利用 AI 识别植物种类，并获取详细信息，助力植物爱好者轻松了解植物身份。
- **养护指南：** 提供针对不同植物的养护建议，包括浇水、光照、施肥等，帮助用户更好地养护植物，打造健康花园。
- **个性化主页：** 根据用户的植物收藏和浏览历史，推荐相关的养护知识和植物信息，提供个性化的园艺体验。
- **主题切换：** 支持浅色和深色模式，适应不同用户的偏好和使用环境，提供舒适的视觉体验。
## 🚀 快速开始

### 1. 环境要求

- [Node.js](https://nodejs.org/) (v16 LTS 或更高版本)
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)
- 在您的手机上安装 [Expo Go](https://expo.dev/go) 应用

### 2. 安装依赖

在项目根目录 (`/GardenGuideAI/GardenGuideAI`) 下运行以下命令：

```bash
npm install  # 或 yarn install
```

### 3. 启动应用

```bash
npx expo start # 或 yarn expo start
```

该命令会启动 Metro Bundler。您可以使用手机上的 Expo Go 应用扫描输出的二维码，在您的设备上运行此应用。如果配置了 development build, 推荐使用 `npx expo start --dev-client`。
## 📁 项目结构

```
GardenGuideAI/
├── app/                  # 应用的路由和页面，使用 Expo Router 进行管理
│   ├── (tabs)/           # 标签页导航的页面，包括首页、发现页和我的页面
│   │   ├── index.tsx     # 首页
│   │   ├── explore.tsx   # 探索/拍照识别页
│   │   └── mine.tsx      # "我的"页面
│   └── store/
│       └── store.ts      # 使用 Zustand 进行全局状态管理的状态存储
├── assets/               # 存放静态资源，例如图片、图标和字体
├── components/           # 可复用的 React 组件，例如卡片、按钮和文本
├── constants/            # 定义常量，例如颜色、字体和 API 地址
├── hooks/                # 自定义 React Hooks，用于封装可复用的逻辑
├── network/              # 存放网络请求相关的代码，例如 API 接口定义和请求函数
└── package.json          # 项目依赖和脚本
```

## 🛠️ 主要技术栈

<p align="left">
  <a href="https://expo.dev/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Expo-4630EB.svg?style=for-the-badge&logo=Expo&logoColor=white" alt="Expo" /></a>
  <a href="https://reactnative.dev/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" /></a>
  <a href="https://docs.expo.dev/router/introduction/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Expo%20Router-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo Router" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://github.com/pmndrs/zustand" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Zustand-592E7A?style=for-the-badge" alt="Zustand" /></a>
</p>

## 📜 脚本命令

- `npm run start`: 启动开发服务器。
- `npm run android`: 在连接的安卓设备或模拟器上运行应用。
- `npm run ios`: 在iOS模拟器上运行应用。
- `npm run reset-project`: 重置项目，将示例代码移至 `app-example` 目录并创建一个新的空白 `app` 目录。

## 🤝 贡献

欢迎提交问题 (Issues) 和合并请求 (Pull Requests)。

## 📄 许可证

本项目采用 MIT 许可证。

