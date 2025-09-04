/*
 * @Author: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @Date: 2025-08-30 00:43:57
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-04 17:22:51
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/(tabs)/camera.tsx
 * @Description: 相机识别页面
 * 
 * Copyright (c) 2025 by Jeffrey Zhu, All Rights Reserved. 
 */


import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, CameraPictureOptions } from 'expo-camera';
import { useRef, useState, useCallback } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { base64ToFile } from '@/utils/utils'
import useStore from '@/app/store/store';
import { Image } from "expo-image"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemedText } from '@/components/ThemedText';

export type RootStackParamList = {
	"CameraPage": undefined;
	"PostPage": undefined;
};

export default function CameraPage() {
	const [permission, requestPermission] = useCameraPermissions();

	const { token, setHeaderTitle, setFileUri } = useStore();

	const ref = useRef<CameraView>(null);

	const [cameraKey, setCameraKey] = useState<number>(0);

	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CameraPage'>>();

	useFocusEffect(
		useCallback(() => {
			setHeaderTitle('Camera');
		}, [setHeaderTitle])
	);

	useFocusEffect(
		useCallback(() => {
			setCameraKey(k => k + 1);
		}, [])
	);

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.garantedScreen}>
				<Text style={styles.garantedMessage}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
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

				setFileUri(fileUri);

				navigation.navigate("PostPage");

			} else {
				console.log("拍照未返回 base64");
			}
		} else {
			alert("请登陆后使用");
		}
	}

	return (
		<View style={styles.container}>
			<View style={{ justifyContent: 'center',flex:1, alignItems: 'center',maxHeight:80 }}>
				<Text style={{ color: '#ffffff', fontSize: 32, textAlign: 'center',fontWeight:'600' }}>
					「Scan it now」
				</Text>
			</View>
			<CameraView key={cameraKey} style={styles.camera}  ref={ref}></CameraView>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={Identify}>
					<Image source={require('@/assets/icons/photo-capture.png')} style={styles.cameraIcon} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent:'space-between',
		flex: 1,
		backgroundColor: '#000000ff', // 推荐颜色
	},
	garantedScreen: {
		flex: 1,
		justifyContent: 'center',
	},
	garantedMessage: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	cameraContainer: {
		display: 'flex',
		alignItems: 'center',
		margin: 0,
		backgroundColor: '#c18383ff',
	},
	camera: {
		marginTop: 0,
		borderColor: 'white',
		borderWidth: 6,
		width: 340,
		height: 400,
		maxHeight: 400,
		maxWidth: 340,
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		borderRadius: 50,
		overflow: 'hidden',
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		marginBottom: 30,
	},
	cameraIcon: {
		width: 64,
		height: 64,
	},
})
