"""
Author: JeffreyZhu 1624410543@qq.com
Date: 2025-08-28 13:09:27
LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
LastEditTime: 2025-08-30 15:15:23
FilePath: /My_SelfMTL/home/students/undergraduate/zhuzy/code/FloraAPI/main.py
Description: 植物识别API

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
"""

from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException, Header, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import io
import os
import jwt
from jwt import PyJWTError
from deepseek_api.ds_service import get_deepseek_answer
from app.predict import predict
from app.export import IdentifyFlora
from app.train import Config
from utils import read_json_file

app = FastAPI(title="FloraAPI", description="植物识别API")

# JWT配置（请根据您的实际配置修改）
JWT_SECRET_KEY = "yawdawdawfrgtdhdtdwrdf"  # 与其他应用相同的密钥
JWT_ALGORITHM = "HS256"

identifyModel = IdentifyFlora(Config=Config)

id_to_cat = read_json_file("app/dataset/1/category_mapping.json")

if id_to_cat == None:
    print("id_to_cat is None")
    exit(1)

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

@app.post("/identify")
async def identify_flora(
    file: UploadFile = File(...),
    token_payload: dict = Depends(verify_token)
):
    """
        植物识别接口
        - file: 上传的植物图片文件
        - Authorization: Bearer <token>
    """
    # 记录请求头信息
    headers_info = {
        "filename": file.filename,
        "content_type": file.content_type,
    }
    
    # 读取文件内容
    contents = await file.read()

    image = Image.open(io.BytesIO(contents))

    identify_flora_result_id = identifyModel.identify(image)

    identify_flora_result_name = id_to_cat[str(identify_flora_result_id)]  # type: ignore

    response = {
        "code": 200,
        "msg": "success",
        "data": {
            "id": identify_flora_result_id,
            "name": identify_flora_result_name,
        },
    }
    return response

@app.post("/deepseek")
async def getDeepSeekAnswer(
    request: Request,
    token_payload: dict = Depends(verify_token)
):
    question = request.query_params.get("question")
    if not question:
        raise HTTPException(status_code=400, detail="Question parameter is required")
    answer = get_deepseek_answer(question)
    return {
        "code":200,
        "message":"success",
        "answer": answer
    }

@app.get("/")
def read_root():
    return {"Hello": "World"}