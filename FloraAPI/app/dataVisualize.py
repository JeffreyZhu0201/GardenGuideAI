'''
Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
Date: 2025-08-29 19:10:28
LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
LastEditTime: 2025-08-29 19:10:38
FilePath: /app copy/dataVisualize.py
Description: 

Copyright (c) 2025 by ${error: git config user.name & please set dead value or install git}, All Rights Reserved. 
'''
import json
import matplotlib.pyplot as plt

with open("checkpoints/training_history.json") as f:
    history = json.load(f)

plt.plot(history["train_acc"], label="Train Acc")
plt.plot(history["val_acc"], label="Val Acc")
plt.legend()
plt.show()