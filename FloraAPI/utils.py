'''
Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
Date: 2025-08-30 14:50:55
LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
LastEditTime: 2025-08-31 08:53:53
FilePath: /GardenGuideAI/FloraAPI/utils.py
Description: 工具函数

Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
'''

import json
from typing import Optional

from fastapi import HTTPException, Header
from jwt import PyJWTError
import jwt

# JWT配置（请根据您的实际配置修改）
JWT_SECRET_KEY = "yawdawdawfrgtdhdtdwrdf"  # 与其他应用相同的密钥
JWT_ALGORITHM = "HS256"

# 读取JSON文件
def read_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"文件 {file_path} 不存在")
        return None
    except json.JSONDecodeError:
        print(f"文件 {file_path} 不是有效的JSON格式")
        return None

# JWT认证依赖函数
async def verify_token(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header is missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        # 提取Bearer token
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication scheme",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # 验证JWT token
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
        
    except (ValueError, PyJWTError):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )