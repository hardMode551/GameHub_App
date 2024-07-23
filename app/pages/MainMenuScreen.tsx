import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const MainMenuScreen: React.FC = () => {
  return (
    <LinearGradient colors={['rgba(9,34,121,1)', 'transparent']} style={styles.container}>
      <View style={styles.containerBtn}>
        <View style={styles.content}>
          <Image style={styles.image} source={require('./assets/Snake.jpg')} />
          <Link href="/snake-game" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>SnakeGame</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.content}>
          <Image style={styles.image} source={require('./assets/ThreeInRow.jpg')} />
          <Link href="/three-in-a-row" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Three in a Row</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00d4ff', 
    gap: 40,
    padding: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#334DA9',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    padding: 0,
    margin: 0,
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 5,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,

  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#5365A9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainMenuScreen;