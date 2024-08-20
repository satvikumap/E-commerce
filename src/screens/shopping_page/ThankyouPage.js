import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ThankyouPage = () => {
    const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#FFFFFF', height: '100%',justifyContent:'space-evenly'}}>
      <Image
        source={require('../../../assets/orderConfirmed.png')}
        style={{height: '45%', width: '100%', resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>Thank you</Text>
        <Text style={styles.title}>For shopping!!!!</Text>
        <Text style={styles.subtitle}>Your Order has been placed</Text>
        <Text style={styles.subtitle}> successfully</Text>
      </View>
      <View style={{margin:30}}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => navigation.navigate('HomeScreen') }>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: '#FFFFFF',
            }}>
            Contiune Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThankyouPage;

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: 0.4,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  subtitle: {
    textAlign: 'center',
  },
  btn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1977f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderCurve: 'circular',
    margin: 10,
  },
});
