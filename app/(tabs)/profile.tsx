import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Mail, Phone, MapPin, Shield, Globe, LogOut } from 'lucide-react-native';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const userData = {
    ...user,
    phone: '+8801765021520',
    address: 'Mirpur 2, Dhaka',
    dateOfBirth: 'Jan 19, 1999',
  };

  const handleLogout = () => {
      Alert.alert(
        "Log Out",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Log Out", 
            onPress: async () => {
              await logout();
            },
            style: "destructive"
          }
        ]
      );
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
        </View>
        
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {userData.name ? userData.name.substring(0, 2).toUpperCase() : 'U'}
              </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userInfo}>Patient ID: #12345</Text>
            </View>
          </View>
          
          <Button
            title="Edit Profile"
            variant="outline"
            size="small"
            style={styles.editButton}
          />
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoRow}>
            <Mail size={20} color="#4A90E2" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userData.email}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Phone size={20} color="#4A90E2" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{userData.phone}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <MapPin size={20} color="#4A90E2" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{userData.address}</Text>
            </View>
          </View>
        </View>
        
        <View style={[styles.infoSection]}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#E53935" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginBottom: 60
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2E384D',
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
  },
  nameContainer: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#2E384D',
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2E384D',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2E384D',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    // paddingVertical: 16,
    // paddingHorizontal: 24,
  },
  logoutText: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#E53935',
  },
});