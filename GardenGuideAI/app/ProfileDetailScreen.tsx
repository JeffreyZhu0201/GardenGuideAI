// screens/ProfileDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { COLORS, GLOBAL_STYLES } from '../components/sharedStyles';

// 定义导航参数类型
type RootStackParamList = {
  ProfileDashboard: undefined;
  ProfileDetail: { userId: string };
};
type ProfileDetailScreenProps = StackScreenProps<RootStackParamList, 'ProfileDetail'>;

const ProfileDetailScreen: React.FC<ProfileDetailScreenProps> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<ProfileDetailScreenProps['route']>();
  const { userId } = route.params; // 获取从上一个页面传递过来的参数

  const renderJobSkill = (skill: string) => (
    <View style={styles.skillTag}>
      <Text style={styles.skillText}>{skill}</Text>
    </View>
  );

  const renderStatCard = (title: string, value: string | number, isPrimary: boolean = false) => (
    <View style={[styles.statCard, isPrimary ? styles.primaryStatCard : styles.secondaryStatCard]}>
      <Text style={isPrimary ? styles.primaryStatValue : styles.secondaryStatValue}>{value}</Text>
      <Text style={isPrimary ? styles.primaryStatTitle : styles.secondaryStatTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={GLOBAL_STYLES.container}>
      <StatusBar style="dark" />
      <View style={styles.backgroundCircleTopRight} />
      <View style={styles.backgroundCircleBottomRight} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          <Text style={GLOBAL_STYLES.headerText}>Profile</Text>
          <View style={{ width: 24 }} /> {/* 占位符保持居中 */}
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80/FF6F61/FFFFFF?text=TL' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Tobi Lateef</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>open</Text>
          </View>
        </View>

        {/* Main Details */}
        <View style={GLOBAL_STYLES.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Profession</Text>
            <Text style={styles.detailValue}>Contractor</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contact</Text>
            <Text style={styles.detailValue}>+234 800 3344 4075</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>Lagos</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Position</Text>
            <Text style={styles.detailValue}>open</Text>
          </View>
        </View>

        {/* Jobs Done (Skills) */}
        <View style={styles.section}>
          <Text style={GLOBAL_STYLES.subHeaderText}>Jobs done</Text>
          <View style={styles.skillsContainer}>
            {renderJobSkill('Product Design')}
            {renderJobSkill('Front end')}
            {renderJobSkill('Visual Designer')}
            {renderJobSkill('Voyager')}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {renderStatCard('Average Rating', '4.3', true)}
          {renderStatCard('Jobs Completed', '37', true)}
          {renderStatCard('Pay range', '150k - 200k (negotiable)', false)}
          {renderStatCard('Ongoing', '02', false)}
        </View>

        {/* Availability & Quality */}
        <View style={styles.qualitiesContainer}>
          <View style={styles.qualityItem}>
            <Text style={styles.qualityLabel}>Availability</Text>
            <Text style={styles.qualityValue}>Excellent</Text>
          </View>
          <View style={styles.qualityItem}>
            <Text style={styles.qualityLabel}>Service</Text>
            <Text style={styles.qualityValue}>Good</Text>
          </View>
          <View style={styles.qualityItem}>
            <Text style={styles.qualityLabel}>Quality</Text>
            <Text style={styles.qualityValue}>Good</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: COLORS.secondaryRed, // 占位符背景
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green', // Online status
    marginRight: 5,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textGray,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  section: {
    marginBottom: 30,
    marginTop: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillTag: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%', // 两列布局
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryStatCard: {
    backgroundColor: COLORS.white,
  },
  secondaryStatCard: {
    backgroundColor: COLORS.secondaryRed,
  },
  primaryStatValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 5,
  },
  primaryStatTitle: {
    fontSize: 14,
    color: COLORS.textGray,
  },
  secondaryStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkRed,
    marginBottom: 5,
  },
  secondaryStatTitle: {
    fontSize: 12,
    color: COLORS.darkRed,
  },
  qualitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 15,
    paddingVertical: 15,
  },
  qualityItem: {
    alignItems: 'center',
  },
  qualityLabel: {
    fontSize: 12,
    color: COLORS.textGray,
    marginBottom: 5,
  },
  qualityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  backgroundCircleTopRight: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.secondaryRed,
    opacity: 0.5,
  },
  backgroundCircleBottomRight: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.secondaryRed,
    opacity: 0.5,
  },
});

export default ProfileDetailScreen;