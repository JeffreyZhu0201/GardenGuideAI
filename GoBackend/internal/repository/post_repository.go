/*
 * @Date: 2025-09-03 09:42:58
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 09:55:29
 * @FilePath: /GardenGuideAI/GoBackend/internal/repository/post_repository.go
 * @Description:
 */

package repository

import (
	"github.com/JeffreyZhu0201/GardenGuideAI/GoBackend/internal/domain"
	"gorm.io/gorm"
)

// PostRepository defines the interface for post persistence.
type PostRepository interface {
	Save(post *domain.Post) error
}

// mysqlPostRepository is the GORM implementation of PostRepository.
type mysqlPostRepository struct {
	db *gorm.DB
}

// NewMysqlPostRepository creates a new mysqlPostRepository.
func NewMysqlPostRepository(db *gorm.DB) PostRepository {
	return &mysqlPostRepository{db: db}
}

// Save creates a new post record in the database.
func (r *mysqlPostRepository) Save(post *domain.Post) error {
	return r.db.Create(post).Error
}
