import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  const navigation = useNavigation();

  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi');
      return;
    }
  
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Email tidak valid');
      return;
    }
  
    if (password.length < 3) {
      Alert.alert('Error', 'Password harus memiliki setidaknya 6 karakter');
      return;
    }
  
    try {
      // Ambil data registrasi dari penyimpanan lokal
      const userData = await AsyncStorage.getItem('userData');
      console.log(userData)
  
      if (userData) {
        const parsedUserData = JSON.parse(userData);
  
        if (parsedUserData.email === email && parsedUserData.password === password) {
          // Data login sesuai dengan data registrasi yang ada
          // Redirect ke halaman utama
          navigation.navigate('Home');
          return;
        }
      }
  
      // Jika tidak ada data registrasi yang cocok atau data tidak tersedia
      Alert.alert('Error', 'Email atau password salah');
    } catch (error) {
      console.error('Gagal mengambil data registrasi:', error);
    }
  };

  const isValidEmail = (email) => {
    // Implement your email validation logic here, e.g., using regex
    // This is a simple example, you can use a library like 'validator'
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Form Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  registerText: {
    marginTop: 10,
    color: 'blue', // Ubah warna teks sesuai keinginan Anda
    textDecorationLine: 'underline', // Beri garis bawah pada teks
  },
});

export default LoginScreen;