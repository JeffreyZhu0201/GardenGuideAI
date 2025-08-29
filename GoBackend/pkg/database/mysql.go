/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:31:39
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-29 03:59:15
 * @FilePath: /GardenGuideAI/GoBackend/pkg/database/mysql.go
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

package database

import (
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

	// 配置连接池
	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)

	return db
}
