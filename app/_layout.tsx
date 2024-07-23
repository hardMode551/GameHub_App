import { store } from '@/store/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>

    <Stack
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="snake-game" options={{ title: "Snake Game" }} />
      <Stack.Screen name="three-in-a-row" options={{ title: "Three in a Row" }} />
      <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
    </Stack>
    
    </Provider>
  );
}
