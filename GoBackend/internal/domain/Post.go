/*
 * @Date: 2025-09-03 09:44:16
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 09:54:58
 * @FilePath: /GardenGuideAI/GoBackend/internal/domain/Post.go
 * @Description: Post 实体
 */
package domain

import "time"

// Post represents a user's post in the system.
type Post struct {
	ID        string    `json:"id" gorm:"type:varchar(36);primaryKey"`
	Email     string    `json:"email" gorm:"type:varchar(255);index"`
	Content   string    `json:"content" gorm:"type:text"`
	ImagePath string    `json:"image_path,omitempty" gorm:"type:varchar(255)"`
	CreatedAt time.Time `json:"created_at"`
}

// TableName specifies the table name for the Post model.
func (Post) TableName() string {
	return "posts"
}
