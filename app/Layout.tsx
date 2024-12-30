import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme, View, Image, Text, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchScreen from "./screens/SearchScreen";
import CreateScreen from "./screens/CreateScreen";
import ShopScreen from "./screens/ShopScreen";

const Tab = createBottomTabNavigator();

const Layout = () => {
  const colorScheme = useColorScheme();

  // example user data, ya boy adrian
  const user = {
    profilePicture:
      "https://media.licdn.com/dms/image/v2/D5603AQHelTzhtDz-9Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1684888144282?e=1741219200&v=beta&t=MLvGpLmEpjs_LPJhRR2EEGl5IfEFhpefBKwdlSIEw3s",
    // profilePicture: null, (use this to test initials)
    name: "Adrian Shirazi",
  };

  // grab first letter of first and last name for intitials
  // in case users profile pic isn't working
  const getUserInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName[0]}${lastName ? lastName[0] : ""}`.toUpperCase();
  };

  // component for profile icon in tab bar
  const ProfileTabIcon = () => {
    return user.profilePicture ? (
      <Image
        source={{ uri: user.profilePicture }}
        style={styles.profileImage}
      />
    ) : (
      <View
        style={[
          styles.initialsContainer,
          { backgroundColor: colorScheme === "dark" ? "#555" : "#ddd" },
        ]}
      >
        <Text
          style={[
            styles.initialsText,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          {getUserInitials(user.name)}
        </Text>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
          },
          tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
          tabBarInactiveTintColor: colorScheme === "dark" ? "#aaa" : "#555",
          tabBarLabelStyle: { display: "none" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: "PromptU",
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
            },
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            tabBarIcon: () => (
              <Icon
                name={"home"}
                color={colorScheme === "dark" ? "#fff" : "#000"}
                size={32}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerTitleStyle: {
              display: "none",
            },
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
            },
            tabBarIcon: () => (
              <Icon
                name={"magnify"}
                color={colorScheme === "dark" ? "#fff" : "#000"}
                size={32}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            headerTitle: "Complete your Prompt",
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
            },
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            tabBarIcon: () => (
              <Icon
                name={"plus"}
                color={colorScheme === "dark" ? "#fff" : "#000"}
                size={32}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
          options={{
            headerTitle: "Communities",
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
            },
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            tabBarIcon: () => (
              <Icon
                name={"account-group"}
                color={colorScheme === "dark" ? "#fff" : "#000"}
                size={32}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitleStyle: { display: "none" },
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
            },
            tabBarIcon: ProfileTabIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginTop: "25%", // TODO, fix this (quick fix to center profile pic)
  },
  initialsContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25%", // TODO, fix this (quick fix to center profile pic)
  },
  initialsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Layout;
