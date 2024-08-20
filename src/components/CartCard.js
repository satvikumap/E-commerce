import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icons from 'react-native-vector-icons/Ionicons';

const CartCard = ({ item, handleDelete, handleQuantityChange }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
       
      </View>
      <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
      <Text style={styles.quantityTextPlus}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
          
          <Text style={styles.quantityTextMins}>-</Text>
        </TouchableOpacity>
        
     
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },
  image: {
    height: 90,
    width: 90,
    resizeMode: "contain",
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444444",
  },
  price: {
    fontSize: 16,
    color: "#007bff",
    marginVertical: 5,
    fontWeight: "600",
  },
  quantityText: {
    fontSize: 14,
    color: "#757575",
    marginTop: 5,
  },
  iconContainer: {
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginVertical: 5,
  },
  quantityTextMins: {
    fontSize: 30,
    fontWeight: 'bold',

  },
  quantityTextPlus: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:'#007bff',
    padding:5,
    paddingLeft:7,
    paddingRight:7,
    borderCurve:'circular',
    borderRadius:6,

    color:'#ffffff'

  },
});