'''
Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
Date: 2025-08-30 14:50:55
LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
LastEditTime: 2025-08-30 14:50:58
FilePath: /My_SelfMTL/home/students/undergraduate/zhuzy/code/FloraAPI/utils.py
Description: 工具函数

Copyright (c) 2025 by ${error: git config user.name & please set dead value or install git}, All Rights Reserved. 
'''

import json

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