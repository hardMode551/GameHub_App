import { Stack } from 'expo-router';
import SnakeGame from './pages/SnakeGame';

export default function SnakeGameScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Snake Game" }} />
      <SnakeGame />
    </>
  );
}