import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
  } from 'react-native';
  import React from 'react';
  import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

  
  const SignupPage = () => {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
        <KeyboardAvoidingView behavior="padding">
          <StatusBar backgroundColor="#FFFFFF" barStyle={'dark-content'} />
          <View style={{margin: 10, backgroundColor: '#FFFFFF'}}>
            <View style={styles.headerText}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={"chevron-back-outline"} size={30} style={styles.back} />
            </TouchableOpacity>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'black',
                  fontFamily: 'Acumin Pro',
                  marginLeft:60,
                }}>
                Forget Passworod
              </Text>
            </View>
            <View style={{margin:20}}>
              <View>
                <Text style={styles.SubText}>Eamil</Text>
                <View style={styles.inputContainer}>
                  <Icon name={"mail-outline"} size={23} style={styles.icons}/>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Your Email here"
                    keyboardType="email-address"
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.8}
                  style={styles.btn}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: '#FFFFFF',
                      }}>Get Code</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default SignupPage;
  
  const styles = StyleSheet.create({
    headerText: {
      flexDirection:'row',
      margin: 25,
     
    },
    inputContainer:{
      height: 50,
      borderRadius: 25,
      borderCurve: 'circular',
      margin: 10,
      marginRight:0,
      marginLeft: 0,
      borderWidth: 1,
      flexDirection:'row',
      borderColor:'#c1c1c1',
    },
    icons:{
      marginBottom:10,
      marginTop:10,
      marginLeft:20,
      marginRight:5,
      color:'#000000',
  
    },
    btn: {
      height: 50,
      borderRadius: 25,
      backgroundColor: '#1977f3',
      justifyContent: 'center',
      alignItems: 'center',
      borderCurve:'circular',
      margin:23,
      
    },
  });
  