/*
 * @Date: 2025-09-03 09:45:53
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 15:45:09
 * @FilePath: /GardenGuideAI/GoBackend/internal/service/like_service.go
 * @Description: Post 服务
 */
package service

import (
	"time"

	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/repository"
	"github.com/google/uuid"
)

type LikeService struct {
	likeRepo repository.LikeRepository
}

func NewLikeService(likeRepo repository.LikeRepository) *LikeService {

	return &LikeService{likeRepo: likeRepo}
}

func (s *LikeService) CreateLike(email string, postId string) error {
	like := &domain.Like{
		ID:        uuid.New().String(),
		Email:     email,
		PostID:    postId,
		CreatedAt: time.Now(),
	}
	return s.likeRepo.CreateLike(like)
}

func (s *LikeService) GetLikesByUser(email string) ([]domain.Like, error) {
	likes, err := s.likeRepo.GetLikesByUser(email)
	if err != nil {
		return nil, err
	}
	return likes, nil
}

func (s *LikeService) DeleteLike(id string) error {
	return s.likeRepo.DeleteLike(id)
}
