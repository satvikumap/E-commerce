import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ShippingAddress({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home Address', details: 'Street no. 2 Near Giant Mall Downtown New York.', icon: 'home' },
    { id: 2, type: 'Office Address', details: 'Office No. 5 Main Building Near Waterfall New York.', icon: 'briefcase' },
  ]);

  const addAddress = () => {
    if (newAddress.trim() === '') return;
    const newId = addresses.length ? addresses[addresses.length - 1].id + 1 : 1;
    setAddresses([...addresses, { id: newId, type: 'New Address', details: newAddress, icon: 'location' }]);
    setNewAddress('');
    setModalVisible(false);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.id);
    navigation.navigate('PaymentMethod', { address });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', margin: 20, marginTop: 40 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'chevron-back-outline'} size={30} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.header}>Shipping Address</Text>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.list, 
              selectedAddress === item.id && styles.highlight
            ]}
            onPress={() => handleAddressSelect(item)}
          >
            <View style={styles.iconBackground}>
              <Icon name={item.icon} size={30} />
            </View>
            <View>
              <Text style={styles.text}>{item.type} :</Text>
              <Text style={styles.details}>{item.details}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={{margin:20}} >
        <TouchableOpacity activeOpacity={0.8} style={styles.btnAdd} onPress={() => setModalVisible(true)}>
          <Text style={styles.btnText}>
            Add New Address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 60,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  highlight: {
    backgroundColor: '#E0F0FF',
    padding:24,
  },
  iconBackground: {
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    padding: 10,
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    paddingLeft:20,
  },
  details: {
    fontSize: 16,
    color: '#555555',
    paddingLeft:20,
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#1977f3',
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1977f3',
  },
 
});
