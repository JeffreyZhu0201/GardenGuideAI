<!--
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:41:22
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-29 03:59:57
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
├── cmd/
│   └── main.go                 # 应用入口
├── config/
│   └── config.go               # 配置加载
├── internal/
│   ├── transport/
│   │   └── gin/               # Gin传输层实现
│   │       ├── server.go       # 服务启动配置
│   │       ├── auth_handler.go # 认证处理器
│   │       └── middleware.go  # 中间件
│   ├── service/
│   │   └── auth_service.go     # 业务逻辑层
│   ├── repository/
│   │   └── auth_repository.go # 数据访问层
│   └── domain/
│       └── user.go            # 领域模型
├── pkg/
│   ├── database/
│   │   └── mysql.go           # 数据库连接
│   ├── jwt/
│   │   └── jwt_service.go     # JWT服务
│   └── logger/
│       └── logger.go          # 日志模块
└── go.mod                     # Go模块定义
└── readme.md                  # 项目介绍
```
