/*
 * @Date: 2025-09-03 09:22:47
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 14:45:01
 * @FilePath: /GardenGuideAI/GoBackend/internal/transport/gin/post_handler.go
 * @Description:
 */
package gin

import (
	"net/http"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/service"
	"github.com/gin-gonic/gin"
)

type PostHandler struct {
	postService *service.PostService
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
