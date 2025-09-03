/*
 * @Date: 2025-09-03 15:11:30
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 21:41:42
 * @FilePath: /GardenGuideAI/GoBackend/internal/repository/like_repository.go
 * @Description:
 */
package repository

import (
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"gorm.io/gorm"
)

type LikeRepository interface {
	CreateLike(like *domain.Like) error
	GetLikesByUser(email string) ([]domain.Post, error)
	DeleteLike(id string) error
}

type mysqlLikeRepository struct {
	db *gorm.DB
}

func NewMysqlLikeRepository(db *gorm.DB) LikeRepository {
	return &mysqlLikeRepository{db: db}
}

func (r *mysqlLikeRepository) CreateLike(like *domain.Like) error {
	return r.db.Create(like).Error
}

func (r *mysqlLikeRepository) GetLikesByUser(email string) ([]domain.Post, error) {
	var likedPosts []domain.Post
	if err := r.db.Where("email = ?", email).Find(&likedPosts).Error; err != nil {
		return nil, err
	}
	return likedPosts, nil
}

func (r *mysqlLikeRepository) DeleteLike(id string) error {
	return r.db.Delete(&domain.Like{}, id).Error
}
