import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/routes/Route';
import {CartProvider} from './src/context/CartContext';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <CartProvider>
        <Route />
      </CartProvider>
    </NavigationContainer>
  );
};

export default App;
