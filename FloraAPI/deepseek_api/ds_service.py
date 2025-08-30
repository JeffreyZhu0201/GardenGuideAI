'''
Author: JeffreyZhu 1624410543@qq.com
Date: 2025-08-28 13:14:13
LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
LastEditTime: 2025-08-30 15:11:51
FilePath: /My_SelfMTL/home/students/undergraduate/zhuzy/code/FloraAPI/deepseek_api/ds_service.py
Description: deepseek api service

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''

from openai import OpenAI

client = OpenAI(api_key="sk-b906da3faf9f4a9bb7f36755cb599e38", base_url="https://api.deepseek.com")
'''
description: 获取deepseek的回答
param {*} question
return {*}
'''
def get_deepseek_answer(question: str) -> str:
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": "你是一个专业的植物专家和种植爱好者,你需要根据用户上传的植物名称,回答植物的基本信息,生长属性,养护指南,以及意义或花语。只返回html格式回答,不要返回markdown格式,只要body部分,适当添加表情"},
            {"role": "user", "content": question},
        ],
        stream=False
    )

    return response.choices[0].message.content if response.choices[0].message.content else "没有回答"

if __name__ == "__main__":
    print(get_deepseek_answer("大豆"))