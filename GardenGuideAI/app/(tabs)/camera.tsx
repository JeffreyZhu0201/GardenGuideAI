/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-30 00:43:57
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 10:54:18
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/(tabs)/camera.tsx
 * @Description: 相机识别页面
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */


import { CameraView,CameraType, useCameraPermissions, CameraCapturedPicture, CameraPictureOptions } from 'expo-camera';
import { useRef, useState, useCallback } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { base64ToFile } from '@/utils/utils'
import {identifyPlant} from "@/network/identifyApi"
import useStore from '@/app/store/store';


export default function CameraPage() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  const {token} = useStore()

  const ref = useRef<CameraView>(null);

  const [cameraKey, setCameraKey] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      setCameraKey(k => k + 1);
      setFacing('back');
    }, [])
  );

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const Identify = async () => {
    if (token != null) {
      const Options: CameraPictureOptions = { base64: true };

      if (ref.current == null) return;

      console.log("start taking picture");
      const picture: CameraCapturedPicture = await ref.current?.takePictureAsync(Options);

      if (picture?.base64) {
        // now returns a file URI (string)
        const fileUri = await base64ToFile(picture.base64, `photo_${Date.now()}.jpg`);
        console.log('fileUri:', fileUri);
        console.log("picture taken, start identifying");

        identifyPlant(fileUri, token).then(response => {
          if (response?.code == 200) {
            alert(`成功！识别结果为：${response?.data.name}`);
          } else {
            alert(`失败！错误：${response?.message}`);
          }
          console.log(response);
        });
      } else {
        console.log("拍照未返回 base64");
      }
    } else {
      alert("请登陆后使用");
    }
  }

  return (
    <View style={styles.container}>
      <CameraView key={cameraKey} style={styles.camera} facing={facing as CameraType} ref={ref}></CameraView> {/*onCameraReady={cameraRef.current?.resumePreview} */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={Identify}>
          <Text style={styles.text}>拍照</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>翻转相机</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
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
    marginHorizontal: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});