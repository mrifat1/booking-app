import React, { createContext, useState, useEffect, useContext } from 'react';
import { router } from 'expo-router';
import apiService from '@/services/api';
import { AuthState, User } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  console.log("render");
  

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authData = await apiService.checkAuth();

        console.log("authData",authData);
        
        
        if (authData) {
          setState({
            isAuthenticated: true,
            user: authData.user,
            token: authData.token,
            loading: false,
            error: null,
          });
          router.replace('/(tabs)');
        } else {
          setState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        setState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
          error: 'Failed to authenticate',
        });
      }
    };

    checkAuthentication();
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { token, user } = await apiService.login(email, password);
      setState({
        isAuthenticated: true,
        user,
        token,
        loading: false,
        error: null,
      });
      router.replace('/(tabs)');
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      await apiService.logout();
      setState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      });
      router.replace('/(auth)');
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);