'''
Author: JeffreyZhu 1624410543@qq.com
Date: 2025-08-28 09:33:59
LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
LastEditTime: 2025-08-30 14:22:16
FilePath: /My_SelfMTL/home/students/undergraduate/zhuzy/code/FloraAPI/app/dataset.py
Description: 植物数据集类

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''


import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader
from sklearn.preprocessing import LabelBinarizer,OneHotEncoder
from collections import defaultdict
from scipy import sparse
import numpy as np
import os
from PIL import Image
import pandas as pd
from app.utils import get_transforms
'''
description: 植物数据集类
param {*} data 数据集 []
param {*} labels 标签 []
return {
    "data":data, # np
    "labels":labels # np 稀疏数组
}
'''
class FloraDataset(Dataset):
    def __init__(self, csvPath,folderName, transform=None):
        self.csv_path = csvPath
        self.folderName = folderName
        self.transform = transform

        self.dataPath,self.labels = self.loadData(csvPath,folderName)

    def __len__(self):
        return len(self.dataPath)

    def loadData(self,csvPath,folerName):
        
        data = []
        labels = []
        
        dataFile = pd.read_csv(os.path.join(csvPath,folerName)+'.csv')
        for index,row in dataFile.iterrows():
            data.append(row["image:FILE"])
            labels.append(row["category"])

        return data, labels

    def __getitem__(self, idx):
        sample = self.dataPath[idx]
        label = self.labels[idx]
        image = Image.open(os.path.join(self.csv_path,sample))
        name = sample.split("/")[-1]
    
        if self.transform:
            image = self.transform(image)
        return image, torch.tensor(label, dtype=torch.long),name

def load_datasets(Config):
    train_transform, val_transform,test_transform = get_transforms(Config=Config)
    
    train_dataset = FloraDataset(
        csvPath=Config.data_path,
        folderName="train",
        transform=train_transform
    )
    
    val_dataset = FloraDataset(
        csvPath=Config.data_path,
        folderName="val",
        transform=val_transform
    )

    test_dataset = FloraDataset(
        csvPath=Config.data_path,
        folderName="test",
        transform=test_transform
    )
    
    return train_dataset, val_dataset,test_dataset


# 创建数据加载器
def create_dataloaders(Config,train_dataset, val_dataset,test_dataset):
    train_loader = DataLoader(
        train_dataset,
        batch_size=Config.batch_size,
        shuffle=True,
        num_workers=Config.num_workers,
        pin_memory=True,
        drop_last=True
    )
    
    val_loader = DataLoader(
        val_dataset,
        batch_size=Config.batch_size,
        shuffle=False,
        num_workers=Config.num_workers,
        pin_memory=True
    )

    test_loader = DataLoader(
        test_dataset,
        batch_size=Config.batch_size,
        shuffle=False,
        num_workers=Config.num_workers,
        pin_memory=True
    )
    
    return train_loader, val_loader,test_loader