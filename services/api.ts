import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Hospital, User } from '@/types';
import { hospitals } from './mockData';

class ApiService {
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const testEmail = 'test@gmail.com'
    const testPassword = 'password'

    if (email === testEmail && password === testPassword) {
      const token = `mock-jwt-token-${Date.now()}`;
      const user: User = {
        id: '1',
        email,
        name: 'Faisal Mahmud',
      };
      
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } else {
      throw new Error('Invalid email or password');
    }
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user');
  }

  async checkAuth(): Promise<{ token: string; user: User } | null> {
    const token = await AsyncStorage.getItem('auth_token');
    const userStr = await AsyncStorage.getItem('user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return { token, user };
    }
    
    return null;
  }

  async fetchHospitals(): Promise<Hospital[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return hospitals;
  }
}

export default new ApiService();