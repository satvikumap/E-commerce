import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Firebase'; 
import Loading from '../components/Loading';
import { doc, setDoc } from 'firebase/firestore'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupPage = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const userName = useRef('');
  const email = useRef('');
  const password = useRef('');
  const rePassword = useRef('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!email.current || !password.current || !userName.current || !rePassword.current) {
      Alert.alert('All fields are required.');
      return;
    }

    if (password.current !== rePassword.current) {
      Alert.alert('Passwords do not match.');
      return;
    }

    if (!toggleCheckBox) {
      Alert.alert('You need to agree to the terms and conditions.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.current, password.current);
      const user = userCredential.user;

      // Create a Firestore document with the user's information
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: userName.current,
        email: email.current,
      });

      // Store the user details in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));

      Alert.alert('Signup successful!', 'Welcome!');

      // Navigate to HomeScreen
      navigation.replace('HomeScreen');
    } catch (error) {
      Alert.alert('Signup error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView
        style={{ flexDirection: 'column', justifyContent: 'center' }}
        behavior="padding">
        <ScrollView>
          <StatusBar backgroundColor="#FFFFFF" barStyle={'dark-content'} />
          <View style={{ margin: 10, backgroundColor: '#FFFFFF' }}>
            <View style={styles.headerText}>
              <Text style={styles.titleText}>Sign Up</Text>
            </View>
            <View style={{ margin: 20 }}>
              <View>
                <Text style={styles.SubText}>Name</Text>
                <View style={styles.inputContainer}>
                  <Icon name={'person-outline'} size={23} style={styles.icons} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter name here"
                    onChangeText={value => (userName.current = value)}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.SubText}>Email</Text>
                <View style={styles.inputContainer}>
                  <Icon name={'mail-outline'} size={23} style={styles.icons} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Your Email here"
                    keyboardType="email-address"
                    onChangeText={value => (email.current = value)}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.SubText}>Password</Text>
                <View style={styles.inputContainer}>
                  <Icon name={'lock-closed-outline'} size={23} style={styles.icons} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter password here"
                    secureTextEntry={true}
                    onChangeText={value => (password.current = value)}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.SubText}>Re-Type Password</Text>
                <View style={styles.inputContainer}>
                  <Icon name={'lock-closed-outline'} size={23} style={styles.icons} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Re-Type your password"
                    secureTextEntry={true}
                    onChangeText={value => (rePassword.current = value)}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onCheckColor={'#0000FF'}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={{ color: 'black', fontSize: 15 }}>
                    I agree with the
                  </Text>
                  <Text style={{ color: '#1977f3', fontSize: 15 }}>
                    terms and conditions
                  </Text>
                  <Text style={{ color: 'red', fontSize: 15 }}> *</Text>
                </View>
              </View>
            </View>
            <View>
              {
                loading ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Loading />
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={handleSignup}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFFFFF' }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                )
              }
            </View>
            <View style={{ marginTop: 60 }}>
              <Text style={styles.orText}>Or Login with</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/facebook.png')}
                    style={{ width: 35, height: 35, margin: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/google.png')}
                    style={{ width: 40, height: 40, margin: 15 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.infoText}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('LoginPage')}>
                  <Text style={styles.linkText}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Acumin Pro',
  },
  SubText: {
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    margin: 10,
    flexDirection: 'row',
    borderColor: '#c1c1c1',
  },
  icons: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 5,
    color: '#000000',
  },
  btn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1977f3',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 23,
  },
  orText: {
    textAlign: 'center',
    margin: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 15,
    color: '#1977f3',
    fontWeight: 'bold',
  },
});

export default SignupPage;
