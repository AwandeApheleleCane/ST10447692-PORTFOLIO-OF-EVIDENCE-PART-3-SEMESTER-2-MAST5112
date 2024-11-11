import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation, route }: any) {
  const initialDishes = [
    { id: '1', name: 'Pastry', price: 55, description: 'Garlic Butter Short Bread', course: 'starter' },
    { id: '2', name: 'Steak', price: 155, description: 'Prime waygu steak', course: 'main' },
    { id: '3', name: 'Pizza', price: 105, description: 'Mozzarela Pizzeria', course: 'main' },
    { id: '4', name: 'Seafood', price: 125, description: 'Assorted servings', course: 'starter' },
  ];

  const [dishes, setDishes] = useState(initialDishes);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  React.useEffect(() => {
    if (route.params?.newDish) {
      setDishes([...dishes, route.params.newDish]);
    }
  }, [route.params?.newDish]);

  const toggleItemSelection = (dish: any) => {
    if (selectedItems.includes(dish)) {
      setSelectedItems(selectedItems.filter(item => item.id !== dish.id));
    } else {
      setSelectedItems([...selectedItems, dish]);
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Alert.alert('No items selected', 'Please select at least one item before proceeding.');
    } else {
      navigation.navigate('Checkout', { selectedItems });
    }
  };

  // Calculate average price for each course
  const calculateAveragePrices = (dishes: any[]) => {
    const courseTotals = {};
    const courseCounts = {};

    // Sum prices and count items for each course
    dishes.forEach(dish => {
      const { course, price } = dish;
      if (!courseTotals[course]) {
        courseTotals[course] = 0;
        courseCounts[course] = 0;
      }
      courseTotals[course] += price;
      courseCounts[course] += 1;
    });

    // Calculate averages
    const averages: any = {};
    for (let course in courseTotals) {
      averages[course] = (courseTotals[course] / courseCounts[course]).toFixed(2);
    }

    return averages;
  };

  // Get average prices
  const averagePrices = calculateAveragePrices(dishes);

  return (
    <ImageBackground
      source={{ uri: 'https://as2.ftcdn.net/v2/jpg/03/57/91/11/1000_F_357911175_lUNZj0iZx0B6UEj3JyJwhKnJQv1jT1i4.jpg' }} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Menu</Text>

        {/* Display total number of menu items */}
        <Text style={styles.totalItems}>Total Menu Items: {dishes.length}</Text>

        {/* Display average prices by course */}
        <View style={styles.averagePrices}>
          {Object.keys(averagePrices).map(course => (
            <Text key={course} style={styles.averageText}>
              {course.charAt(0).toUpperCase() + course.slice(1)} Average Price: R {averagePrices[course]}
            </Text>
          ))}
        </View>

        <FlatList
          data={dishes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.item, selectedItems.includes(item) && styles.selectedItem]}
              onPress={() => toggleItemSelection(item)}
            >
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>({item.course})</Text>
              <Text>R {item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />

        <Button title="Add New Dish" onPress={() => navigation.navigate('AddDish')} />
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
        />
      </View>
    </ImageBackground>
    <Button
    title="Filter Menu by Course"
    onPress={() => navigation.navigate('Filter', { dishes })}
  />
</View>
</ImageBackground>
);
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  totalItems: {
    fontSize: 20,
    marginBottom: 14,
    fontWeight: 'bold',
  },
  averagePrices: {
    marginBottom: 20,
  },
  averageText: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 6,
  },
  item: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#8B451380',
  },
});
