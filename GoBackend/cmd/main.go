/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:22:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-09-01 20:22:21
 * @FilePath: /GardenGuideAI/GoBackend/cmd/main.go
 * @Description: 主程序入口文件
 *
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved.
 */

package main

import (
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/config"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/transport/gin"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/pkg/database"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/pkg/jwt"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/pkg/logger"
)

func main() {
	// 初始化配置
	cfg := config.Load()

	// 初始化基础设施
	log := logger.New(logger.LogConfig{
		Level:    cfg.Log.Level,
		FilePath: cfg.Log.FilePath,
	})
	// log.Info("服务启动中...")
	defer log.Sync()

	db := database.NewMySQL(cfg.DB.DSN)
	sqlDB, _ := db.DB()
	// log.Info("数据库连接成功")
	defer sqlDB.Close()

	// 初始化JWT服务
	jwtService := jwt.NewJWTService(
		[]byte(cfg.JWT.SecretKey),
		cfg.JWT.Expiration,
	)

	// 构建依赖关系
	server := gin.NewServer(
		gin.WithLogger(log),
		gin.WithDatabase(db),
		gin.WithJWTService(jwtService),
	)

	// 启动服务
	server.Run("0.0.0.0:" + cfg.Server.Port)
}
