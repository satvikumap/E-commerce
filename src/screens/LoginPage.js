import React, { useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../config/Firebase';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const email = useRef('');
  const password = useRef('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email.current || !password.current) {
      Alert.alert('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.current, password.current);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        await AsyncStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: userData.name
        }));
        Alert.alert('Login successful!', `Welcome back, ${userData.name}`);
      } else {
        Alert.alert('Login error', 'User data not found.');
      }

      navigation.replace('HomeScreen');
    } catch (error) {
      Alert.alert('Login error', error.message);
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
              <Text style={styles.titleText}>Login</Text>
            </View>
            <View style={{ margin: 20 }}>
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
                    onPress={handleLogin}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFFFFF' }}>
                      Log In
                    </Text>
                  </TouchableOpacity>
                )
              }
            </View>
            <View style={{ marginTop: 60 }}>
              <Text style={styles.orText}>Or Sign up with</Text>
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
                <Text style={styles.infoText}>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignupPage')}>
                  <Text style={styles.linkText}>Sign Up</Text>
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

export default LoginPage;
