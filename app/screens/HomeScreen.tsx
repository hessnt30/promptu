import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {fetchRandomPrompt} from '../api'
import { Prompt } from "../../back-end/src/models";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<{
    Profile: undefined;
  }>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const colorScheme = useColorScheme(); // Get the current color scheme
  const [prompt, setPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    (async () => {
      const result = await fetchRandomPrompt();
      setPrompt(result);
    })();
  }, []);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorScheme === 'dark' ? '#222' : '#fff',
    },
    text: {
      color: colorScheme === 'dark' ? '#fff' : '#000',
      fontSize: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.text}>{prompt ? prompt.text : 'Loading prompt...'}</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

export default HomeScreen; 