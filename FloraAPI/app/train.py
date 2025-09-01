'''
Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
Date: 2025-08-29 19:07:51
LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
LastEditTime: 2025-08-30 13:25:13
FilePath: /GardenGuideAI/FloraAPI/app/train.py
Description: 

Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
'''
import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.cuda.amp import GradScaler, autocast
import numpy as np
from tqdm import tqdm
import math
import json
import matplotlib.pyplot as plt
from app.model import VisionTransformer
from app.dataset import load_datasets,create_dataloaders

'''
description: 配置文件
return {*}
'''
class Config:
    # 数据集路径 (请根据实际路径修改)
    data_path = "./dataset/1"
    # 训练参数
    batch_size = 32
    num_workers = 4
    num_epochs = 150  # 从零开始训练需要更多epoch
    learning_rate = 3e-4
    weight_decay = 0.3
    
    # 模型参数
    image_size = 224
    patch_size = 16
    in_channels = 3
    num_classes = 102  # Flora-102有102个类别
    embed_dim = 768    # ViT-Base的嵌入维度
    depth = 12         # Transformer层数
    num_heads = 12     # 注意力头数
    mlp_ratio = 4.0    # MLP扩展比例
    
    # 设备配置
    device = torch.device("cuda" if torch.cuda.is_available() else ("mps" if torch.backends.mps.is_available() else "cpu"))
    
    # 保存路径
    save_dir = "./app/checkpoints"
    os.makedirs(save_dir, exist_ok=True)
    
    # 训练记录保存路径
    history_path = os.path.join(save_dir, "training_history.json")
    plot_path = os.path.join(save_dir, "training_plot.png")


'''
description: 保存训练历史
param {*} history
return {*}
'''
def save_history(history):
    with open(Config.history_path, 'w') as f:
        json.dump(history, f, indent=4)
    
    plt.figure(figsize=(12, 5))

    # 绘制Loss曲线
    plt.subplot(1, 2, 1)
    plt.plot(history['train_loss'], label='Train Loss')
    plt.plot(history['val_loss'], label='Validation Loss')
    plt.title('Training and Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    
    # 绘制Accuracy曲线
    plt.subplot(1, 2, 2)
    plt.plot(history['train_acc'], label='Train Accuracy')
    plt.plot(history['val_acc'], label='Validation Accuracy')
    plt.title('Training and Validation Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy (%)')
    plt.legend()
    
    plt.tight_layout()
    plt.savefig(Config.plot_path)
    plt.close()

'''
description: 训练一个epoch
param {*} model
param {*} train_loader
param {*} optimizer
param {*} criterion
param {*} scaler
param {*} scheduler
return {*}
'''
def train_one_epoch(model, train_loader, optimizer, criterion, scaler, scheduler=None):
    model.train()
    total_loss = 0.0
    correct = 0
    total = 0
    
    progress_bar = tqdm(train_loader, desc="Training", leave=False)
    
    for images, labels,name in progress_bar:
        images = images.to(Config.device)
        labels = labels.to(Config.device)
        
        optimizer.zero_grad()
        
        with autocast():
            outputs = model(images)
            loss = criterion(outputs, labels)
        
        scaler.scale(loss).backward()
        scaler.step(optimizer)
        scaler.update()
        
        if scheduler:
            scheduler.step()
        
        total_loss += loss.item()
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()
        
        progress_bar.set_postfix({
            "Loss": f"{total_loss / (total / Config.batch_size):.4f}",
            "Acc": f"{100 * correct / total:.2f}%"
        })
    
    avg_loss = total_loss / len(train_loader)
    accuracy = 100 * correct / total
    
    return avg_loss, accuracy

'''
description: 验证模型
param {*} model
param {*} val_loader
param {*} criterion
return {*}
'''
def validate(model, val_loader, criterion):
    model.eval()
    total_loss = 0.0
    correct = 0
    total = 0
    
    progress_bar = tqdm(val_loader, desc="Validation", leave=False)
    
    with torch.no_grad():
        for images, labels,name in progress_bar:
            images = images.to(Config.device)
            labels = labels.to(Config.device)
            
            outputs = model(images)
            loss = criterion(outputs, labels)
            
            total_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
            
            progress_bar.set_postfix({
                "Loss": f"{total_loss / (total / Config.batch_size):.4f}",
                "Acc": f"{100 * correct / total:.2f}%"
            })
    
    avg_loss = total_loss / len(val_loader)
    accuracy = 100 * correct / total
    
    return avg_loss, accuracy

# 主训练循环
def main():
    # 初始化
    torch.backends.cudnn.benchmark = True
    
    train_dataset, val_dataset,test_dataset = load_datasets(Config)
    train_loader, val_loader,_ = create_dataloaders(Config,train_dataset, val_dataset,test_dataset)
    
    model = VisionTransformer(
        img_size=Config.image_size,
        patch_size=Config.patch_size,
        in_channels=Config.in_channels,
        num_classes=Config.num_classes,
        embed_dim=Config.embed_dim,
        depth=Config.depth,
        num_heads=Config.num_heads,
        mlp_ratio=Config.mlp_ratio
    ).to(Config.device)
    
    criterion = nn.CrossEntropyLoss(label_smoothing=0.1)  
    optimizer = optim.AdamW(
        model.parameters(),
        lr=Config.learning_rate,
        weight_decay=Config.weight_decay
    )
    
    warmup_epochs = 10
    warmup_scheduler = optim.lr_scheduler.LinearLR(
        optimizer,
        start_factor=0.01,
        end_factor=1.0,
        total_iters=warmup_epochs * len(train_loader)
    )
    
    cosine_scheduler = optim.lr_scheduler.CosineAnnealingLR(
        optimizer,
        T_max=(Config.num_epochs - warmup_epochs) * len(train_loader),
        eta_min=1e-6
    )
    
    scheduler = optim.lr_scheduler.SequentialLR(
        optimizer,
        schedulers=[warmup_scheduler, cosine_scheduler],
        milestones=[warmup_epochs * len(train_loader)]
    )
    
    # 混合精度训练
    scaler = GradScaler()
    
    # 训练记录
    best_val_acc = 0.0
    history = {
        "train_loss": [],
        "train_acc": [],
        "val_loss": [],
        "val_acc": []
    }

    # 训练循环
    for epoch in range(Config.num_epochs): # 
        print(f"\nEpoch {epoch + 1}/{Config.num_epochs}")
        # 训练
        train_loss, train_acc = train_one_epoch(
            model, train_loader, optimizer, criterion, scaler, scheduler
        )
        
        # 验证
        val_loss, val_acc = validate(model, val_loader, criterion)
        
        # 记录历史
        history["train_loss"].append(train_loss)
        history["train_acc"].append(train_acc)
        history["val_loss"].append(val_loss)
        history["val_acc"].append(val_acc)
        
        # 保存历史记录
        save_history(history)
        
        # 打印结果
        print(f"Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}%")
        print(f"Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.2f}%")
        
        # 保存最佳模型
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), os.path.join(Config.save_dir, "best_model.pth"))
            print(f"New best model saved with val acc: {val_acc:.2f}%")
        
        # 定期保存
        if (epoch + 1) % 10 == 0:
            torch.save(model.state_dict(), os.path.join(Config.save_dir, f"model_epoch_{epoch + 1}.pth"))
    
    print(f"\nTraining completed. Best validation accuracy: {best_val_acc:.2f}%")

if __name__ == "__main__":
    main()