import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const notifications = [
  {
    id: '1',
    icon: require('../../assets/shoe.png'), // replace with the actual icon
    text: '50% OFF in Ultraboost all terrain Ltd shoes!!!',
    time: 'Today',
  },
  {
    id: '2',
    icon: require('../../assets/bag.png'), // replace with the actual icon
    text: 'One Step ahead with new stylish collections every week.',
    time: 'Today',
  },
  {
    id: '3',
    icon: require('../../assets/bag.png'), // replace with the actual icon
    text: 'Package from your order #67398 has been arrived.',
    time: 'Earlier',
  },
  {
    id: '4',
    icon: require('../../assets/shirt.png'), // replace with the actual icon
    text: '70% OFF in Cutter and Buck Women’s knit!!!',
    time: 'Earlier',
  },
  {
    id: '5',
    icon: require('../../assets/wallet.png'), // replace with the actual icon
    text: '$200 added in your wallet successfully.',
    time: 'Earlier',
  },
  {
    id: '6',
    icon: require('../../assets/wallet.png'), // replace with the actual icon
    text: 'Package from your order #34867 has been arrived.',
    time: 'Earlier',
  },
];

export default function Notification() {
  const navigation = useNavigation();

  const renderNotification = ({ item }) => {
    const isHighlighted = item.id === '1' || item.id === '4' || item.id === '5';

    return (
      <View style={[styles.notificationItem, isHighlighted && styles.highlightedItem]}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.text}>{item.text}</Text>
        {isHighlighted && <Icon name="ellipse" size={10} style={styles.botIcon} />} 
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name={"chevron-back-outline"} size={30} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.timeSection}>Today</Text>
      <FlatList
        data={notifications.filter(notification => notification.time === 'Today')}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.timeSection}>Earlier</Text>
      <FlatList
        data={notifications.filter(notification => notification.time === 'Earlier')}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: '#FFFFFF', // Set background to white
    flex: 1, // Ensure the container takes up the full screen
  },
  back: {
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    position: 'relative',
  },
  highlightedItem: {
    backgroundColor: '#E0F7FA', // light blue background
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
    
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
  timeSection: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  botIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#1977f3'
  },
});
