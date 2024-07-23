import { ThemedText } from '@/components/ThemedText';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Difficulty, setDifficulty } from '@/store/SnakeGame/difficultySlice';
import { RootState } from '@/store/store';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

interface MainMenuProps {
  onStart: () => void;
  onShowTutorial: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart, onShowTutorial }) => {
  const dispatch = useAppDispatch();
  const {difficulty} = useAppSelector((state: RootState) => state.difficulty);

  const handleSetDifficulty = (newDifficulty: Difficulty) => {
    dispatch(setDifficulty(newDifficulty));
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="title">
        <Link href="/explore">Home</Link>
      </ThemedText>
      <Text style={styles.header}>Snake game</Text>
      <Image style={styles.image} source={require('../assets/Snake.png')} />
      <View style={styles.btnList}>
        <Button title={'Start Game'} onPress={onStart} />
        <Button title={'Tutorial'} onPress={onShowTutorial} />
      </View>
      <View style={styles.difficultyContainer}>
        <Button title="Easy" onPress={() => handleSetDifficulty('easy')} color={difficulty === 'easy' ? 'green' : 'grey'} />
        <Button title="Medium" onPress={() => handleSetDifficulty('medium')} color={difficulty === 'medium' ? '#8B8000' : 'grey'} />
        <Button title="Hard" onPress={() => handleSetDifficulty('hard')} color={difficulty === 'hard' ? '#8B0000' : 'grey'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
    backgroundColor: "#9E9E9E",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    color: "#0047AB",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    backgroundColor: '#9E9E9E',
    padding: 10,
    borderRadius: 2,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  btnList: {
    gap: 20,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,

    backgroundColor: '#9E9E9E',
    padding: 30,
    borderRadius: 4,
  }
});



export default MainMenu;
