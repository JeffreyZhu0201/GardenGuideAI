'''
Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
Date: 2025-08-29 13:47:13
LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
LastEditTime: 2025-08-31 09:15:58
FilePath: /GardenGuideAI/FloraAPI/main.py
Description: 

Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
'''


from PIL import Image
from fastapi import APIRouter,FastAPI, File, UploadFile, HTTPException, Header, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import io
import os
import numpy as np
import jwt
from jwt import PyJWTError
from deepseek_api.ds_service import get_deepseek_answer
from app.predict import predict
from app.export import IdentifyFlora
from app.train import Config
from utils import read_json_file,verify_token

app = FastAPI(title="FloraAPI", description="植物识别API")
v1 = APIRouter(prefix="/api/v1")  # 新增版本路由

identifyModel = IdentifyFlora(Config=Config)

id_to_cat = read_json_file("app/checkpoints/category_mapping.json")
np.random.seed(42)
if id_to_cat == None:
    print("id_to_cat is None")
    exit(1)

@v1.post("/identify")
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

@v1.post("/deepseek")
async def getDeepSeekAnswer(
    request: Request,
    token_payload: dict = Depends(verify_token)
):
    """
        DeepSeek问答接口
        - question: 用户提问的问题
        - Authorization: Bearer <token>
    """
    question = request.query_params.get("question")
    if not question:
        raise HTTPException(status_code=400, detail="Question parameter is required")
    answer = get_deepseek_answer(question)
    return {
        "code":200,
        "message":"success",
        "answer": answer
    }

app.include_router(v1)  # 包含版本路由

@app.get("/")
def read_root():
    """
    根路由
    """
    return {"Hello": "World"}