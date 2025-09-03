/*
 * @Date: 2025-09-03 15:12:14
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 16:41:09
 * @FilePath: /GardenGuideAI/GoBackend/internal/transport/gin/like_handler.go
 * @Description:
 */

package gin

import (
	"net/http"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/service"
	"github.com/gin-gonic/gin"
)

type like_Handler struct {
	likeService *service.LikeService
}

func NewLikeHandler(likeService *service.LikeService) *like_Handler {
	return &like_Handler{likeService: likeService}
}

func (h *like_Handler) CreateLike(c *gin.Context) {
	var like domain.Like
	if err := c.ShouldBindJSON(&like); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.likeService.CreateLike(like.Email, like.PostID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Like created successfully"})
}

func (h *like_Handler) GetLikesByUser(c *gin.Context) {
	userID := c.Query("email")
	likes, err := h.likeService.GetLikesByUser(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"likes": likes})
}

func (h *like_Handler) DeleteLike(c *gin.Context) {
	likeID := c.Query("id")
	if err := h.likeService.DeleteLike(likeID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}
