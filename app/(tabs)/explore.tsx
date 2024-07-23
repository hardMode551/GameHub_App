import { Image, StyleSheet } from "react-native";
import React from "react";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MainMenuScreen from "../pages/MainMenuScreen";

export default function TabTwoScreen() {
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
        <ThemedText type="title">Explore our games!</ThemedText>
      </ThemedView>

      <MainMenuScreen />
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
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


  test:{
    flex: 1,
    backgroundColor: '#00d4ff', 
    gap: 40,
    padding: 10,
  }
});
