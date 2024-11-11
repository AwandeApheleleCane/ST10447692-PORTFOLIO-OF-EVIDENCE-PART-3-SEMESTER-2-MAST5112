import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

export default function AddDishScreen({ navigation }: any) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const addDish = () => {
    if (dishName && description && !isNaN(Number(price)) && Number(price) > 0 && course) {
      const newDish = {
        id: Date.now().toString(),
        name: dishName,
        description: description,
        course: course,
        price: Number(price),
      };
      navigation.navigate('Home', { newDish });
    } else {
      alert('Please fill all fields correctly');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://as2.ftcdn.net/v2/jpg/02/56/84/27/1000_F_256842765_wfB1DQ7BnYrxnWrdGYI1E2p1aB8A2zzp.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Add a New Dish</Text>

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Course (e.g., starter, main, dessert)"
          value={course}
          onChangeText={setCourse}
        />

        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Button title="Add Dish" onPress={addDish} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 22,
  },
  input: {
    height: 42,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
