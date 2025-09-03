/*
 * @Date: 2025-09-03 09:45:53
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 09:46:18
 * @FilePath: /GardenGuideAI/GoBackend/internal/service/post_service.go
 * @Description: Post 服务
 */
package service

import (
	"mime/multipart"
	"os"
	"path/filepath"
	"time"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type PostService struct {
	postRepo repository.PostRepository
}

func NewPostService(postRepo repository.PostRepository) *PostService {
	return &PostService{postRepo: postRepo}
}

// CreatePost handles the logic for creating a new post.
func (s *PostService) CreatePost(c *gin.Context, email, content string, fileHeader *multipart.FileHeader) (*domain.Post, error) {
	var savedImagePath string
	if fileHeader != nil {
		// ensure upload directory exists
		uploadDir := filepath.Join("uploads", "posts")
		if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
			return nil, err
		}

		// generate unique filename
		ext := filepath.Ext(fileHeader.Filename)
		filename := uuid.New().String() + ext
		destPath := filepath.Join(uploadDir, filename)

		// save the file
		if err := c.SaveUploadedFile(fileHeader, destPath); err != nil {
			return nil, err
		}
		savedImagePath = destPath
	}

	post := &domain.Post{
		ID:        uuid.New().String(),
		Email:     email,
		Content:   content,
		ImagePath: savedImagePath,
		CreatedAt: time.Now(),
	}

	if err := s.postRepo.Save(post); err != nil {
		return nil, err
	}

	return post, nil
}
