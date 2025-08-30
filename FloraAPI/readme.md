<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-08-30 16:00:05
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-08-30 16:01:19
 * @FilePath: /My_SelfMTL/home/students/undergraduate/zhuzy/code/FloraAPI/readme.md
 * @Description: 植物识别API
 * 
 * Copyright (c) 2025 by ${error: git config user.name & please set dead value or install git}, All Rights Reserved. 
-->



使用说明
配置JWT密钥：请将 JWT_SECRET_KEY 设置为与其他应用相同的密钥
请求格式：客户端需要在请求头中包含 Authorization: Bearer <token>
token验证：系统会验证token的有效性和过期时间
注意事项
确保安装了JWT库：pip install PyJWT
根据您的实际JWT配置修改 JWT_SECRET_KEY 和 JWT_ALGORITHM

## 启动项目
```
uvicorn main:app --reload
```
