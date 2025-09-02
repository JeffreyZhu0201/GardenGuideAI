'''
Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
Date: 2025-08-29 13:47:13
LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
LastEditTime: 2025-09-02 09:44:19
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
from deepseek_api.ds_service import get_deepseek_answer
from app.predict import predict
from app.export import IdentifyFlora
from app.train import Config
from utils import read_json_file,verify_token
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response


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

frontend_ips = os.getenv("FRONTEND_IPS")
if frontend_ips:
    ips = [ip.strip() for ip in frontend_ips.split(",") if ip.strip()]
    allowed_origins = []
    for ip in ips:
        # 常见 Expo/开发端口及裸 IP
        allowed_origins.extend([
            f"http://{ip}:8081",   # expo dev tools
            f"http://{ip}:19000",  # expo metro
            f"http://{ip}:19006",
            f"http://{ip}"
        ])
    # 保留 localhost 以便本机开发调试
    allowed_origins.extend([
        "http://localhost:8081",
        "http://localhost:19000",
        "http://localhost:19006",
        "http://localhost"
    ])
else:
    # 未设置时允许所有来源（与之前行为一致）
    allowed_origins = ["*"]


class DynamicCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        origin = request.headers.get("origin")
        # 处理预检请求（OPTIONS）
        if request.method == "OPTIONS" and request.headers.get("access-control-request-method") == "POST":
            headers = {}
            if origin and (allowed_origins == ["*"] or origin in allowed_origins):
                headers = {
                    "Access-Control-Allow-Origin": origin if allowed_origins != ["*"] else "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": request.headers.get("access-control-request-headers", "*"),
                }
            return Response(status_code=204, headers=headers)

        response = await call_next(request)

        # 对非预检请求也设置 CORS 响应头（如果 Origin 合法）
        if origin and (allowed_origins == ["*"] or origin in allowed_origins):
            response.headers["Access-Control-Allow-Origin"] = origin if allowed_origins != ["*"] else "*"
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
            # 尝试保留客户端请求的允许头列表
            response.headers["Access-Control-Allow-Headers"] = request.headers.get("access-control-request-headers", "*")

        return response

# 注册自定义 CORS 中间件（替代固定 CORSMiddleware）
app.add_middleware(DynamicCORSMiddleware)


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

@app.get("/")
def read_root():
    """
    根路由
    """
    return {"Hello": "World"}