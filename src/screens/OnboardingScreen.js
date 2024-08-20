import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#FFFFFF', white: 'black'};

const slides = [
    {
        id: '1',
        image: require('../../assets/Onbording_Screen/onbordingPage1.png'),
        title: `We Provide High 
Quality Products 
Just For You `,
    
      
      },
      {
        id: '2',
        image: require('../../assets/Onbording_Screen/onbordingPage2.png'),
        title: `We Ensure 
Fast Delivery of 
Your Order`,
    
        
      },
      {
        id: '3',
        image: require('../../assets/Onbording_Screen/onbordingPage3.png'),
        title: `We Provide The 
Products You Can 
Get Satisfied With`,
       
      },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems:'center',backgroundColor:'#FFFFFF'}}>
      <Image
        source={item?.image}
        style={{height: '65%', width, resizeMode: 'contain'}}
      />
      <View style={{maxWidth: '60%'}}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.replace("SignupPage");
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    }
  };

  const skip = () => {
    navigation.replace("SignupPage");
    AsyncStorage.setItem('isAppFirstLaunched', 'false');
  };

  const Footer = () => {
    return (
      <View style={{
        height: height * 0.25,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          position: 'relative',
          bottom: 230,
          right: 10,
        }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: '#1977f3',
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={goToNextSlide}
              style={styles.btn}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: '#FFFFFF',
                }}>
                Get Started
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={skip}
                style={styles.btnSkip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: '#1977f3',
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
            
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: '#FFFFFF',
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={skip}
                style={styles.btnSkip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: '#1977f3',
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={"dark-content"} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  title: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center', // Center the text horizontally
    lineHeight: 30,
    letterSpacing:0.5,
    fontFamily:'Acumin Pro',
    
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 15,
    width: 15,
    backgroundColor: '#ded9d9',
    borderCurve:'circular',
    marginHorizontal: 3,
    borderRadius: 14,
    alignContent:'space-between',
    marginLeft:10,
    justifyContent:'center'
  },
  btn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1977f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderCurve:'circular',
    margin:10,
    
  },
  btnSkip:{
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default OnboardingScreen;