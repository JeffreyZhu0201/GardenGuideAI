'''
Author: JeffreyZhu JeffreyZhu0201@gmail.com
Date: 2025-08-28 15:14:26
LastEditors: JeffreyZhu JeffreyZhu0201@gmail.com
LastEditTime: 2025-08-28 15:14:28
FilePath: /GardenGuideAI/FloraAPI/app/predict.py
Description: 识别接口api

Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
'''

import torch

from PIL import Image

'''
description: 调用pytorch模型识别图片中的植物
param {Image} image 图片
return {*} 识别结果
'''
def predict(image: Image.Image):
    """
    识别图片中的植物
    """
    return 1