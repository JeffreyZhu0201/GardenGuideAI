/*
 * @Date: 2025-09-02 20:17:01
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 00:35:24
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/PostPage.tsx
 * @Description: 帖子页面
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useStore from '@/app/store/store'; // 请根据你的实际路径修改
import { identifyPlant } from '@/network/identifyApi'; // 请根据你的实际路径修改
import EventSource from 'react-native-sse'; // 引入 react-native-sse
import { SystemConfig } from '@/constants/SystemConfig';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { Background } from '@react-navigation/elements';

export default function PostScreen() {
    const { setHeaderTitle, fileUri, token } = useStore();
    const [identifyResult, setIdentifyResult] = useState<string>("");
    const [deepSeekResult, setDeepSeekResult] = useState<string>(""); // 初始化为空字符串
    const eventSourceRef = useRef<EventSource | null>(null); // 用于保存 EventSource 实例


    const [finishStatus, setFinishStatus] = useState<boolean>(false);

    const source: { html: string } | undefined = finishStatus
        ? {
            html: deepSeekResult,
        }
        : undefined;

    const { width } = useWindowDimensions();

    useFocusEffect(
        useCallback(() => {
            setHeaderTitle('Post');
        }, [setHeaderTitle])
    );

    useEffect(() => {
        // 当依赖项变化时，重置状态并开始识别
        if (fileUri && token) {
            setIdentifyResult("");
            setDeepSeekResult(""); // 每次新的识别开始时清空之前的DeepSeek结果
            Identify();
        } else {
            // 如果 fileUri 或 token 不存在，可能需要显示一些提示或跳转
            // setIdentifyResult("请先选择图片并登录");
            // setDeepSeekResult("");
        }
        // 组件卸载时，清理 EventSource 连接
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        };
    }, [fileUri, token]);




    async function Identify() {
        if (!fileUri || !token) {
            Alert.alert("提示", "图片或认证信息缺失，无法进行识别。");
            setIdentifyResult("识别失败");
            return;
        }

        try {
            const response = await identifyPlant(fileUri!, token!);

            if (response?.code === 200 && response.data?.name) {
                setIdentifyResult(response.data.name);

                // 识别成功后，调用 DeepSeek 流式接口
                fetchDeepSeekStream(response.data.name);
            } else {
                const errorMessage = response?.message || "未知错误";
                Alert.alert(`识别失败！`, `错误：${errorMessage}`);
                setIdentifyResult("识别失败");
                setDeepSeekResult("生成介绍失败"); // 如果识别失败，DeepSeek也不用开始了
            }
        } catch (err: any) {
            console.error('Identify plant request error:', err);
            Alert.alert(`识别请求异常！`, `错误：${err.message}`);
            setIdentifyResult("识别失败");
            setDeepSeekResult("生成介绍失败");
        }
    }
    async function fetchDeepSeekStream(plantName: string) {
        const apiUrl = SystemConfig.IDENTIFYBASETURL + '/deepseek';

        const requestBody = {
            message: `你是一个专业的植物专家和种植爱好者，回答的${plantName}基本信息,生长属性,养护指南,以及意义或花语。只返回html格式回答,从<html>开始,样式美观，适合阅读,适当添加表情`,
            model: "deepseek-chat",
            stream: true,
        };
        try {
            // 使用 react-native-sse 创建 EventSource 实例
            const es = new EventSource(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            eventSourceRef.current = es;
            let fullContent = '';

            es.addEventListener('message', (event) => {
                try {
                    // 解析 SSE 格式的数据
                    if (event.data) {
                        // 检查是否是结束信号
                        if (event.data === '[DONE]') {
                            es.close();
                            return;
                        }
                        // 解析 JSON 数据
                        //    const parsedData = JSON.parse(event.data);
                        //     if (parsedData.content) {
                        fullContent += event.data;
                        setDeepSeekResult(fullContent);
                        // } else if (parsedData.error) {
                        //     console.error('DeepSeek Stream Error:', parsedData.error);
                        //     setDeepSeekResult(`生成介绍时出错: ${parsedData.error}`);
                        //     es.close();
                        // }
                    }
                } catch (error) {
                    console.error('Error parsing SSE message:', error, 'Raw data:', event.data);

                    // 尝试处理非标准格式的响应（如果后端返回的是纯文本）
                    if (typeof event.data === 'string' && event.data !== '[DONE]') {
                        fullContent += event.data;
                        setDeepSeekResult(fullContent);
                    }
                }
            });

            es.addEventListener('error', (event) => {
                console.error('SSE Connection Error:', event);
                setDeepSeekResult(prev => prev + '\n（连接出现错误，请检查网络和后端服务）');
            });

            es.addEventListener('close', async () => {
                console.log('SSE Connection Closed.');
                setDeepSeekResult(prev => prev + '\n（生成完成）');
                await new Promise(resolve => setTimeout(resolve, 2000));
                setFinishStatus(true);
            });

        } catch (error) {
            console.error('Failed to create EventSource or process stream:', error);
            setDeepSeekResult("无法开始生成介绍，请检查网络和后端服务。");
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedText style={styles.resultText}>
                {
                    (identifyResult) ? (`识别结果: ${identifyResult}`) : "正在识别中..."
                }
            </ThemedText>

            {
                (finishStatus && deepSeekResult.length > 0)
                    ? (<ThemedView>
                        <RenderHtml
                            contentWidth={width}
                            source={source as any}
                        // Optional: Add tagsStyles, classesStyles, or customRenderers here
                        />
                    </ThemedView>)
                    : (<ThemedView style={{backgroundColor: '#f0f0f0ff', padding: 12, borderRadius: 8 }}> 
                        <ThemedText style={[ { fontSize: 16,fontWeight:'600',paddingVertical: 4 ,color: '#666' }]}>正在生成回答...</ThemedText>
                        {(deepSeekResult) ? (<ThemedText style={styles.streamingText}>
                            {deepSeekResult}
                        </ThemedText>) : null}

                    </ThemedView>)
            }
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    streamingText: {
        fontSize: 12,
        lineHeight: 10,
        color: '#999999ff', // Lighter text for secondary information
    },
    deepSeekContainer: {
        padding: 8,
        backgroundColor: '#f0f0f0', // Added for better visual separation
        borderRadius: 8,
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333', // Darker text for readability
    }
});