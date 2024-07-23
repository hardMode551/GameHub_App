import { Stack } from 'expo-router';
import ThreeInARow from './pages/ThreeInARowGame';

export default function ThreeInARowScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Three in a Row" }} />
      <ThreeInARow />
    </>
  );
}