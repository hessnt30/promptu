import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchScreen from "./screens/SearchScreen";
import CreateScreen from "./screens/CreateScreen";
import ShopScreen from "./screens/ShopScreen";

const Tab = createBottomTabNavigator();

const Layout = () => {
  const colorScheme = useColorScheme(); // Get the current color scheme

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
          },
          tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
          tabBarInactiveTintColor: colorScheme === "dark" ? "#aaa" : "#555",
          tabBarLabelStyle: { display: "none" }, // Hide labels
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
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
            tabBarIcon: () => (
              <Icon
                name={"bitcoin"}
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
            tabBarIcon: () => (
              <Icon
                name={"account"}
                color={colorScheme === "dark" ? "#fff" : "#000"}
                size={32}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
