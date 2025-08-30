'''
Author: JeffreyZhu 1624410543@qq.com
Date: 2025-08-28 09:34:13
LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
LastEditTime: 2025-08-30 08:46:03
FilePath: /My_SelfMTL/home/students/undergraduate/zhuzy/code/经典模型复现/UNET/app copy/model.py
Description: 

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''


from typing import OrderedDict
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image
import numpy as np
import torchvision
import math

# ViT模型实现
class PatchEmbedding(nn.Module):
    """将图像分割成小块并嵌入到向量空间"""
    def __init__(self, img_size=224, patch_size=16, in_channels=3, embed_dim=768):
        super().__init__()
        self.img_size = img_size
        self.patch_size = patch_size
        self.n_patches = (img_size // patch_size) ** 2
        
        self.proj = nn.Conv2d(
            in_channels=in_channels,
            out_channels=embed_dim,
            kernel_size=patch_size,
            stride=patch_size
        )
    
    def forward(self, x):
        x = self.proj(x)  # [B, E, H/P, W/P]
        x = x.flatten(2)  # [B, E, N]
        x = x.transpose(1, 2)  # [B, N, E]
        return x

class PositionalEncoding(nn.Module):
    """位置编码"""
    def __init__(self, embed_dim, n_patches, dropout=0.1):
        super().__init__()
        self.pos_embed = nn.Parameter(torch.zeros(1, n_patches + 1, embed_dim))
        self.dropout = nn.Dropout(dropout)
        nn.init.trunc_normal_(self.pos_embed, std=0.02)
    
    def forward(self, x):
        x = x + self.pos_embed[:, :x.size(1)]
        return self.dropout(x)

class MultiHeadAttention(nn.Module):
    """多头注意力机制"""
    def __init__(self, embed_dim, num_heads, dropout=0.1):
        super().__init__()
        assert embed_dim % num_heads == 0, "embed_dim必须能被num_heads整除"
        
        self.embed_dim = embed_dim
        self.num_heads = num_heads
        self.head_dim = embed_dim // num_heads
        
        self.qkv = nn.Linear(embed_dim, embed_dim * 3)
        self.dropout = nn.Dropout(dropout)
        self.proj = nn.Linear(embed_dim, embed_dim)
    
    def forward(self, x, mask=None):
        B, N, E = x.shape
        qkv = self.qkv(x).reshape(B, N, 3, self.num_heads, self.head_dim)
        q, k, v = qkv.permute(2, 0, 3, 1, 4)
        
        attn = (q @ k.transpose(-2, -1)) / math.sqrt(self.head_dim)
        
        if mask is not None:
            attn = attn.masked_fill(mask == 0, float('-inf'))
        
        attn = torch.softmax(attn, dim=-1)
        attn = self.dropout(attn)
        
        out = (attn @ v).transpose(1, 2).reshape(B, N, E)
        out = self.proj(out)
        return out

class MLP(nn.Module):
    """多层感知机"""
    def __init__(self, embed_dim, mlp_ratio, dropout=0.1):
        super().__init__()
        hidden_dim = int(embed_dim * mlp_ratio)
        self.fc1 = nn.Linear(embed_dim, hidden_dim)
        self.act = nn.GELU()
        self.fc2 = nn.Linear(hidden_dim, embed_dim)
        self.dropout = nn.Dropout(dropout)
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.act(x)
        x = self.dropout(x)
        x = self.fc2(x)
        x = self.dropout(x)
        return x

class TransformerBlock(nn.Module):
    """Transformer编码块"""
    def __init__(self, embed_dim, num_heads, mlp_ratio, dropout=0.1):
        super().__init__()
        self.norm1 = nn.LayerNorm(embed_dim)
        self.attn = MultiHeadAttention(embed_dim, num_heads, dropout)
        self.norm2 = nn.LayerNorm(embed_dim)
        self.mlp = MLP(embed_dim, mlp_ratio, dropout)
    
    def forward(self, x, mask=None):
        x = x + self.attn(self.norm1(x), mask)
        x = x + self.mlp(self.norm2(x))
        return x

class VisionTransformer(nn.Module):
    """完整的ViT模型"""
    def __init__(self, img_size=224, patch_size=16, in_channels=3, num_classes=102, 
                 embed_dim=768, depth=12, num_heads=12, mlp_ratio=4.0, dropout=0.1):
        super().__init__()
        self.patch_embed = PatchEmbedding(img_size, patch_size, in_channels, embed_dim)
        n_patches = self.patch_embed.n_patches
        
        # 分类token和位置编码
        self.cls_token = nn.Parameter(torch.zeros(1, 1, embed_dim))
        self.pos_embed = PositionalEncoding(embed_dim, n_patches, dropout)
        
        # Transformer编码器
        self.blocks = nn.ModuleList([
            TransformerBlock(embed_dim, num_heads, mlp_ratio, dropout)
            for _ in range(depth)
        ])
        
        # 层归一化和分类头
        self.norm = nn.LayerNorm(embed_dim)
        self.head = nn.Sequential(
            nn.Linear(embed_dim, embed_dim // 2),
            nn.GELU(),
            nn.Dropout(0.2),
            nn.Linear(embed_dim // 2, num_classes)
        )
        
        # 初始化权重
        self.apply(self._init_weights)
    
    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
            nn.init.xavier_uniform_(module.weight)
            if module.bias is not None:
                nn.init.zeros_(module.bias)
        elif isinstance(module, nn.LayerNorm):
            nn.init.ones_(module.weight)
            nn.init.zeros_(module.bias)
        elif isinstance(module, nn.Conv2d):
            nn.init.xavier_uniform_(module.weight)
            if module.bias is not None:
                nn.init.zeros_(module.bias)
    
    def forward(self, x):
        B = x.shape[0]
        
        # 图像分块嵌入
        x = self.patch_embed(x)
        
        # 添加分类token
        cls_token = self.cls_token.expand(B, -1, -1)
        x = torch.cat((cls_token, x), dim=1)
        
        # 添加位置编码
        x = self.pos_embed(x)
        
        # Transformer编码器
        for block in self.blocks:
            x = block(x)
        
        # 层归一化
        x = self.norm(x)
        
        # 分类头
        cls_token_out = x[:, 0]
        logits = self.head(cls_token_out)
        
        return logits


# 示例用法
if __name__ == "__main__":
    # 创建模型
    # vit = VisionTransformer(
    #     img_size=224,
    #     patch_size=16,
    #     in_channels=3,
    #     n_classes=10,  # 假设有10个类别
    #     embed_dim=768,
    #     depth=12,
    #     n_heads=12,
    #     mlp_dim=3072
    # )
    
    # 模拟输入数据
    batch_size = 4
    x = torch.randn(batch_size, 3, 224, 224)
    
    # 前向传播
    # logits = vit(x)
    # print("Output shape:", logits.shape)  # 应该输出 [4, 10]
    
# if __name__ == "__main__":
#     # model = UNet(in_channels=3, out_channels=1,num_classes=5)
#     x = torch.randn((1, 3, 256, 256))
#     preds = model(x)
    
#     print(preds.shape)
#     torch.cuda.empty_cache()
#     del model, x, preds