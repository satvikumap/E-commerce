import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CartContext} from '../../context/CartContext';
import Icons from 'react-native-vector-icons/Ionicons';

const colorsArray = ['#6367D0', '#E96E6E', '#1F44A3', '#FFB53A', '#1D752B'];

const ProductDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const product = route.params.item;
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#6367D0');
  const [quantity, setQuantity] = useState(1);
  const {addToCartItem} = useContext(CartContext);

  const handleAddToCart = () => {
    const updatedProduct = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity
    };
    addToCartItem(updatedProduct);
  };

  const handleBuyNow = () => {
    const updatedProduct = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity
    };
    addToCartItem(updatedProduct);
    navigation.navigate('Cart');
  };

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + change;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  const totalPrice = product.price * quantity;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', margin: 20, marginTop: 40}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name={'chevron-back-outline'} size={30} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.header}>Product Detail</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: product.image}} style={styles.coverImage} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.detail}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text>Price</Text>
        </View>
        <View style={styles.detail}>
          <View style={styles.reviews}>
            <Icons name="star" color="#FFD700" size={16} />
            <Text>{product.start}</Text>
            <Text>(22 review)</Text>
          </View>
          <Text style={styles.productPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
        {/* Select Color */}
        <Text style={styles.label}>Select Color</Text>
        <View style={styles.colorContainer}>
          {colorsArray.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedColor(color)}>
              <View
                style={[
                  styles.colorCircle,
                  {backgroundColor: color},
                  selectedColor === color && styles.selectedColorBorder,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Select Size */}
        <Text style={styles.label}>Select Size</Text>
        <View style={styles.sizeContainer}>
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeOption,
                selectedSize === size && styles.selectedSize,
              ]}
              onPress={() => setSelectedSize(size)}>
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.selectedSizeText,
                ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity */}
        <Text style={styles.label}>Quantity</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(-1)}>
            <Text style={styles.quantityTextMins}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityNumber}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(1)}>
            <View
              style={{
                backgroundColor: '#1977f3',
                borderRadius: 4,
                height: 30,
                width: 30,
              }}>
              <Text style={styles.quantityTextPlus}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.label}>Description</Text>
          <Text>A soft and comfortable product which is easy to wash and creates a soft, comfortable texture. Read more...</Text>
        </View>

        {/* Add to Cart & Buy Now */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.addToCart]}
            onPress={handleAddToCart}>
            <Text style={[styles.buttonText, styles.addtoCarttext]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.buyNowText]}
            onPress={handleBuyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 60,
  },
  imageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444444',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1977f3',
    marginTop: 5,
  },
  reviews: {
    color: '#A5A5A5',
    marginVertical: 5,
    fontSize: 14,
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444444',
    marginVertical: 8,
  },
  colorContainer: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    margin: 6,
  },
  selectedColorBorder: {
    borderWidth: 3,
    borderColor: '#1977f3',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  sizeOption: {
    width: 45,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#e6e3e3',
    margin: 5,
  },
  selectedSize: {
    borderColor: '#1977f3',
    borderWidth: 1,
    borderCurve: 'circular',
  },
  sizeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444444',
  },
  selectedSizeText: {
    color: '#1977f3',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityTextMins: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#444444',
  },
  quantityTextPlus: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    overflow: 'hidden',
  },
  quantityNumber: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 10,
  },

  btn: {
    borderRadius: 25,
    borderCurve: 'circular',
    width: 178,
    height: 50,
  },
  addToCart: {
    borderColor: '#1977f3',
    borderWidth: 2,
  },
  addtoCarttext: {
    color: '#1977f3',
  },
  buyNowText: {
    backgroundColor: '#1977f3',
  },
});
