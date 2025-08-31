/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-31 07:43:23
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 07:49:26
 * @FilePath: /GardenGuideAI/Website/src/pages/Home.js
 * @Description: 首页
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */

import React from "react";
import Hero from "../components/Hero";
import Analytics from "../components/Analytics";
import Newsletter from "../components/Newsletter";
import Cards from "../components/Cards";

export default function Home(){
    return (
        <div>
            <Hero />
            <Analytics />
            <Newsletter />
            <Cards />
        </div>
    )
}