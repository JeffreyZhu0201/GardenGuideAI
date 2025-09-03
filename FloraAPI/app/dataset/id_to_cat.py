'''
Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
Date: 2025-08-30 14:37:41
LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
LastEditTime: 2025-09-04 00:52:35
FilePath: /GardenGuideAI/FloraAPI/app/dataset/id_to_cat.py
Description: 

Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
'''

import pandas as pd
import os
import json

def create_category_mapping(csv_file_path):
    """
    从CSV文件创建ID到类别名的映射
    参数:
        csv_file_path (str): CSV文件路径
    返回:
        dict: 映射字典，格式为 {category_id: category_name}
    """
    # 读取CSV文件
    df = pd.read_csv(csv_file_path)
    
    # 创建映射字典
    category_mapping = {}
    
    for _, row in df.iterrows():
        image_path = row['image:FILE']
        category_id = row['category']
        
        # 从文件路径中提取类别名
        # 假设路径格式为: test/category_name/image.jpg
        path_parts = image_path.split('/')
        if len(path_parts) >= 2:
            category_name = path_parts[1]  # 第二个部分通常是类别名
            category_mapping[category_id] = category_name
    # 保存映射到JSON文件
    save_mapping_to_json(category_mapping, './1/category_mapping.json')
    return category_mapping


def save_mapping_to_json(mapping_dict, output_json_path):
    """
    将映射字典保存为JSON文件
    参数:
        mapping_dict (dict): 映射字典
        output_json_path (str): 输出JSON文件路径
    """
    try:
        # 确保目录存在
        os.makedirs(os.path.dirname(output_json_path), exist_ok=True)
        
        with open(output_json_path, 'w', encoding='utf-8') as f:
            json.dump(mapping_dict, f, ensure_ascii=False, indent=4)
        print(f"映射已成功保存到: {output_json_path}")
        return True
    except Exception as e:
        print(f"保存失败: {e}")
        return False


# 使用示例
if __name__ == "__main__":
    csv_path = "./1/train.csv"  # 替换为您的CSV文件路径
    mapping = create_category_mapping(csv_path)
    print("ID到类别名映射:", mapping)