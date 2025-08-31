/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:26:33
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-30 13:37:27
 * @FilePath: /GardenGuideAI/GoBackend/config/config.go
 * @Description:
 * 定义配置结构体
 * 包含服务器端口、数据库DSN、JWT密钥和过期时间等配置
 *
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved.
 */

// ... 保留文件头注释 ...

package config

import (
	"os"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Server struct {
		Port string
	}
	DB struct {
		DSN string
	}
	JWT struct {
		SecretKey  string
		Expiration time.Duration
	}
	Log struct {
		Level    string
		FilePath string
	}
}

func Load() *Config {
	// 加载.env文件（如果存在）
	_ = godotenv.Load()

	cfg := &Config{
		Server: struct{ Port string }{
			Port: getEnv("PORT", "8080"),
		},
		DB: struct{ DSN string }{
			DSN: getEnv("DB_DSN", "root:21fac6517e772a4b@tcp(47.108.248.188:3307)/gardenguide?charset=utf8mb4&parseTime=True"),
		},
		JWT: struct {
			SecretKey  string
			Expiration time.Duration
		}{
			SecretKey:  getEnv("JWT_SECRET", "my_secret_key_for_jwt"),
			Expiration: parseDuration(getEnv("JWT_EXPIRATION", "24h")),
		},
		Log: struct {
			Level    string
			FilePath string
		}{
			Level:    getEnv("LOG_LEVEL", "info"),
			FilePath: getEnv("LOG_PATH", "./logs/app.log"),
		},
	}
	return cfg
}

// 辅助函数：获取环境变量（带默认值）
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

// 辅助函数：解析时间间隔
func parseDuration(durationStr string) time.Duration {
	duration, err := time.ParseDuration(durationStr)
	if err != nil {
		panic("无效的时间间隔格式: " + durationStr)
	}
	return duration
}
