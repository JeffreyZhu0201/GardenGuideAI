/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:38:10
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 02:04:20
 * @FilePath: /GardenGuideAI/GoBackend/internal/transport/gin/auth_handler.go
 * @Description:
 * 定义认证处理程序
 * 处理用户注册、登录、注销等认证相关的请求
 *
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved.
 */

package gin

import (
	"net/http"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/service"
	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	authService *service.AuthService
}

func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

// Register 用户注册
func (h *AuthHandler) Register(c *gin.Context) {
	var req domain.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, domain.NewErrorResponse("400", err.Error()))
		return
	}

	if err := h.authService.Register(c.Request.Context(), &req); err != nil {
		c.JSON(http.StatusBadRequest, domain.NewErrorResponse("400", err.Error()))
		return
	}

	c.JSON(http.StatusCreated, domain.NewSuccessResponse("用户注册成功"))
}

// Login 用户登录
func (h *AuthHandler) Login(c *gin.Context) {
	var req domain.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, domain.NewErrorResponse("400", err.Error()))
		return
	}

	token, err := h.authService.Login(c.Request.Context(), &req)
	if err != nil {
		c.JSON(http.StatusUnauthorized, domain.NewErrorResponse("401", err.Error()))
		return
	}

	c.JSON(http.StatusOK, domain.NewSuccessResponse(domain.LoginResponse{Token: token}))
}

// Logout 用户退出登录
func (h *AuthHandler) Logout(c *gin.Context) {
	// 在实际应用中，可以将JWT令牌加入黑名单
	// 加入黑名单
	c.JSON(http.StatusOK, domain.NewSuccessResponse("成功退出登录"))
}

// // 加入黑名单
// func (h *AuthHandler) AddToBlacklist(c *gin.Context) {
// 	// 从请求中获取JWT令牌
// 	token := c.Request.Header.Get("Authorization")
// 	if token == "" {
// 		c.JSON(http.StatusBadRequest, domain.NewErrorResponse("400", "未提供JWT令牌"))
// 		return
// 	}

// 	// 将令牌加入黑名单
// 	if err := h.authService.AddToBlacklist(c.Request.Context(), token); err != nil {
// 		c.JSON(http.StatusInternalServerError, domain.NewErrorResponse("500", err.Error()))
// 		return
// 	}

// 	c.JSON(http.StatusOK, domain.NewSuccessResponse("成功加入黑名单"))
// }
