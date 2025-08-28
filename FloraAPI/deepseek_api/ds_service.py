'''
Author: JeffreyZhu 1624410543@qq.com
Date: 2025-08-28 13:14:13
LastEditors: JeffreyZhu 1624410543@qq.com
LastEditTime: 2025-08-28 15:25:08
FilePath: /GardenGuideAI/FloraAPI/deepseek_api/ds_service.py
Description: deepseek api service

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''

def get_deepseek_answer(identify_flora_result: str):

    """
    调用deepseek api获取答案
    """
    import requests
    url = "https://api.deepseek.cn/v1/chat/completions"
    payload = {
        "model": "deepseek-3.5",
        "messages": [
            {
                "role": "user",
                "content": f"你是一个植物专家，玫瑰花是什么植物 告诉我他的习性 从而对我种植有帮助 并且告诉我一些关于这个花的人文上的知识 请用中文回答，只要核心信息，小红书网红爆款风格，不要回答问候词"
            }
        ]
    }
    headers = {
        "Authorization": "Bearer 123456",
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

