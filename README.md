<!--
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 02:12:37
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-04 03:32:55
 * @FilePath: /GardenGuideAI/README.md
 * @Description: 园艺助手综合项目
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
-->

# 🌿 GardenGuideAI - 智能园艺助手

## 技术栈
<div align="center"> <img src="https://img.shields.io/badge/Expo-FFFFFF?style=flat-square&logo=expo" height="24"> <img src="https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=react" height="24"> <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch" height="24"> <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi" height="24"> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss" height="24"> </div>

<div align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-green?style=flat-square">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square">
  <img src="https://img.shields.io/badge/Platform-iOS%20|%20Android%20|%20Web-lightgrey?style=flat-square">
</div>

跨平台植物识别与养护解决方案，集成移动应用、AI服务和官网门户。

## 目录
- [功能特性](#功能特性)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
  - [移动应用](#移动应用)
  - [API服务](#api服务)
  - [官网门户](#官网门户)
- [技术栈](#技术栈)
- [许可证](#许可证)

## 功能特性
| 模块         | 功能描述                          |
|--------------|---------------------------------|
| 移动应用      | 实时植物识别、养护指南推送、个人花园管理 |
| AI API服务    | Vision Transformer图像识别、DeepSeek问答 |
| 官网门户      | 产品展示、使用教程、社区论坛       |

## 项目结构
```tree
GardenGuideAI/
├── GardenGuideAI/          # 移动应用(Expo+React Native)
├── FloraAPI/               # AI服务(Python+FastAPI)
├── Website/                # 官网(React+TailwindCSS)
├── GoBackend/              # 备用Go服务
└── Documentation/          # 项目文档
```

## 快速开始

### 环境要求
- Node.js >= 14.x
- Python >= 3.8
- Conda (推荐用于Python环境管理)
- Git
- Expo CLI (用于移动应用开发)
- React Native CLI (可选，用于原生开发)
- Go >= 1.16 (用于Go服务)
- Docker (可选，用于容器化部署)

#### vscode launch.json调试配置
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Run Website",
            "command": "npm run start",
            "request": "launch",
            "type": "node-terminal",
            "cwd": "${workspaceFolder}/Website",
        },
        {
            "name": "Go: Launch Server",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}/GoBackend/cmd/main.go",
            "cwd": "${workspaceFolder}/GoBackend",
            "env": {
                "DB_DSN": "GardenGuideAI:7fTbnDFPnmZdTmEN@tcp(47.108.248.188:3307)/gardenguideai?charset=utf8mb4&parseTime=True",
                "JWT_SECRET": "yawdawdawfrgtdhdtdwrdf",
                "JWT_EXPIRATION": "24h",
                "PORT": "8080",
                "LOG_LEVEL": "info",
                "LOG_PATH": "./logs/app.log"
            },
            "envFile": "${workspaceFolder}/GoBackend/.env",
            "console": "integratedTerminal" // 输出显示在集成终端中，方便查看日志
        },
        {
            "name": "FastAPI: Uvicorn", // 调试配置的名称
            "type": "python", // 调试器类型
            "request": "launch", // 启动模式
            "module": "uvicorn", // 要运行的模块
            "args": [
                "main:app", // 应用入口点（格式：文件名:FastAPI实例名）
                "--host", "0.0.0.0", // 监听主机地址（0.0.0.0表示所有网络接口）
                "--port", "8000", // 监听端口
                "--reload" // 启用热重载（开发环境推荐）
            ],
            "justMyCode": false, // 允许调试第三方库代码
            "env": {
                "PYDEVD_DISABLE_FILE_VALIDATION": "1" // 禁用文件验证（解决某些环境报错）
            },
            "console": "integratedTerminal", // 使用集成终端输出日志
            "cwd": "${workspaceFolder}/FloraAPI" // 工作目录（通常为项目根目录）
        },
        {
        "name": "RUN GardenGuideAI Expo",
        "request": "launch",
        "cwd": "${workspaceFolder}/GardenGuideAI",    
        "type": "node",
        "program": "${workspaceFolder}/GardenGuideAI/node_modules/expo/bin/cli",
        "args": [
            "start",
            "--tunnel"
        ],
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen",
        "skipFiles": [
            "<node_internals>/**"
        ]
        },
    ]
}
```

### 移动应用
#### 克隆仓库
```
git clone https://github.com/yourusername/GardenGuideAI.git
cd GardenGuideAI/GardenGuideAI
```

#### 安装依赖
```
npm install
```

#### 启动开发服务器
```
npx expo start --tunnel
```

### 启动FloraAPI服务

```
cd FloraAPI
```

#### 安装Python依赖

```
pip install -r requirements.txt
```

#### 启动服务

```
uvicorn main:app --reload --port 8000
```

### 启动官网门户

```
cd Website
```

#### 安装依赖
```
npm install
```

#### 启动开发服务器
```
npm run start
```


## 完结撒花
到目前项目也到了结项阶段，笔者也算是收获很多。
会想起来，从我初二接触python语言以来，这已经是我编程的第六个年头了。当时，python2还是主流，python3还没普及，笔者用Django框架做了个小博客，当时那种循序渐进的兴奋现在已经很难找到了。现在AI盛行，不像当时写原生html，js，css三件套，需要一个个字敲，用提示词很快就会上线一个小项目，甚至不需要写一行代码。而，这种方式对于我们专业开发者可能是致命的。
对于个人而言，很反对用AI写一个完整项目，第一是那种coding的成就感被淡化了，虽然效率确实很高，但是没有那种看着一个样式一个样式实现的那种感觉，归根结底不是自己的产出。第二，AI虽然快，但是对于复杂的逻辑难以实现，经常拆东墙补西墙，只能做点玩具级的项目。最主要的是，作为学生，会对其产生依赖性，把Tab扣掉就写不了代码了。所以个人最多用AI实现一些工具类，对于一些CSS样式宁愿手敲也不用那种AI味很浓的没有灵魂的样式。
### 许可证
本项目采用 MIT License 开源协议