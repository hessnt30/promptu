import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

const CreateScreen = () => {
  const colorScheme = useColorScheme(); // Get the current color scheme

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorScheme === "dark" ? "#222" : "#fff",
    },
    text: {
      color: colorScheme === "dark" ? "#fff" : "#000",
      fontSize: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Screen</Text>
    </View>
  );
};

export default CreateScreen;
