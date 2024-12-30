import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SearchScreen = () => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colorScheme === "dark" ? "#222" : "#fff",
    },
    text: {
      color: colorScheme === "dark" ? "#fff" : "#000",
      fontSize: 20,
    },
    searchContainer: {
      width: "95%",
      padding: "2%",
      borderWidth: 1,
      borderColor: "#CCC",
      borderRadius: 100,
      marginVertical: "2%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    searchBar: {
      flex: 1,
      padding: "1%",
    },
  });

  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dismissKeyboard = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const clearSearchText = () => {
    setSearchText("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Find Friends..."
              onChangeText={setSearchText}
              value={searchText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Icon
              name={isFocused ? "close" : "magnify"}
              color={colorScheme === "dark" ? "#fff" : "#ccc"}
              size={24}
              onPress={isFocused ? clearSearchText : undefined}
            />
          </View>
          <Text style={styles.text}>Search Screen</Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
