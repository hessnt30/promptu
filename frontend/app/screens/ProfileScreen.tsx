import React from 'react';
import { View, Text, Button, StyleSheet, useColorScheme, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<{
    Home: undefined;
  }>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme(); // Get the current color scheme

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colorScheme === 'dark' ? '#222' : '#fff',
      padding: 20,
    },
    profilePic: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? '#fff' : '#000',
      marginBottom: 10,
    },
    settingsButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: colorScheme === 'dark' ? '#444' : '#ddd',
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    settingsText: {
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/john_pork.jpg')}
        style={styles.profilePic}
      />
      <Text style={styles.name}>John Pork</Text>
      <Text style={{ color: colorScheme === 'dark' ? '#aaa' : '#555' }}>@johndoe</Text>
      {/* <Button title="Go to Home" onPress={() => navigation.navigate("Home")} /> */}
      <View style={styles.settingsButton}>
        <Text style={styles.settingsText}>Settings</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
