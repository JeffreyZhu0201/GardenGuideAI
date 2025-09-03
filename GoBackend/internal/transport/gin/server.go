/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:31:20
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 20:03:04
 * @FilePath: /GardenGuideAI/GoBackend/internal/transport/gin/server.go
 * @Description:
 *
 * Copyright (c) 2025 by Jeffreu Zhu, All Rights Reserved.
 */

package gin

import (
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

	s.registerAuthRoutes()
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
	s.router.Static("/uploads", "./uploads")
}

// Login 用户登录
func hello(c *gin.Context) {
	c.JSON(http.StatusOK, "123")
}

/**
 * @description: 注册认证路由
 * @return {*}
 */
func (s *Server) registerAuthRoutes() {

	authRepo := repository.NewAuthRepository(s.db)
	authService := service.NewAuthService(authRepo, s.jwtService)
	authHandler := NewAuthHandler(authService)

	postRepo := repository.NewMysqlPostRepository(s.db)
	postService := service.NewPostService(postRepo)
	postHandler := NewPostHandler(postService)

	likeRepo := repository.NewMysqlLikeRepository(s.db)
	likeService := service.NewLikeService(likeRepo)
	likeHandler := NewLikeHandler(likeService)

	api := s.router.Group("/api/v1")
	{
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)
		api.POST("/", hello)

		authGroup := api.Group("")
		authGroup.Use(AuthMiddleware(s.jwtService))
		{
			authGroup.POST("/logout", authHandler.Logout)
		}

		postGroup := api.Group("/posts")
		postGroup.GET("/allpost", postHandler.GetAllPost)
		postGroup.GET("/getone", postHandler.GetOnePost)
		postGroup.POST("/like", postHandler.LikeCountAdd)     // 未做jwt，不安全
		postGroup.POST("/unlike", postHandler.UNLikeCountAdd) // 未做jwt，不安全
		postGroup.Use(AuthMiddleware(s.jwtService))
		{
			postGroup.POST("", postHandler.CreatePost)

			postGroup.GET("/userposts", postHandler.GetUsersPosts)
		}

		likeGroup := api.Group("/like")
		likeGroup.Use(AuthMiddleware(s.jwtService))
		{
			likeGroup.POST("/create", likeHandler.CreateLike)
			likeGroup.GET("/getlikes", likeHandler.GetLikesByUser)
			likeGroup.GET("/delete", likeHandler.DeleteLike)
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
		// Dynamically allow the origin from the request header
		c.Header("Access-Control-Allow-Origin", c.Request.Header.Get("Origin"))
		c.Header("Access-Control-Allow-Credentials", "true")
		// Specify allowed headers. It's crucial to include any custom headers
		// your client sends, like 'Authorization'.
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		// Specify allowed methods
		c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		// Handle the preflight 'OPTIONS' request
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204) // 204 No Content
			return
		}

		c.Next()
	}
}
