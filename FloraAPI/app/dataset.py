'''
Author: JeffreyZhu 1624410543@qq.com
Date: 2025-08-28 09:33:59
LastEditors: JeffreyZhu 1624410543@qq.com
LastEditTime: 2025-08-28 09:35:52
FilePath: /GardenGuideAI/FloraAPI/app/dataset.py
Description: 

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''


import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader

class FloraDataset(Dataset):
    def __init__(self, data, labels, transform=None):
        self.data = data
        self.labels = labels
        self.transform = transform

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        sample = self.data[idx]
        label = self.labels[idx]
        
        if self.transform:
            sample = self.transform(sample)
        
        return sample, label
