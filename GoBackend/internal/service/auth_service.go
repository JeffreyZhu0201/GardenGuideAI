/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:38:39
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-30 07:46:30
 * @FilePath: /GardenGuideAI/GoBackend/internal/service/auth_service.go
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
package service

import (
	"context"
	"errors"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/pkg/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthRepository interface {
	CreateUser(ctx context.Context, user *domain.User) error
	FindUserByEmail(ctx context.Context, email string) (*domain.User, error)
}

type AuthService struct {
	repo       AuthRepository
	jwtService jwt.JWTService
}

func NewAuthService(repo AuthRepository, jwtService jwt.JWTService) *AuthService {
	return &AuthService{
		repo:       repo,
		jwtService: jwtService,
	}
}

func (s *AuthService) Register(ctx context.Context, req *domain.RegisterRequest) error {
	// 检查用户是否已存在
	_, err := s.repo.FindUserByEmail(ctx, req.Email)
	if err == nil {
		return errors.New("用户已存在")
	}

	// 密码加密
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	// 创建用户
	user := &domain.User{
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	return s.repo.CreateUser(ctx, user)
}

func (s *AuthService) Login(ctx context.Context, req *domain.LoginRequest) (string, error) {
	// 查找用户
	user, err := s.repo.FindUserByEmail(ctx, req.Email)
	if err != nil {
		return "", errors.New("无效的邮箱或密码")
	}

	// 验证密码
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return "", errors.New("无效的邮箱或密码")
	}

	// 生成JWT令牌
	token, err := s.jwtService.GenerateToken(user.ID, user.Email)
	if err != nil {
		return "", errors.New("令牌生成失败")
	}

	return token, nil
}
