import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, ImageBackground } from 'react-native';

export default function CheckoutScreen({ route, navigation }: any) {
  const { selectedItems } = route.params;
  const totalPrice = selectedItems.reduce((total: number, item: any) => total + item.price, 0);

  const handlePlaceOrder = () => {
    Alert.alert("Order Confirmed!", "Your order has been successfully placed.", [
      { text: "OK", onPress: () => navigation.navigate('Home') }
    ]);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://as2.ftcdn.net/v2/jpg/03/34/78/95/1000_F_334789537_mITVL6dknn8OS2kKk8KJg9fD9HjbVTi7.jpg' }} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Checkout</Text>
        <FlatList
          data={selectedItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
              <Text>R {item.price.toFixed(2)}</Text>
            </View>
          )}
        />
        <Text style={styles.total}>Total: R {totalPrice.toFixed(2)}</Text>
        <Button title="Place Order" onPress={handlePlaceOrder} />
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
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 6,
  },
  total: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
