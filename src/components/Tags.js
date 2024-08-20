import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  
  const Tags = () => {
    const [selected, setSelected] = useState("All");
    const tags = [ "All", "New", "Fashion", "Mens"];
  
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          data={tags}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelected(item)}>
              <Text
                style={[
                  styles.tagText,
                  item === selected ? styles.isSelected : null,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.scrollContainer}
        />
      </View>
    );
  };
  
  export default Tags;
  
  const styles = StyleSheet.create({
    tagText: {
      fontSize: 15,
     
      borderRadius: 20,
      borderCurve:2,
      paddingHorizontal: 30,
      paddingVertical: 10,
      marginHorizontal: 10,
      fontWeight: "700",
    },
    isSelected: {
      backgroundColor: "#000000", // Black background
      color: "#FFFFFF", // White text color
    },
    container: {
      marginVertical: 10,
    },
    scrollContainer: {
      paddingHorizontal: 10,
    },
  });
  