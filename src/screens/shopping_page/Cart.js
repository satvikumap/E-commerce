import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import CartCard from "../../components/CartCard";
import { CartContext } from "../../context/CartContext";
import Icons from 'react-native-vector-icons/Ionicons'; // for icons
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const { cartItems, deleteCartItem, updateCartItemQuantity, totalPrice } = useContext(CartContext);
  const navigation = useNavigation();

  const handleQuantityChange = (id, change) => {
    updateCartItemQuantity(id, change);
  };

  const handleDeleteItem = async (id) => {
    await deleteCartItem(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity>
          <Icons name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>Please add products to the cart</Text>
  
            <Text style={styles.buttonText}>Browse Products</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartCard
              item={item}
              handleDelete={handleDeleteItem}
              handleQuantityChange={handleQuantityChange}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 20, paddingBottom: 200 }}
          ListFooterComponent={
            <>
              <View style={styles.bottomContentContainer}>
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Total items:</Text>
                  <Text style={styles.priceText}>{cartItems.length}</Text>
                </View>
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Shipping Charges:</Text>
                  <Text style={styles.priceText}>$0.00</Text>
                </View>
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Total Tax:</Text>
                  <Text style={styles.priceText}>15%</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Grand Total:</Text>
                  <Text style={[styles.priceText, styles.grandPriceText]}>
                    ${totalPrice}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShippingAddress')}>
                <Text style={styles.buttonText}>Proceed to Payment</Text>
              </TouchableOpacity>
            </>
          }
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8", // light background color
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  bottomContentContainer: {
    padding: 15,
    backgroundColor: "#e8f8fa",
    borderRadius: 10,
    borderColor: "#007bff",
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    marginTop: 30,
    borderStyle: "dotted",
  },
  titleText: {
    fontSize: 16,
    color: "#757575",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "600",
  },
  divider: {
    borderWidth: 0.5,
    borderColor: "#C0C0C0",
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: "#3C3C3C",
    fontWeight: "700",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#007bff",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
});
