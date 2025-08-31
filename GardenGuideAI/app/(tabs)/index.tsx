/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-30 00:43:57
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-08-31 03:50:26
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/(tabs)/index.tsx
 * @Description: 首页
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */
import { useCallback, useState } from 'react';
//  import { CameraView, useCameraPermissions } from 'expo-camera';
import { ActivityIndicator, TouchableOpacity, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { identifyPlant } from '@/network/identifyApi';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useFocusEffect } from 'expo-router';
import  useStore from '@/app/store/store';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const { setHeaderTitle } = useStore();
  // const [permission, requestPermission] = useCameraPermissions();

  // const [isCameraVisible, setIsCameraVisible] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  // const navigation = useNavigation();

  // let camera: CameraView | null = null;

  // 标题设置
  useFocusEffect(
    useCallback(() => {
      setHeaderTitle("首页");
    }, [setHeaderTitle])
  );

  // // 拍照处理
  // const handleTakePhoto = async (camera: CameraView) => {
  //   if (camera) {
  //     try {
  //       const photo = await camera.takePictureAsync({ quality: 0.8 });
  //       setIsLoading(true);

  //       // Convert photo to File object
  //       const response = await fetch(photo.uri);
  //       const blob = await response.blob();
  //       const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

  //       // 调用识别接口
  //       const result = await identifyPlant(file, 'your_auth_token');
  //       console.log(result);
  //       // navigation.navigate('(tabs)/(identify-result)', {
  //       //   identification: result.data
  //       // });
  //     } catch (error) {
  //       console.error('识别失败:', error);
  //     } finally {
  //       setIsLoading(false);
  //       setIsCameraVisible(false);
  //     }
  //   }
  // };

  // // 权限请求
  // const requestCameraAccess = async () => {
  //   if (!permission?.granted) {
  //     await requestPermission();
  //   }
  //   setIsCameraVisible(true);
  // };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FAFDF7', dark: '#2A3C24' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      {/* 介绍区块 */}
      <ThemedView style={styles.introContainer}>
        <ThemedText type="title" style={styles.title}>
          发现植物奥秘
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          拍摄植物照片，立即获取专业识别结果与养护建议
        </ThemedText>
      </ThemedView>

      {/* 拍照按钮
      <ThemedView style={styles.cameraSection}>
        {isCameraVisible ? (
          <View style={styles.container}>
          <CameraView style={styles.camera} facing="back" />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => camera && handleTakePhoto(camera)}>
              <ThemedText style={styles.text}>Flip Camera</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        ):(
          <TouchableOpacity 
          style={styles.photoButton}
          onPress={requestCameraAccess}>
          <FontAwesome name="camera" size={28} color="#FFF" />
          <ThemedText style={styles.buttonText}>立即识别</ThemedText>
        </TouchableOpacity>
        )}
      </ThemedView> */}

      {/* 使用说明 */}
      <ThemedView style={styles.featureGrid}>
        {[
          { icon: 'leaf', title: '5000+ 植物种类' },
          { icon: 'book', title: '专业养护指南' },
          { icon: 'clock-o', title: '快速识别' },
        ].map((item, index) => (
          <ThemedView key={index} style={styles.featureCard}>
            <FontAwesome size={24} color="#6AB04A" />
            <ThemedText style={styles.featureText}>{item.title}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

// 样式扩展
const styles = StyleSheet.create({
  // ... 原有样式保持不变 ...
  introContainer: {
    padding: 20,
    marginBottom: 30,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    color: '#2A3C24',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center'
  },
  cameraSection: {
    height: 400,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
    backgroundColor: '#F8F9FA'
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30
  },
  photoButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6AB04A',
    borderRadius: 30,
    margin: 40,
    padding: 30,
    elevation: 5
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(106, 180, 74, 0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    marginTop: 10,
    fontSize: 18
  },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 15
  },
  featureCard: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '30%',
    elevation: 3
  },
  featureText: {
    marginTop: 8,
    fontSize: 12,
    color: '#2A3C24',
    textAlign: 'center'
  },
  headerImage: {
    opacity: 0.3,
    height: 200,
    width: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
