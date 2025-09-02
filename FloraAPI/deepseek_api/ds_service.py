'''
Author: JeffreyZhu JeffreyZhu0201@gmail.com
Date: 2025-08-28 13:14:13
LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
LastEditTime: 2025-09-02 22:37:42
FilePath: /GardenGuideAI/FloraAPI/deepseek_api/ds_service.py
Description: deepseek api service

Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
'''

import os
import asyncio
import logging
from typing import AsyncGenerator, Optional
from openai import OpenAI

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use env vars (do NOT hardcode keys)
DEEPSEEK_KEY = "sk-b906da3faf9f4a9bb7f36755cb599e38"
DEEPSEEK_BASE = os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com")

if not DEEPSEEK_KEY:
    logger.warning("DEEPSEEK_API_KEY not set in environment")

# Initialize client (OpenAI-compatible DeepSeek client)
try:
    client = OpenAI(api_key=DEEPSEEK_KEY, base_url=DEEPSEEK_BASE)
except Exception as e:
    logger.exception("Failed to initialize DeepSeek/OpenAI client")
    client = None

def _extract_content_from_chunk(chunk) -> Optional[str]:
    """
    Safely extract the 'content' text from a streaming chunk returned by the client.
    Handles both object-attribute and dict shapes.
    """
    try:
        # preferred: attribute access
        return getattr(chunk.choices[0].delta, "content", None)
    except Exception:
        try:
            # fallback: dict-like
            return chunk.get("choices", [{}])[0].get("delta", {}).get("content")
        except Exception:
            return None

'''
description: 获取deepseek的回答
param {*} question
return {*}
'''
def get_deepseek_answer(question: str) -> str:
    response = client.chat.completions.create( # type: ignore
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": "你是一个专业的植物专家和种植爱好者,你需要根据用户上传的植物名称,回答植物的基本信息,生长属性,养护指南,以及意义或花语。只返回markdown格式回答,适当添加表情"},
            {"role": "user", "content": question},
        ],
        stream=False
    )

    return response.choices[0].message.content if response.choices[0].message.content else "没有回答"


'''
description: 获取deepseek的回答
param {str} question
return {*}
'''
async def get_deepseek_answer_stream(question: str) -> AsyncGenerator[str, None]:
    """
    Async generator that yields text chunks from DeepSeek (via OpenAI-compatible client).
    Yields pieces of text as soon as they arrive.
    """
    if client is None:
        logger.error("DeepSeek client is not initialized")
        yield "[ERROR] 后端 DeepSeek 服务未配置，请联系管理员。"
        return

    logger.info("Requesting DeepSeek stream for question: %s", question)
    try:
        # create stream request (stream=True)
        stream = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "你是一位知识渊博的植物学家，请用中文详细、通俗地介绍用户提到的植物。"},
                {"role": "user", "content": question},
            ],
            max_tokens=1024,
            temperature=0.7,
            stream=True,
        )

        chunk_count = 0
        for chunk in stream:
            content = _extract_content_from_chunk(chunk)
            if content:
                chunk_count += 1
                # yield raw text chunk (frontend will concatenate)
                yield content
                # small sleep to let event loop schedule I/O
                await asyncio.sleep(0.01)

        if chunk_count == 0:
            logger.warning("DeepSeek stream completed but no content yielded")
            # yield a friendly message (optional)
            yield "[WARN] 未收到 DeepSeek 的内容，可能是请求问题。"

        logger.info("DeepSeek streaming finished, chunks: %d", chunk_count)

    except Exception as e:
        logger.exception("Error while streaming from DeepSeek: %s", e)
        # yield an error chunk so client does not see empty body
        yield f"[ERROR] DeepSeek 服务调用失败：{str(e)}"

if __name__ == "__main__":
    print(get_deepseek_answer("大豆"))