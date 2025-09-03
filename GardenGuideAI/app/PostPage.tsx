/*
 * @Date: 2025-09-02 20:17:01
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-03 09:40:39
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
import Markdown, { MarkdownIt } from 'react-native-markdown-display';

const markdownItInstance = MarkdownIt({ typographer: true }).set({ breaks: true }); // 启用 breaks 选项

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

    function removeMarkdownCodeBlockTags(input: string): string {
        // 匹配开头的 ```markdown\n 和结尾的 ```\n
       return input.replace('```markdown\n', '').replace('\n```', '');
    }


    async function fetchDeepSeekStream(plantName: string) {
        const apiUrl = SystemConfig.IDENTIFYBASETURL + '/deepseek';

        const requestBody = {
            message: `你是一个专业的植物专家和种植爱好者，回答的${plantName}基本信息,生长属性,养护指南,以及意义或花语。只返回markdown格式回答,样式美观，适合阅读,适当添加表情,简短一点`,
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
                    if (event.data) {
                        if (event.data === '[DONE]') {
                            es.close();
                            console.log('Stream finished.');
                            return;
                        }

                        const parsedData = JSON.parse(event.data); // 解析整个event.data
                        if (parsedData.content) {
                            fullContent += parsedData.content; // 拼接内容

                            fullContent = removeMarkdownCodeBlockTags(fullContent);

                            // console.log(JSON.stringify(fullContent))
                            setDeepSeekResult(fullContent); // 更新状态
                        } else if (parsedData.error) {
                            console.error('DeepSeek Stream Error from backend:', parsedData.error);
                            setDeepSeekResult(`生成介绍时出错: ${parsedData.error}`);
                            es.close(); // 关闭连接
                        }
                    }
                } catch (error) {
                    console.error('Error parsing SSE message (JSON expected):', error, 'Raw data:', event.data);
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
                // setDeepSeekResult(prev => prev + '\n（生成完成）');
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
                    ? (<ThemedView style={{ padding: 12, backgroundColor: '#ffffffff', borderRadius: 8 }}>
                        {/* <RenderHtml
                            contentWidth={width}
                            source={source as any}
                        // Optional: Add tagsStyles, classesStyles, or customRenderers here
                        /> */}
                        <Markdown markdownit={markdownItInstance}>
                            {deepSeekResult}
                        </Markdown>
                        <ThemedText>百科生成完成...</ThemedText>
                    </ThemedView>)
                    : (<ThemedView style={{ backgroundColor: '#ffffffff', padding: 12, borderRadius: 8 }}>
                        <ThemedText style={[{ fontSize: 16, fontWeight: '600', paddingVertical: 4, color: '#666' }]}>正在生成回答...</ThemedText>
                        {(deepSeekResult) ? (<ThemedText style={styles.streamingText}>
                            <Markdown markdownit={markdownItInstance}>
                                {deepSeekResult.replace(/\\n/g, '\n')}
                            </Markdown>
                        </ThemedText>) : null}
                    </ThemedView>)
            }
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 16,
    },
    resultText: {
        fontSize: 24,
        paddingVertical: 16,
        fontWeight: 'bold',
    },
    streamingText: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 12,
        lineHeight: 10,
        color: '#999999ff', 
    },
    deepSeekContainer: {
        padding: 8,
        backgroundColor: '#f0f0f0', 
        borderRadius: 8,
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333', 
    }
});