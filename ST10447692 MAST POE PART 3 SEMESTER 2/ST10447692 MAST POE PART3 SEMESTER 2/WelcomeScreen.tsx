import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://t4.ftcdn.net/jpg/04/89/04/65/240_F_489046512_D3W2qTasAWwtMycRQOVuQnjPFItDYxh8.jpg' }} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Image
            source={{ uri: 'https://stock.adobe.com/za/images/gourmet-chef-cooking-in-a-commercial-kitchen/186605168' }} 
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.subText}>To Christoffel Private Chef</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Menu')}
          >
            <Button title="Explore Menu" onPress={() => navigation.navigate('Home')} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(75, 0, 130, 0.7)', 
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: '30%', 
  },
  logo: {
    width: 100, 
    height: 100, 
    marginBottom: 20, 
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 23,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffffff00',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
