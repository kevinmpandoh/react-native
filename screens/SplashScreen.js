import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

function SplashScreen({ navigation }) {
  useEffect(() => {
    // Simulasi penundaan splash screen selama beberapa detik
    setTimeout(() => {
      // Periksa apakah pengguna sudah login (misalnya, dengan AsyncStorage)
      // Gantilah logika berikut sesuai dengan cara Anda menyimpan status login pengguna.
      const isLoggedIn = false;

      if (isLoggedIn) {
        // Jika pengguna sudah login, arahkan ke halaman utama (Home)
        navigation.replace('Home');
      } else {
        // Jika pengguna belum login, arahkan ke halaman login (Login)
        navigation.replace('Login');
      }
    }, 3000); // Splash screen ditampilkan selama 3 detik
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./path-to-your-splash-image.png')}
        style={styles.splashImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  splashImage: {
    width: 200, // Sesuaikan ukuran gambar splash screen
    height: 200, // Sesuaikan ukuran gambar splash screen
  },
});

export default SplashScreen;