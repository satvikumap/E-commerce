import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PaymentMethod({navigation}) {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    navigation.navigate('ThankyouPage'); // Assuming you have a ThankYouPage in your navigation stack
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', margin: 20, marginTop: 40}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'chevron-back-outline'} size={30} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.header}>Payment Method</Text>
      </View>
      
      <View style={styles.listContainer}>
        <TouchableOpacity 
          style={[
            styles.list, 
            selectedMethod === 'paypal' && styles.highlight
          ]}
          onPress={() => handleSelectMethod('paypal')}
        >
          <View style={styles.iconBackground}>
            <Icon name="logo-paypal" size={30} />
          </View>
          <Text style={styles.text}>Pay with Paypal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.list, 
            selectedMethod === 'creditCard' && styles.highlight
          ]}
          onPress={() => handleSelectMethod('creditCard')}
        >
          <View style={styles.iconBackground}>
            <Icon name="card" size={30} />
          </View>
          <Text style={styles.text}>Pay with Credit Card</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.list, 
            selectedMethod === 'googlePay' && styles.highlight
          ]}
          onPress={() => handleSelectMethod('googlePay')}
        >
          <View style={styles.iconBackground}>
            <Icon name="logo-google" size={30} />
          </View>
          <Text style={styles.text}>Pay with Google Pay</Text>
        </TouchableOpacity>
      </View>

      <View style={{margin: 20}}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btnSkip}>
          <Text style={styles.btnText}>
            Add Payment Method
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
  listContainer: {
    marginHorizontal: 20,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  highlight: {
    backgroundColor: '#E0F0FF',
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
  },
  btnSkip: {
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
