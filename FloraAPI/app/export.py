'''
Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
Date: 2025-08-28 21:51:35
LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
LastEditTime: 2025-08-30 13:24:12
FilePath: /GardenGuideAI/FloraAPI/app/export.py
Description: 

Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
'''


from PIL import Image
import torch
import torch.nn as nn
import torchvision
from app.train import VisionTransformer
from app.utils import get_transforms

class IdentifyFlora:
    def __init__(self,Config):
        self.Config = Config()

        self.model = VisionTransformer(
            img_size=Config.image_size,
            patch_size=Config.patch_size,
            in_channels=Config.in_channels,
            num_classes=Config.num_classes,
            embed_dim=Config.embed_dim,
            depth=Config.depth,
            num_heads=Config.num_heads,
            mlp_ratio=Config.mlp_ratio
        ).to(Config.device)

        self.model.load_state_dict(torch.load("./app/checkpoints/best_model.pth", map_location=Config.device))
        print("数据加载成功")
        self.model.to(device=self.Config.device)
        _,_,self.transform = get_transforms(Config=Config)

    def identify(self,image):
        '''
        description: 识别植物
        param {*} self
        param {*} image Image 待识别的植物图片
        return {*}
        '''
        print("开始识别")
        image = torch.tensor(self.transform(image))

        image = image.view(1,*image.shape)
        image = image.to(self.Config.device)
        self.model.eval()
        with torch.no_grad():
            category = self.model(image)
        result = torch.argmax(category,dim=1).item()
        print("识别完成",result)
        return result

# if __name__ == "__main__":
#     identifyFlora = IdentifyFlora()
