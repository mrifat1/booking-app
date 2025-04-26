import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ENV_BASE_URL = "hello"
const apiClient = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//optional
apiClient.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('token'); // Make sure to import AsyncStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default apiClient;