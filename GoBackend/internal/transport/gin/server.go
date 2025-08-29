/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:31:20
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-29 03:58:08
 * @FilePath: /GardenGuideAI/GoBackend/internal/transport/gin/server.go
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

package gin

import (
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/repository"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/service"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/pkg/jwt"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/pkg/logger"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server struct {
	router     *gin.Engine
	db         *gorm.DB
	log        logger.Logger
	jwtService jwt.JWTService
}

type Option func(*Server)

func NewServer(opts ...Option) *Server {
	s := &Server{
		router: gin.New(),
	}

	for _, opt := range opts {
		opt(s)
	}

	s.setMiddlewares()
	s.registerRoutes()

	return s
}

func WithDatabase(db *gorm.DB) Option {
	return func(s *Server) {
		s.db = db
	}
}

func WithLogger(log logger.Logger) Option {
	return func(s *Server) {
		s.log = log
	}
}

func WithJWTService(jwtService jwt.JWTService) Option {
	return func(s *Server) {
		s.jwtService = jwtService
	}
}

func (s *Server) setMiddlewares() {
	s.router.Use(
		gin.Recovery(),
		gin.Logger(),
		corsMiddleware(),
	)
}

func (s *Server) registerRoutes() {
	// 初始化认证服务和处理器
	authRepo := repository.NewAuthRepository(s.db)
	authService := service.NewAuthService(authRepo, s.jwtService)
	authHandler := NewAuthHandler(authService)

	// 注册认证路由
	api := s.router.Group("/api/v1")
	{
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)

		// 需要认证的路由组
		authGroup := api.Group("")
		authGroup.Use(AuthMiddleware(s.jwtService))
		{
			authGroup.POST("/logout", authHandler.Logout)
		}
	}
}

func (s *Server) Run(addr string) error {
	return s.router.Run(addr)
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
