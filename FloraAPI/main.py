'''
Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
Date: 2025-08-29 13:47:13
LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
LastEditTime: 2025-09-04 00:53:24
FilePath: /GardenGuideAI/FloraAPI/main.py
Description: 

Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
'''


from PIL import Image
from fastapi import APIRouter,FastAPI, File, UploadFile, HTTPException, Header, Request, Depends
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import io
import os
import numpy as np
import jwt
from openai import AsyncOpenAI
from deepseek_api.ds_service import get_deepseek_answer, get_deepseek_answer_stream
from app.predict import predict
from app.export import IdentifyFlora
from app.train import Config
from utils import read_json_file,verify_token
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
import httpx
import asyncio
import json
import os

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


# @v1.post("/deepseek")
# async def getDeepSeekAnswer(
#     request: Request,
#     token_payload: dict = Depends(verify_token)
# ):
#     """
#         DeepSeek问答接口
#         - question: 用户提问的问题
#         - Authorization: Bearer <token>
#     """
#     question = request.query_params.get("question")
#     if not question:
#         raise HTTPException(status_code=400, detail="Question parameter is required")
#     answer = get_deepseek_answer(question)
#     return {
#         "code":200,
#         "message":"success",
#         "answer": answer
#     }

# @v1.post("/deepseek")
# async def deepseek_endpoint(question: str, token_payload: dict = Depends(verify_token)):
#     """
#     处理对 DeepSeek 的流式请求。
#     """
#     # 在这里可以添加您的 token 验证逻辑
#     # verify_token(authorization)
    
#     # 返回一个流式响应
#     return StreamingResponse(get_deepseek_answer_stream(f"请介绍一下植物：{question}"), media_type="text/plain; charset=utf-8")



DEEPSEEK_API_KEY = "sk-b906da3faf9f4a9bb7f36755cb599e38"
if not DEEPSEEK_API_KEY:
    raise ValueError("Please set the DEEPSEEK_API_KEY environment variable.")

client = AsyncOpenAI(
    api_key=DEEPSEEK_API_KEY,
    base_url="https://api.deepseek.com"  # DeepSeek API 地址[7,8](@ref)
)

import json
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import asyncio
from openai import AsyncOpenAI  # 假设使用 openai 库

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    model: str = "deepseek-chat"
    stream: bool = True



@v1.post("/deepseek")
async def chat_stream(request: ChatRequest):
    try:
        messages = [{"role": "user", "content": request.message}]

        stream = await client.chat.completions.create(
            model=request.model,
            messages=messages, # type: ignore
            stream=True
        ) # type: ignore

        async def event_generator():
            buffer = ""  # 初始化一个缓冲区
            try:
                async for chunk in stream:
                    content = chunk.choices[0].delta.content
                    if content is not None:
                        buffer += content  # 将内容添加到缓冲区
                        if len(buffer) >= 10 or any(sep in buffer for sep in ('. ', '! ', '? ', '\n')):
                            yield f"data: {json.dumps({'content': buffer})}\n\n"
                            buffer = ""  # 清空缓冲区
                        await asyncio.sleep(0.01)
                if buffer:
                    yield f"data: {json.dumps({'content': buffer})}\n\n"
                yield "data: [DONE]\n\n"  # 发送结束信号
            except Exception as e:
                error_msg = f"{{'error': 'Stream processing error: {str(e)}'}}"
                yield f"data: {json.dumps({'content': error_msg})}\n\n"

        return StreamingResponse(
            event_generator(),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "Connection": "keep-alive"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

app.include_router(v1)

frontend_ips = os.getenv("FRONTEND_IPS")
if frontend_ips:
    ips = [ip.strip() for ip in frontend_ips.split(",") if ip.strip()]
    allowed_origins = []
    for ip in ips:
        allowed_origins.extend([
            f"http://{ip}:8081",   # expo dev tools
            f"http://{ip}:19000",  # expo metro
            f"http://{ip}:19006",
            f"http://{ip}"
        ])
    allowed_origins.extend([
        "http://localhost:8081",
        "http://localhost:19000",
        "http://localhost:19006",
        "http://localhost"
    ])
else:
    allowed_origins = ["*"]


class DynamicCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        origin = request.headers.get("origin")
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

        if origin and (allowed_origins == ["*"] or origin in allowed_origins):
            response.headers["Access-Control-Allow-Origin"] = origin if allowed_origins != ["*"] else "*"
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = request.headers.get("access-control-request-headers", "*")

        return response

app.add_middleware(DynamicCORSMiddleware)


@app.get("/")
def read_root():
    """
    根路由
    """
    return {"Hello": "World"}