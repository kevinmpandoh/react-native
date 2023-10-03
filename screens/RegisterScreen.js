import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Semua kolom harus diisi');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Email tidak valid');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password harus memiliki setidaknya 6 karakter');
      return;
    }

    // Simpan data registrasi ke penyimpanan lokal
    const userData = { name, email, password };
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('Data registrasi berhasil disimpan');
    } catch (error) {
      console.error('Gagal menyimpan data registrasi:', error);
    }

    // Redirect ke halaman login setelah registrasi berhasil
    navigation.navigate('Login');
  };

  const isValidEmail = (email) => {
    // Implement your email validation logic here, e.g., using regex
    // This is a simple example, you can use a library like 'validator'
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Form Registrasi</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama"
        onChangeText={(text) => setName(text)}
        value={name}
      />
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
      <Button title="Registrasi" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Sudah punya akun? Login</Text>
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
  loginText: {
    marginTop: 10,
    color: 'blue', // Ubah warna teks sesuai keinginan Anda
    textDecorationLine: 'underline', // Beri garis bawah pada teks
  },
});

export default RegisterScreen;