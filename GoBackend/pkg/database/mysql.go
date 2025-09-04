/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:31:39
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-04 14:16:06
 * @FilePath: /GardenGuideAI/GoBackend/pkg/database/mysql.go
 * @Description:
 *
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved.
 */

/* cspell:ignore gorm */

package database

import (
	"log"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// NewMySQL 创建MySQL数据库连接
func NewMySQL(dsn string) *gorm.DB {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		PrepareStmt: true, // 启用预编译语句
	})

	if err != nil {
		panic("数据库连接失败: " + err.Error())
	}
	log.Println("数据库连接成功")

	// 添加自动迁移
	if err := autoMigrate(db); err != nil {
		panic("数据库迁移失败: " + err.Error())
	}
	log.Println("数据库自动迁移成功")

	// 配置连接池
	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)

	return db
}

func autoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&domain.User{}, // 自动创建用户表
		&domain.Post{}, // 自动创建帖子表
		&domain.Like{},
		// 添加其他模型...
	)
}
