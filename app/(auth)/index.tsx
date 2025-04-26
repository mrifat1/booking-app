import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { Hospital } from 'lucide-react-native';

export default function LoginScreen() {
  const { login, loading, error } = useAuth();
//   console.log('====================================');
//   console.log("checkLoading",loading);
//   console.log('====================================');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      await login(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Hospital size={64} color="#4A90E2" />
          <Text style={styles.title}>MedBook</Text>
          <Text style={styles.subtitle}>Book your medical appointments with ease</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.loginText}>Log In</Text>
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <InputField
            label="Email"
            placeholder="test@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={emailError || undefined}
          />
          
          <InputField
            label="Password"
            placeholder="abcdefg"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={passwordError || undefined}
          />
          
          <Button
            title="Log In"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            style={styles.loginButton}
          />
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => console.log("RegisterScreen")}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#2E384D',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Inter-Regular',
  },
  formContainer: {
    width: '100%',
  },
  loginText: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 24,
    color: '#2E384D',
  },
  errorText: {
    color: '#E53935',
    marginBottom: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  loginButton: {
    marginTop: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  registerLink: {
    color: '#4A90E2',
    fontFamily: 'Inter-Medium',
  },
});