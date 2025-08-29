/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:39:45
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-29 07:12:39
 * @FilePath: /GardenGuideAI/GoBackend/internal/domain/user.go
 * @Description:
 * 定义用户领域模型
 * 包含用户的基本信息和行为
 * 例如：用户ID、用户名、密码、邮箱、手机号等
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

package domain

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	// ID    uint   `gorm:"primaryKey" json:"id"`
	Email    string `gorm:"uniqueIndex;size:255" json:"email"`
	Password string `gorm:"size:255" json:"-"`
	// CreatedAt time.Time `json:"created_at"`
	// UpdatedAt time.Time `json:"updated_at"`
}

type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	Token string `json:"token"`
}
