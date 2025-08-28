'''
Author: JeffreyZhu 1624410543@qq.com
Date: 2025-08-28 13:09:27
LastEditors: JeffreyZhu 1624410543@qq.com
LastEditTime: 2025-08-28 15:10:57
FilePath: /GardenGuideAI/FloraAPI/main.py
Description: 植物识别API

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''


from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException, Header, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Optional
import io
import os
from deepseek_api.ds_service import get_deepseek_answer
from app.predict import predict

app = FastAPI(title="FloraAPI", description="植物识别API")

APIKEY = "SGSGZFDHTHYITUTKMHVNVBNCSDFADQWDZSCZC"

"""
    植物识别接口
    
    - file: 上传的植物图片文件
    - user_agent: 客户端User-Agent头
    - authorization: 认证头
"""
@app.post("/identify")
async def identify_flora(
    file: UploadFile = File(...),
    authorization: Optional[str] = Header(None)
):
    # 记录请求头信息
    headers_info = {
        # "user_agent": user_agent,
        "authorization": authorization,
        "filename": file.filename,
        "content_type": file.content_type
    }
    if headers_info["authorization"] != APIKEY:
        return {"error": "Invalid API Key"}, 401
    
    # 读取文件内容
    contents = await file.read()

    image = Image.open(io.BytesIO(contents))
    
    # 保存图片
    print(image.size)

    identify_flora_result =  predict(image)

    answer = get_deepseek_answer(identify_flora_result)

    response = {
        "result": identify_flora_result,
        "answer": answer
    }


@app.get("/")
def read_root():
    return {"Hello": "World"}


