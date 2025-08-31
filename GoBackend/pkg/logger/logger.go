/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-29 03:32:22
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-29 05:48:56
 * @FilePath: /GardenGuideAI/GoBackend/pkg/logger/logger.go
 * @Description: 日志模块
 *
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved.
 */

package logger

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Logger interface {
	Info(msg string, fields ...zap.Field)
	Error(msg string, fields ...zap.Field)
	Sync() error
}

type zapLogger struct {
	logger *zap.Logger
}

type LogConfig struct {
	Level    string
	FilePath string
}

func New(config LogConfig) Logger {
	level := zap.NewAtomicLevel()
	_ = level.UnmarshalText([]byte(config.Level))

	cfg := zap.Config{
		Encoding:         "json",
		Level:            level,
		OutputPaths:      []string{config.FilePath, "stdout"},
		ErrorOutputPaths: []string{"stderr"},
		EncoderConfig: zapcore.EncoderConfig{
			TimeKey:        "ts",
			LevelKey:       "level",
			NameKey:        "logger",
			MessageKey:     "msg",
			StacktraceKey:  "stacktrace",
			LineEnding:     zapcore.DefaultLineEnding,
			EncodeLevel:    zapcore.LowercaseLevelEncoder,
			EncodeTime:     zapcore.ISO8601TimeEncoder,
			EncodeDuration: zapcore.SecondsDurationEncoder,
		},
	}

	logger, _ := cfg.Build()
	return &zapLogger{logger: logger}
}

func (l *zapLogger) Info(msg string, fields ...zap.Field) {
	l.logger.Info(msg, fields...)
}

func (l *zapLogger) Error(msg string, fields ...zap.Field) {
	l.logger.Error(msg, fields...)
}

func (l *zapLogger) Sync() error {
	return l.logger.Sync()
}
