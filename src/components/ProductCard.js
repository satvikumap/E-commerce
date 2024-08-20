import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icons from 'react-native-vector-icons/Ionicons';

const ProductCard = ({ item, handleProductClick, toggleFavorite }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleProductClick(item);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.coverImage} />
      <View style={styles.contentContainer}>

        <Text style={styles.title}>{item.title}</Text>
        <View style={{flexDirection:"row"}}>
            <Icons name='star' color="#FFD700"/>
            <Text style={styles.title}>{item.start}</Text>
        </View>
 
        <View style={{flexDirection:"row",justifyContent:"space-between"}} >
            <Text style={styles.price}>${item.price}</Text>
            <Icons name='add-circle' color="#1977f3" size={23}/>
        </View>
      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity
          onPress={() => {
            toggleFavorite(item);
          }}
        >
          {item.isFavorite ? (
            <Image
              source={require("../../assets/favoriteFilled.png")}
              style={styles.faviorate}
            />
          ) : (
            <Image
              source={require("../../assets/favorite.png")}
              style={styles.faviorate}
            />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  coverImage: {
    height: 150,
    width: "100%",
    position: "relative",
  },
  contentContainer: {
    padding: 10,
    justifyContent: "space-between"
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
  },
  price: {
    fontSize: 18,
    color:'#000000',
    fontWeight:"bold"
    
  },
  likeContainer: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    right: 10,
    top: 10,
  },
  faviorate: {
    height: 20,
    width: 20,
  },
});