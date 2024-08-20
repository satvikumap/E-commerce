import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import data from '../../data/data.json';

const Favorite = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigation = useNavigation();

  const loadFavorites = async () => {
    try {
      const favoriteIds = await AsyncStorage.getItem('favoriteIds');
      if (favoriteIds) {
        const ids = JSON.parse(favoriteIds);
        const filteredProducts = data.products.filter(product => ids.includes(product.id));
        setFavoriteProducts(filteredProducts);
      } else {
        setFavoriteProducts([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleProductDetails = (item) => {
    navigation.navigate("PRODUCT_DETAILS", { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <FlatList
        data={favoriteProducts}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={() => {}} // No need to toggle here
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Favorite;
