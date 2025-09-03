/*
 * @Date: 2025-09-03 09:22:47
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 15:53:04
 * @FilePath: /GardenGuideAI/GoBackend/internal/transport/gin/post_handler.go
 * @Description:
 */
package gin

import (
	"net/http"

	"strconv"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/service"
	"github.com/gin-gonic/gin"
)

type PostHandler struct {
	postService *service.PostService
}

func StringToUint(s string) (uint, error) {
	u64, err := strconv.ParseUint(s, 10, 64)
	if err != nil {
		return 0, err
	}
	return uint(u64), nil
}

func NewPostHandler(postService *service.PostService) *PostHandler {
	return &PostHandler{postService: postService}
}

// CreatePost handles the HTTP request for creating a new post.
// It expects a multipart/form-data request with the following fields:
// - email: The user's email.
// - content: The text content of the post.
// - image: The image file for the post.
func (h *PostHandler) CreatePost(c *gin.Context) {
	// Limit multipart form memory (e.g., 32 MB)
	if err := c.Request.ParseMultipartForm(32 << 20); err != nil {
		c.JSON(http.StatusBadRequest, domain.NewErrorResponse("400", "Invalid form data"))
		return
	}

	email := c.PostForm("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, domain.NewErrorResponse("400", "Email is required"))
		return
	}
	content := c.PostForm("content")
	fileHeader, _ := c.FormFile("image")

	post, err := h.postService.CreatePost(c, email, content, fileHeader)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.NewErrorResponse("500", "Failed to create post: "+err.Error()))
		return
	}

	c.JSON(http.StatusCreated, domain.NewSuccessResponse(post))
}

func (h *PostHandler) GetAllPost(c *gin.Context) {
	posts, err := h.postService.GetAllPosts(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.NewErrorResponse("500", "Failed to retrieve posts: "+err.Error()))
		return
	}
	c.JSON(http.StatusOK, domain.NewSuccessResponse(posts))
}

func (h *PostHandler) GetOnePost(c *gin.Context) {
	id, _ := StringToUint(c.Query("id"))
	post, err := h.postService.GetOnePost(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.NewErrorResponse("500", "Failed to retrieve post: "+err.Error()))
		return
	}
	c.JSON(http.StatusOK, domain.NewSuccessResponse(post))
}

func (h *PostHandler) LikeCountAdd(c *gin.Context) {
	postID := c.Query("id")
	if err := h.postService.LikePost(c, postID); err != nil {
		c.JSON(http.StatusInternalServerError, domain.NewErrorResponse("500", "Failed to like post: "+err.Error()))
		return
	}
	c.JSON(http.StatusOK, domain.NewSuccessResponse(nil))
}

func (h *PostHandler) GetUsersPosts(c *gin.Context) {
	email := c.Query("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, domain.NewErrorResponse("400", "Email is required"))
		return
	}

	posts, err := h.postService.GetUsersPosts(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.NewErrorResponse("500", "Failed to retrieve user's posts: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, domain.NewSuccessResponse(posts))
}
