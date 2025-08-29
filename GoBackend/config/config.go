/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:26:33
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-29 03:56:46
 * @FilePath: /GardenGuideAI/GoBackend/config/config.go
 * @Description:
 * 定义配置结构体
 * 包含服务器端口、数据库DSN、JWT密钥和过期时间等配置
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

package config

import (
	"time"

	"github.com/caarlos0/env/v10"
)

type Config struct {
	Server struct {
		Port string `env:"PORT" env-default:"8080"`
	}

	DB struct {
		DSN string `env:"DB_DSN" env-default:"root:password@tcp(localhost:3306)/gardenguide?charset=utf8mb4&parseTime=True"`
	}

	JWT struct {
		SecretKey  string        `env:"JWT_SECRET" env-default:"my_secret_key_for_jwt"`
		Expiration time.Duration `env:"JWT_EXPIRATION" env-default:"24h"`
	}

	Log struct {
		Level    string `env:"LOG_LEVEL" env-default:"info"`
		FilePath string `env:"LOG_PATH" env-default:"./logs/app.log"`
	}
}

func Load() *Config {
	var cfg Config
	if err := env.Parse(&cfg); err != nil {
		panic("配置加载失败: " + err.Error())
	}
	return &cfg
}
