/*
 * @Date: 2025-09-03 09:45:53
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 20:01:47
 * @FilePath: /GardenGuideAI/GoBackend/internal/service/post_service.go
 * @Description: Post 服务
 */
package service

import (
	"log"
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

func (s *PostService) GetAllPosts(c *gin.Context) ([]domain.Post, error) {
	Posts, err := s.postRepo.FindAll()
	return Posts, err
}

// CreatePost handles the logic for creating a new post.
func (s *PostService) CreatePost(c *gin.Context, email, content string, fileHeader *multipart.FileHeader) (*domain.Post, error) {
	var savedImagePath string
	log.Default().Println("Creating post for user:", email)
	log.Default().Println("Post content:", content)
	// log.Default().Println("Received file:", fileHeader)

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

func (s *PostService) GetOnePost(c *gin.Context, id uint) (*domain.Post, error) {
	return s.postRepo.FindOne(id)
}

func (s *PostService) LikePost(c *gin.Context, postID string) error {
	return s.postRepo.LikeCountAdd(postID)
}

func (s *PostService) UNLikePost(c *gin.Context, postID string) error {
	return s.postRepo.UNLikeCountAdd(postID)
}

func (s *PostService) GetUsersPosts(email string) ([]domain.Post, error) {
	return s.postRepo.GetUsersPosts(email)
}
