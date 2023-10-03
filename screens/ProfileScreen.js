import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Ambil data nama dan email dari penyimpanan lokal (AsyncStorage)
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setName(parsedUserData.name);
          setEmail(parsedUserData.email);
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Halaman Profil</Text>
      <Text>Nama: {name}</Text>
      <Text>Email: {email}</Text>
      <Button
        title="Kembali ke Halaman Utama"
        onPress={() => {
          // Navigasi kembali ke halaman utama
          navigation.navigate('Home');
        }}
      />
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileScreen;