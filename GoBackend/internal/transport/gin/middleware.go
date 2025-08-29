/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:38:18
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-29 06:36:17
 * @FilePath: /GardenGuideAI/GoBackend/internal/transport/gin/middleware.go
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

package gin

import (
	"net/http"
	"strings"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/pkg/jwt"
	"github.com/gin-gonic/gin"
	jwtv5 "github.com/golang-jwt/jwt/v5"
)

// AuthMiddleware 认证中间件
func AuthMiddleware(jwtService jwt.JWTService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "未提供认证令牌"})
			return
		}

		// 提取Bearer令牌
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "无效的令牌格式"})
			return
		}

		// 验证令牌
		token, err := jwtService.ValidateToken(tokenString)
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "无效或过期的令牌"})
			return
		}

		// 提取声明信息
		claims, ok := token.Claims.(jwtv5.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "无效的令牌声明"})
			return
		}

		// 将用户信息存储到上下文中
		c.Set("userID", claims["user_id"])
		c.Set("email", claims["email"])
		c.Next()
	}
}
