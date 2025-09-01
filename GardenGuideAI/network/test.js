/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-09-01 02:55:50
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 03:02:48
 * @FilePath: /GardenGuideAI/GardenGuideAI/network/test.js
 * @Description: 
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */


export async function hello(){
     await fetch("http://192.168.215.4:8080/api/v1/login",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email:"1624410543@qq.com",password:"1231231231"})
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Or res.text() if the response is not JSON
    }).then((data) => {
        console.log("Response data:", data);
    }).catch((error) => {
        console.error("Fetch error:", error);
    });
}

hello()