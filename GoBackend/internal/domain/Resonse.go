package domain

type Response struct {
	Code    string      `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"` // 使用 interface{} 提高灵活性
}

func NewResponse(code string, message string, data interface{}) *Response {
	return &Response{
		Code:    code,
		Message: message,
		Data:    data,
	}
}

func NewErrorResponse(code string, message string) *Response {
	return &Response{
		Code:    code,
		Message: message,
		Data:    nil,
	}
}

func NewSuccessResponse(data interface{}) *Response {
	return &Response{
		Code:    "200", // 默认成功码
		Message: "success",
		Data:    data,
	}
}
