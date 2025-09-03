/*
 * @Date: 2025-09-03 15:11:41
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 15:13:00
 * @FilePath: /GardenGuideAI/GoBackend/internal/domain/Like.go
 * @Description:
 */

package domain

import "time"

// Like represents a user's like in the system.
type Like struct {
	ID        string    `json:"id" gorm:"type:varchar(36);primaryKey"`
	Email     string    `json:"email" gorm:"type:varchar(255);index"`
	PostID    string    `json:"post_id" gorm:"type:varchar(36);index"`
	CreatedAt time.Time `json:"created_at"`
}

// TableName specifies the table name for the Like model.
func (Like) TableName() string {
	return "likes"
}
