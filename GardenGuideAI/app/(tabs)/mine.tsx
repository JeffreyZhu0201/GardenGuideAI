/*
 * @Date: 2025-09-01 21:35:23
 * @LastEditors: Jeffrey Zhu JeffreyZhu0201@gmail.com
 * @LastEditTime: 2025-09-02 10:27:16
 * @FilePath: /GardenGuideAI/GardenGuideAI/app/(tabs)/mine.tsx
 * @Description: 
 */

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import useStore from '@/app/store/store';
import UserInfo from "@/components/UserInfo";
import { Button } from "@react-navigation/elements";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from "@/constants/User";

// Define the RootStackParamList type
export type RootStackParamList = {
  "Mine": undefined;
  "LoginPage": undefined;
  "RegisterPage": undefined;
};

export default function MineScreen() {
  const { setHeaderTitle, userInfo, setUserInfo, token, setToken } = useStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Mine'>>();

  const [userEmail, setUserEmail] = useState("");

  const fetchOnLoad = async () => {
    if (token && userInfo) {
      setUserEmail(userInfo.email);
    }
    else{
      setUserEmail("");
    }
  };

  useFocusEffect(
    useCallback(() => {
      setHeaderTitle("我的");
    }, [setHeaderTitle])
  );

  useEffect(() => {
    fetchOnLoad();
  }, [userInfo, token]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {userInfo ? (
        <>
          <ThemedText>User Info:</ThemedText>
          {/* <UserInfo userInfo={userInfo} /> */}
          <ThemedText>Email: {userEmail}</ThemedText>
          <Button onPress={() => {
            setUserInfo(undefined as unknown as User);
            setToken(undefined as unknown as string);
          }} >
            Logout
          </Button>
        </>
      ) : (
        <>
          <ThemedText>Please Login or Register</ThemedText>
          <Button onPress={() => navigation.navigate('LoginPage')}>Login</Button>
          <Button onPress={() => navigation.navigate('RegisterPage')}>Register</Button>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
});


// // screens/ProfileDashboardScreen.tsx
// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; // 导入图标
// import { COLORS, GLOBAL_STYLES } from '../../components/sharedStyles';

// // 定义导航参数类型
// export type RootStackParamList = {
//   ProfileDashboard: undefined;
//   ProfileDetail: { userId: string }; // 示例：传递用户ID
// };
// type ProfileDashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileDashboard'>;

// const ProfileDashboardScreen: React.FC = () => {
//   const navigation = useNavigation<ProfileDashboardScreenNavigationProp>();

//   const renderWorkerCard = (name: string, isAddButton: boolean = false) => (
//     <View style={styles.workerCard}>
//       {isAddButton ? (
//         <Feather name="plus-circle" size={30} color={COLORS.darkGray} />
//       ) : (
//         <Image
//           source={{ uri: `https://via.placeholder.com/60/FFADAD/FF6F61?text=${name.charAt(0)}` }}
//           style={styles.workerAvatar}
//         />
//       )}
//       <Text style={styles.workerName}>{isAddButton ? 'Add Workers' : name}</Text>
//     </View>
//   );

//   const renderServiceItem = (iconName: keyof typeof MaterialCommunityIcons.glyphMap, serviceName: string) => (
//     <TouchableOpacity style={[GLOBAL_STYLES.card, styles.serviceItem]}>
//       <MaterialCommunityIcons name={iconName} size={30} color={COLORS.primaryRed} />
//       <Text style={styles.serviceText}>{serviceName}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={GLOBAL_STYLES.container}>
//       <StatusBar style="dark" />
//       <View style={styles.backgroundCirclesTopRight} />
//       <View style={styles.backgroundCirclesBottomLeft} />

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={GLOBAL_STYLES.headerText}>Profile</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail', { userId: 'adewaleTaiwo' })}>
//             <Feather name="menu" size={24} color={COLORS.darkGray} />
//           </TouchableOpacity>
//         </View>

//         {/* User Info */}
//         <View style={styles.userInfo}>
//           <Image
//             source={{ uri: 'https://via.placeholder.com/60/FF6F61/FFFFFF?text=AT' }}
//             style={styles.avatar}
//           />
//           <View style={styles.userInfoText}>
//             <Text style={styles.userName}>Adewale Taiwo</Text>
//             <Text style={GLOBAL_STYLES.paragraphText}>House Manager</Text>
//           </View>
//         </View>

//         {/* Wallet & Master Card */}
//         <View style={styles.cardsRow}>
//           <View style={[GLOBAL_STYLES.card, styles.walletCard]}>
//             <Text style={GLOBAL_STYLES.paragraphText}>Wallet Balance</Text>
//             <Text style={styles.walletAmount}>$5048.57</Text>
//             <Text style={GLOBAL_STYLES.paragraphText}>Total Service</Text>
//             <Text style={styles.totalService}>24</Text>
//           </View>
//           <View style={[GLOBAL_STYLES.card, styles.masterCard]}>
//             <Text style={{ color: COLORS.white, fontSize: 12 }}>Master Card</Text>
//             <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>5999-XXXX</Text>
//             <Text style={{ color: COLORS.white, fontSize: 12, marginTop: 10 }}>Adewale T.</Text>
//           </View>
//         </View>

//         {/* Houses/Workers */}
//         <View style={styles.section}>
//           <Text style={GLOBAL_STYLES.subHeaderText}>Houses</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.workersList}>
//             {renderWorkerCard('', true)}
//             {renderWorkerCard('Tobi Lateef')}
//             {renderWorkerCard('Queen Needle')}
//             {renderWorkerCard('Joan Blessing')}
//           </ScrollView>
//         </View>

//         {/* Services */}
//         <View style={styles.section}>
//           <View style={styles.servicesHeader}>
//             <Text style={GLOBAL_STYLES.subHeaderText}>Services</Text>
//             <TouchableOpacity><Text style={{ color: COLORS.primaryRed }}>All</Text></TouchableOpacity>
//           </View>
//           {renderServiceItem('tools', 'Electrical')}
//           {renderServiceItem('wrench', 'Others')}
//           {/* 可以添加更多服务 */}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 50, // 底部留出一些空间
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//     backgroundColor: COLORS.secondaryRed, // 占位符背景
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   userInfoText: {},
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: COLORS.darkGray,
//   },
//   cardsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   walletCard: {
//     flex: 1,
//     marginRight: 10,
//     justifyContent: 'space-between',
//     height: 120, // 固定高度
//   },
//   walletAmount: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: COLORS.darkGray,
//   },
//   totalService: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: COLORS.primaryRed,
//   },
//   masterCard: {
//     flex: 1,
//     marginLeft: 10,
//     backgroundColor: COLORS.primaryRed,
//     justifyContent: 'space-between',
//     height: 120, // 固定高度
//   },
//   section: {
//     marginBottom: 30,
//   },
//   workersList: {
//     paddingVertical: 10,
//   },
//   workerCard: {
//     width: 80,
//     height: 100,
//     backgroundColor: COLORS.lightGray,
//     borderRadius: 15,
//     marginRight: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   workerAvatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginBottom: 5,
//     backgroundColor: COLORS.secondaryRed,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   workerName: {
//     fontSize: 12,
//     color: COLORS.darkGray,
//     textAlign: 'center',
//   },
//   servicesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   serviceItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   serviceText: {
//     marginLeft: 15,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: COLORS.darkGray,
//   },
//   backgroundCirclesTopRight: {
//     position: 'absolute',
//     top: -50,
//     right: -50,
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     backgroundColor: COLORS.secondaryRed,
//     opacity: 0.5,
//   },
//   backgroundCirclesBottomLeft: {
//     position: 'absolute',
//     bottom: -80,
//     left: -80,
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     backgroundColor: COLORS.secondaryRed,
//     opacity: 0.5,
//   },
// });

// export default ProfileDashboardScreen;