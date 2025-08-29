/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:44:48
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-29 03:57:24
 * @FilePath: /GardenGuideAI/GoBackend/internal/repository/auth_repository.go
 * @Description:
 * 定义认证仓库
 * 包含用户认证、注册、密码重置等功能
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

package repository

import (
	"context"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"gorm.io/gorm"
)

type AuthRepository struct {
	db *gorm.DB
}

func NewAuthRepository(db *gorm.DB) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) CreateUser(ctx context.Context, user *domain.User) error {
	return r.db.WithContext(ctx).Create(user).Error
}

func (r *AuthRepository) FindUserByEmail(ctx context.Context, email string) (*domain.User, error) {
	var user domain.User
	err := r.db.WithContext(ctx).Where("email = ?", email).First(&user).Error
	return &user, err
}
