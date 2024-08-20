import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Loading = () => {
  return (
        <View style={{aspectRatio:1 ,height:100}}>
            <LottieView style={{flex:1}} source={require('../../assets/Animation - 1723291987436.json')} autoPlay loop/>
        </View>
  )
}

export default Loading