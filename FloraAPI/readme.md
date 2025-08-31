<!--
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-30 16:00:05
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 08:27:40
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
```
GardenGuideAI/
├── FloraAPI/                    # 植物识别API服务
│   ├── app/
│   │   ├── __init__.py
│   │   ├── dataset/            # 数据集处理
│   │   │   ├── train.csv
│   │   │   ├── id_to_cat.py    # ID-类别映射
│   │   │   └── download.py     # Kaggle数据下载
│   │   ├── model/              # 模型定义
│   │   ├── train.py            # 训练流程
│   │   ├── predict.py         # 预测接口
│   │   └── export.py           # 模型导出
│   ├── deepseek_api/           # DeepSeek集成
│   │   └── ds_service.py
│   ├── checkpoints/            # 模型保存目录
│   ├── main.py                 # FastAPI主入口
│   ├── utils.py                # 工具函数
│   ├── requirements.txt        # Python依赖
│   └── environment.yml        # Conda环境配置
```

## 功能特性
| 功能 | 描述 | 技术栈 |
|------|------|--------|
| 🎯 植物识别 | 支持40+植物种类识别 | Vision Transformer |
| 💡 智能问答 | 深度求索AI驱动的养护指南 | DeepSeek API |
| 🔐 安全认证 | JWT令牌验证机制 | PyJWT |
| 📈 性能监控 | 请求追踪与性能分析 | Prometheus |

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

## API文档
```bash
# 运行后查看API文档
http://localhost:8000/docs
```
