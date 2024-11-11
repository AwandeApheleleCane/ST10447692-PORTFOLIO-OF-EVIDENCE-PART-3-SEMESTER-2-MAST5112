
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Define the type for Dish
type Dish = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
};

export default function ManageMenuScreen({ navigation, route }: any) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [dishes, setDishes] = useState<Dish[]>(route.params?.dishes || []);

  // Add dish to the menu
  const addDish = () => {
    if (dishName && description && course && !isNaN(Number(price)) && Number(price) > 0) {
      const newDish: Dish = {
        id: Date.now().toString(),
        name: dishName,
        description,
        course,
        price: Number(price),
      };
      const updatedDishes = [...dishes, newDish];
      setDishes(updatedDishes);
      setDishName('');
      setDescription('');
      setCourse('');
      setPrice('');

      // Pass updated dishes list back to the HomeScreen and FilterMenuScreen
      navigation.setParams({ dishes: updatedDishes });
    } else {
      Alert.alert('Invalid Input', 'Please fill in all fields correctly');
    }
  };

  // Remove a dish from the menu
  const removeDish = (id: string) => {
    const updatedDishes = dishes.filter((dish: Dish) => dish.id !== id);
    setDishes(updatedDishes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu</Text>
      
      {/* Dish Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />

      {/* Description Input */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Course Picker */}
      <Text style={styles.label}>Course</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Course" value="" />
        <Picker.Item label="Starter" value="starter" />
        <Picker.Item label="Main" value="main" />
        <Picker.Item label="Dessert" value="dessert" />
      </Picker>

      {/* Price Input */}
      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Add Dish Button */}
      <TouchableOpacity style={styles.button} onPress={addDish}>
        <Text style={styles.buttonText}>Add Dish</Text>
      </TouchableOpacity>

      {/* List of Dishes */}
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text style={styles.dishText}>{item.name} ({item.course}) - R{item.price.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeDish(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Save & Return Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home', { dishes })}
      >
        <Text style={styles.buttonText}>Save & Return</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { 
    borderColor: '#ccc', 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5 
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  dishItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 5, 
    padding: 10, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 5 
  },
  dishText: { fontSize: 16, fontWeight: '500' },
  removeText: { 
    color: 'red', 
    fontSize: 14, 
    fontWeight: '500' 
  },
});
