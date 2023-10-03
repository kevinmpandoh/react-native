import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selamat Datang di Halaman Utama</Text>
      <Text style={styles.description}>Ini adalah halaman utama aplikasi.</Text>
      <Button
        title="Profil"
        onPress={() => {
          // Navigasi ke halaman profil ketika tombol profil ditekan
          navigation.navigate('Profile');
        }}
        style={styles.profileButton} // Menambahkan gaya tombol profil
      />    
      <Button
        title="Logout"
        onPress={() => {
          // Implementasi logika logout di sini (misalnya, hapus token, ubah status login, dll.)
          // Setelah logout, arahkan pengguna ke halaman login
          navigation.replace('Login');
          
        }}
        style={styles.logoutButtonText}
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
  description: {
    fontSize: 16,
    marginBottom: 50,
  },
  profileButton: {
    marginBottom: 20,
  },
});

export default HomeScreen;