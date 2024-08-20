import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import Icons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = props => {
    const navigation = useNavigation();
  return (
    <View>
      <View>
        <View style={{flexDirection: 'row',justifyContent:'space-between',margin:30}}>
        <View style={{flexDirection: 'row',}}>
            <Avatar.Text
              size={60}
              label={props.username.substring(0, 2).toUpperCase()}
            />
            <View style={{paddingHorizontal:10}}>
                <Text style={{fontSize:15}}>Welcome,</Text>
                <Text style={{fontWeight:'bold',color:'#000000',fontSize:25}}> {props.username}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row',paddingVertical:20}}>
          <Icons name="search" size={28} style={styles.icon} />
          <TouchableOpacity onPress={()=>navigation.navigate('Notifcation')}>
            <Icons name="notifications" size={28} style={styles.icon} />
          </TouchableOpacity>

        </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/shopping.png')}
          style={styles.image}
          resizeMode='contain'
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
    icon:{
       paddingHorizontal:10
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 2, // Adjust the aspect ratio based on your image's dimensions
      },
});
