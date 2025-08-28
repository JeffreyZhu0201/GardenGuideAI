'''
Author: JeffreyZhu 1624410543@qq.com
Date: 2025-08-27 15:37:56
LastEditors: JeffreyZhu 1624410543@qq.com
LastEditTime: 2025-08-27 15:45:21
FilePath: /GardenGuideAI/FloraAPI/main.py
Description: 
Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''

'''
description: 
return {*}
'''
from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
