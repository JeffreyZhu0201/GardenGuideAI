<!--
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:41:22
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-09-04 01:15:19
 * @FilePath: /GardenGuideAI/GoBackend/readme.md
 * @Description:
 * 项目介绍
 * GardenGuideAI是一个基于AI的智能 gardening助手，帮助用户管理和优化他们的花园。
 *
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved.
-->


# GardenGuideAI
## 项目介绍
GardenGuideAI是一个基于AI的智能 gardening助手，帮助用户管理和优化他们的花园。

## GardenGuideAI GoBackend

基于Go语言和Gin框架的后端服务，实现用户认证功能。

### 功能特性

- 用户注册、登录、退出登录
- JWT令牌认证
- MySQL数据库存储
- 结构化日志记录
- CORS支持

## 项目结构
```
GoBackend/
├── .env                           # 环境变量配置文件
├── Dockerfile                     # Docker容器构建配置
├── GardenGuideAI.md               # API文档说明
├── go.mod                         # Go模块定义文件
├── go.sum                         # Go模块校验和文件
├── readme.md                      # 项目说明文档
├── cmd/                           # 命令行应用目录
│   ├── __debug_bin3158278704      # 调试二进制文件
│   └── main.go                    # 应用程序入口点
├── config/                        # 配置管理目录
│   └── config.go                  # 配置加载和解析
├── internal/                      # 内部包目录（不对外暴露）
│   ├── domain/                    # 领域模型层
│   │   ├── Like.go                # 点赞领域模型定义
│   │   ├── Post.go                # 帖子领域模型定义
│   │   ├── Resonse.go             # 响应领域模型定义
│   │   └── user.go                # 用户领域模型定义
│   ├── repository/                # 数据访问层
│   │   ├── auth_repository.go     # 用户认证数据访问接口
│   │   ├── like_repository.go     # 点赞数据访问接口
│   │   └── post_repository.go     # 帖子数据访问接口
│   ├── service/                   # 业务逻辑层
│   │   ├── auth_service.go        # 用户认证业务逻辑
│   │   ├── like_service.go        # 点赞业务逻辑
│   │   └── post_service.go        # 帖子业务逻辑
│   └── transport/                 # 传输层（HTTP处理）
│       └── gin/                   # Gin框架实现
│           ├── auth_handler.go    # 用户认证HTTP处理器
│           ├── like_handler.go    # 点赞HTTP处理器
│           ├── middleware.go      # HTTP中间件
│           ├── post_handler.go    # 帖子HTTP处理器
│           └── server.go          # Gin服务器配置和启动
├── pkg/                           # 可复用的公共包
│   ├── database/                  # 数据库相关包
│   │   └── mysql.go               # MySQL数据库连接和配置
│   ├── jwt/                       # JWT认证相关包
│   │   └── jwt_service.go         # JWT令牌生成和验证服务
│   └── logger/                    # 日志相关包
│       └── logger.go              # 结构化日志记录模块
└── uploads/                       # 文件上传目录
    └── posts/                     # 帖子图片上传目录
        └── *.jpg                  # 用户上传的帖子图片文件

```
