<!--
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-30 16:00:05
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 11:07:05
 * @FilePath: /GardenGuideAI/FloraAPI/readme.md
 * @Description: 植物识别API
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
-->

# 🌿 FloraAPI - 智能植物识别API

<!-- 顶部徽章 -->
<div align="center">
  <img src="https://img.shields.io/badge/Python-3.8%2B-blue?logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/PyTorch-1.12%2B-red?logo=pytorch">
  <img src="https://img.shields.io/badge/License-MIT-green">
</div>

基于深度学习的植物识别API服务，提供：

- 🖼️ 高精度植物图像识别
- 💬 智能养护问答系统
- 🔒 JWT安全认证机制
- 🚀 高性能API服务

## 目录

- [功能特性](#功能特性)
- [项目文件](#项目文件)
- [快速开始](#快速开始)
  - [环境要求](#环境要求)
  - [安装指南](#安装指南)
- [API文档](#api文档)
- [许可证](#许可证)

## 项目文件

```bash
FloraAPI/
├── app/
│   ├── checkpoints/            # 模型及配置文件
│   │   └── category_mapping.json
│   ├── dataset/                # 数据集处理脚本
│   │   ├── download.py
│   │   └── id_to_cat.py
│   ├── __init__.py
│   ├── dataset.py
│   ├── dataVisualize.py
│   ├── export.py               # 模型导出与推理
│   ├── model.py                # Vision Transformer模型定义
│   ├── predict.py              # 预测接口(已整合到export.py)
│   ├── train.py                # 训练脚本
│   └── utils.py                # app内工具函数
├── deepseek_api/               # DeepSeek API集成
│   └── ds_service.py
├── main.py                     # FastAPI主入口
├── readme.md                   # 项目文档
├── requirements.txt            # Python依赖
└── utils.py                    # 全局工具函数
```

## 功能特性

| 功能 | 描述 | 技术栈 |
|------|------|--------|
| 🎯 植物识别 | 支持40+植物种类识别 | Vision Transformer |
| 💡 智能问答 | 深度求索AI驱动的养护指南 | DeepSeek API |
| 🔐 安全认证 | JWT令牌验证机制 | PyJWT |

## 快速开始

### 环境要求

- Python 3.8+
- CUDA 11.3+ (GPU加速推荐)
- RAM ≥ 8GB

### 安装指南

```bash
# 基础安装
pip install -r requirements.txt

# 模型下载（需提前获取权限）
通过网盘分享的文件：best_model.pth
链接: https://pan.baidu.com/s/1jne3SqaL91txHxXjN8LnIA 提取码: shy7

下载后放入FloraAPI/app/checkpoints

```

## API 端点

### 1. 植物识别

- **Endpoint:** `/api/v1/identify`
- **Method:** `POST`
- **Description:** 上传一张植物图片，接口会返回识别出的植物ID和名称。
- **Authentication:** `Bearer Token`
- **Request Body:**
  - `file`: (multipart/form-data) 图片文件
- **Success Response (200):**

  ```json
  {
    "code": 200,
    "msg": "success",
    "data": {
      "id": 1,
      "name": "玫瑰"
    }
  }
  ```

### 2. 智能问答

- **Endpoint:** `/api/v1/deepseek`
- **Method:** `POST`
- **Description:** 提供一个植物名称作为问题，接口会返回由DeepSeek模型生成的详细养护指南。
- **Authentication:** `Bearer Token`
- **Query Parameters:**
  - `question`: (string) 植物名称, e.g., `玫瑰`
- **Success Response (200):**

  ```json
  {
    "code": 200,
    "message": "success",
    "answer": "<html>...</html>" 
  }
  ```

## API文档

```bash
# 启动服务
uvicorn main:app --reload

# 运行后查看API文档
http://localhost:8000/docs
```

## 许可证

该项目根据 [MIT 许可证](LICENSE) 授权。
