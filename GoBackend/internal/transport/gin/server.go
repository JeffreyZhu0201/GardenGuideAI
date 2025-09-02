/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:31:20
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-01 23:09:01
 * @FilePath: /GardenGuideAI/GoBackend/internal/transport/gin/server.go
 * @Description:
 *
 * Copyright (c) 2025 by Jeffreu Zhu, All Rights Reserved.
 */

package gin

import (
	"log"
	"net/http"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/repository"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/service"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/pkg/jwt"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/pkg/logger"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

/**
 * @description: 服务端 模型
 * @return {*}
 */
type Server struct {
	router     *gin.Engine
	db         *gorm.DB
	log        logger.Logger
	jwtService jwt.JWTService
}

type Option func(*Server)

/**
 * @description: 新建服务端
 * @return {*}
 */
func NewServer(opts ...Option) *Server {
	s := &Server{
		router: gin.New(),
	}

	// opt 是一个接受Server指针的函数，接收前面的s，将里面的元素赋值
	for _, opt := range opts {
		opt(s)
	}

	s.setMiddlewares()

	s.registerRoutes()
	return s
}

/**
 * @description: 数据库
 * @return {*}
 */
func WithDatabase(db *gorm.DB) Option {
	return func(s *Server) {
		s.db = db
	}
}

/**
 * @description: 日志
 * @param {logger.Logger} log
 * @return {*}
 */
func WithLogger(log logger.Logger) Option {
	return func(s *Server) {
		s.log = log
	}
}

/**
 * @description: JWT 服务
 * @param {*jwt.AuthService} jwtService
 * @return {*}
 */
func WithJWTService(jwtService *jwt.AuthService) Option {
	return func(s *Server) {
		s.jwtService = jwtService
	}
}

/**
 * @description: 设置中间件
 * @return {*}
 */
func (s *Server) setMiddlewares() {
	s.router.Use(
		gin.Recovery(),
		gin.Logger(),
		corsMiddleware(),
	)
}

// Login 用户登录
func hello(c *gin.Context) {
	c.JSON(http.StatusOK, "123")
}

/**
 * @description: 注册路由
 * @return {*}
 */
func (s *Server) registerRoutes() {
	// 初始化认证服务和处理器

	// 数据库
	authRepo := repository.NewAuthRepository(s.db)
	// 服务
	authService := service.NewAuthService(authRepo, s.jwtService)
	// 处理器
	authHandler := NewAuthHandler(authService)

	// 注册认证路由
	api := s.router.Group("/api/v1")
	{
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)
		api.POST("/", hello)
		// 需要认证的路由组
		authGroup := api.Group("")
		authGroup.Use(AuthMiddleware(s.jwtService))
		{
			authGroup.POST("/logout", authHandler.Logout)
		}
	}
}

/**
 * @description: 启动服务
 * @param {string} addr
 * @return {*}
 */
func (s *Server) Run(addr string) error {
	return s.router.Run(addr)
}

/**
 * @description: 跨域中间件
 * @return {*}
 */
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// If an Origin header exists, echo it back and allow credentials.
		// If no Origin is present, fall back to wildcard for non-browser clients.
		origin := c.Request.Header.Get("Origin")
		if origin == "" {
			c.Header("Access-Control-Allow-Origin", "*")
		} else {
			c.Header("Access-Control-Allow-Origin", origin)
			c.Header("Access-Control-Allow-Credentials", "true")
		}

		log.Default().Println("CORS Origin:", origin)

		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
