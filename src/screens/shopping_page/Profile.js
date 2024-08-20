import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {auth} from '../../config/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('user');
      navigation.replace('LoginPage');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (

    <View style={{flex:1,justifyContent:'center'}}>
        <View>
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={handleLogout}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#FFFFFF'}}>
            Log out
            </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    btn: {
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1977f3',
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve:'circular',
        margin:10,
        
      },

});
