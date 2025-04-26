import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking, Hospital, User } from '@/types';
import { addBooking, bookings, hospitals } from './mockData';
import apiClient from './axios';

class ApiService {
  async login(email: string, password: string): Promise<{ token: string; user: User }> {

    try {
        console.log('====================================');
        console.log("email,password",email,password);
        console.log('====================================');
        const testEmail = "test@example.com"
        const testPassword = "abcdefg"
        if(email == testEmail && password == testPassword){
            const response = await apiClient.post('https://run.mocky.io/v3/52cd1452-396d-4ea2-b58c-c393853ce496',{
                email: email,
                password: password
            });
    
            // responseOfMockData = {
            //     "token": "mocked-jwt-token",
            //     "user": {
            //       "id": 1,
            //       "email": "test@example.com",
            //       "name": "Test User"
            //     }
            //   }
            const { token, user} = response?.data
            if(token && user){
                await AsyncStorage.setItem('auth_token', token);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                return { token, user };
            }
            else{
                throw new Error('Failed to fetch data');
            } 
        }
        else{
            throw new Error('Invalid email or password');
        }
    
      } catch (error) {
        console.log("error",error);
        
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

  async fetchHospitals() {
    try {
        const response = await apiClient.get('https://run.mocky.io/v3/e421c18c-2a06-4acb-9cbd-4a156fcb6513');
        // response of this list are in mockData file
        return response.data;
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        throw error;
      }
  }

  async fetchHospitalById(id: string): Promise<Hospital | null> {

    try {
        const response = await apiClient.get('https://run.mocky.io/v3/e421c18c-2a06-4acb-9cbd-4a156fcb6513');
        const hospital = response.data.find(h => h.id === id);
        return hospital || null;
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        throw error;
      }
  }

  async createBooking(bookingData: Omit<Booking, 'id'>) {
    try {
        const response = await apiClient.post('https://run.mocky.io/v3/70bc3f9c-4f13-441a-aa6f-5c7aab3d4369',{
            bookingData
        })
        // mockDataResponse = {
        //     "status": "success"
        // }
        let responseData
        if(response?.data?.status == "success"){
           responseData = addBooking(bookingData);
        }
        return responseData
    } catch (error) {
        throw error;
    }
  }

  async fetchUserBookings(userId: string): Promise<Booking[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return bookings.filter(booking => booking.userId === userId);
  }

}

export default new ApiService();