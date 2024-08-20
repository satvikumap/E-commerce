import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../config/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import Loading from '../../components/Loading';
import Tags from '../../components/Tags';
import Header from '../../components/Header';
import data from '../../data/data.json'; 
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(data.products);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const fetchUsername = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          const userDocRef = doc(db, 'users', parsedUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.name);
          } else {
            console.log('No such user document!');
          }
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoriteIds = await AsyncStorage.getItem('favoriteIds');
      if (favoriteIds) {
        const ids = JSON.parse(favoriteIds);
        setProducts(prevProducts => 
          prevProducts.map(product => ({
            ...product,
            isFavorite: ids.includes(product.id),
          }))
        );
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorite = async (id) => {
    try {
      const favoriteIds = await AsyncStorage.getItem('favoriteIds');
      let ids = favoriteIds ? JSON.parse(favoriteIds) : [];
      if (ids.includes(id)) {
        ids = ids.filter(favId => favId !== id);
      } else {
        ids.push(id);
      }
      await AsyncStorage.setItem('favoriteIds', JSON.stringify(ids));
      loadFavorites();
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  const toggleFavorite = (item) => {
    saveFavorite(item.id);
    setProducts(
      products.map((prod) => {
        if (prod.id === item.id) {
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };

  const handleProductDetails = (item) => {
    navigation.navigate("PRODUCT_DETAILS", { item });
  };

  return (
    <View>
      {loading ? (
        <View style={styles.Loading}>
          <Loading />
        </View>
      ) : (
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
          <FlatList
            ListHeaderComponent={
              <>
                <Header username={username} />
                <Text style={styles.textcat}>category</Text>
                <Tags />
              </>
            }
            data={products}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                handleProductClick={handleProductDetails}
                toggleFavorite={toggleFavorite}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Loading: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 400,
  },
  textcat: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 23,
    marginLeft: 25,
  }
});

export default HomeScreen;
