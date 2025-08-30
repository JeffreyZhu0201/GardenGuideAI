'''
Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
Date: 2025-08-29 13:47:13
LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
LastEditTime: 2025-08-30 16:35:26
FilePath: /My_SelfMTL/home/students/undergraduate/zhuzy/code/FloraAPI/main.py
Description: 

Copyright (c) 2025 by ${error: git config user.name & please set dead value or install git}, All Rights Reserved. 
'''


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
from utils import read_json_file,verify_token


app = FastAPI(title="FloraAPI", description="植物识别API")

identifyModel = IdentifyFlora(Config=Config)

id_to_cat = read_json_file("app/dataset/1/category_mapping.json")

if id_to_cat == None:
    print("id_to_cat is None")
    exit(1)

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