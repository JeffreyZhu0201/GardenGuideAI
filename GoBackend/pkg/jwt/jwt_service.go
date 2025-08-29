/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:40:45
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-29 03:59:30
 * @FilePath: /GardenGuideAI/GoBackend/pkg/jwt/jwt_service.go
 * @Description:
 * 定义JWT服务
 * 包含生成JWT、解析JWT、校验JWT等功能
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

package jwt

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWTService interface {
	GenerateToken(userID uint, email string) (string, error)
	ValidateToken(tokenString string) (*jwt.Token, error)
}

type AuthService struct {
	secretKey  []byte
	expiration time.Duration
}

func NewAuthService(secretKey []byte, expiration time.Duration) *AuthService {
	return &AuthService{
		secretKey:  secretKey,
		expiration: expiration,
	}
}

func (s *AuthService) GenerateToken(userID uint, email string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"exp":     time.Now().Add(s.expiration).Unix(),
		"iat":     time.Now().Unix(),
		"nbf":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.secretKey)
}

func (s *AuthService) ValidateToken(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// 验证签名方法
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return s.secretKey, nil
	})
}
