import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.logoContainer}>
          <Image
          source={require('@/assets/images/Remove-bg_Logo_v1.png')}
          style={styles.Logo}
        />
        <ThemedText type="title" style={styles.logoText}>GameHub</ThemedText>
        </ThemedView>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText>Check out our games!</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    marginBottom: 40,

    backgroundColor: "#334DA9",
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,

    padding: 8,

    color: 'white',
  },
  Logo: {
    height: 178,
    width: 290,
  },
});
