import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function FilterScreen({ route, navigation }: any) {
  const { dishes } = route.params;
  const [filteredDishes, setFilteredDishes] = useState<any[]>(dishes);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  
  const filterByCourse = (course: string) => {
    setSelectedCourse(course);
    const filtered = course ? dishes.filter(dish => dish.course === course) : dishes;
    setFilteredDishes(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>

      {/* Buttons to filter by course */}
      <Button title="Show All" onPress={() => filterByCourse('')} />
      <Button title="Show Starters" onPress={() => filterByCourse('starter')} />
      <Button title="Show Mains" onPress={() => filterByCourse('main')} />
      <Button title="Show Desserts" onPress={() => filterByCourse('dessert')} />

      <Text style={styles.filterText}>
        {selectedCourse ? `Filtered by: ${selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1)}` : 'Showing all dishes'}
      </Text>

      <FlatList
        data={filteredDishes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>({item.course})</Text>
            <Text>R {item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterText: {
    fontSize: 18,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  item: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 5,
  },
});

