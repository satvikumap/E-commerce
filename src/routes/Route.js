import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/Firebase';

import OnboardingScreen from '../screens/OnboardingScreen';
import SignupPage from '../screens/SignupPage';
import LoginPage from '../screens/LoginPage';
import ForgetPassword from '../screens/ForgetPassword';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/shopping_page/HomeScreen';
import Cart from '../screens/shopping_page/Cart';
import Favorite from '../screens/shopping_page/Favorite';
import Profile from '../screens/shopping_page/Profile';
import Notifcation from '../screens/Notifcation';
import ProductDetailsScreen from '../screens/shopping_page/ProductDetailsScreen';
import ThankyouPage from '../screens/shopping_page/ThankyouPage';
import Icons from 'react-native-vector-icons/Ionicons';
import ShippingAddress from '../screens/shopping_page/ShippingAddress';
import PaymentMethod from '../screens/shopping_page/PaymentMethod';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData == null) {
          setIsAppFirstLaunched(true);
          await AsyncStorage.setItem('isAppFirstLaunched', 'false');
        } else {
          setIsAppFirstLaunched(false);
        }
      } catch (error) {
        console.error('Error checking app first launch status:', error);
      }
    };

    const checkUserStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        onAuthStateChanged(auth, user => {
          if (user) {
            AsyncStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          } else {
            AsyncStorage.removeItem('user');
            setUser(null);
          }
        });
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkFirstLaunch();
    checkUserStatus();
  }, []);

  return (
    isAppFirstLaunched != null && (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppFirstLaunched && (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        {user ? (
          <>
            <Stack.Screen name="HomeScreen" component={TabScreens} />
            <Stack.Screen name="Notifcation" component={Notifcation} />
            <Stack.Screen
              name="PRODUCT_DETAILS"
              component={ProductDetailsScreen}
            />
            <Stack.Screen
              name="ShippingAddress"
              component={ShippingAddress}
            />
            <Stack.Screen
              name="PaymentMethod"
              component={PaymentMethod}
            />
            <Stack.Screen
              name="ThankyouPage"
              component={ThankyouPage}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SignupPage" component={SignupPage} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          </>
        )}
      </Stack.Navigator>
    )
  );
};

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icons
              name="home"
              size={28}
              color={focused ? '#1977f3' : '#6b6565'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => (
            <Icons
              name="cart"
              size={28}
              color={focused ? '#1977f3' : '#6b6565'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({focused}) => (
            <Icons
              name="heart"
              size={28}
              color={focused ? '#1977f3' : '#6b6565'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Icons
              name="person"
              size={28}
              color={focused ? '#1977f3' : '#6b6565'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default App;
