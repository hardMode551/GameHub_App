import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageSetKey } from "./utils/imageSets";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentImageType } from "@/store/ThreeInARow/imageSetsSlice";
import ImageSelectionModal from "./components/ImageSelectionModal";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";


const ThreeInARow: React.FC = () => {
  const [score, setScore] = useState(0);
  const [imageType, setImageType] = useState<ImageSetKey>("cats");
  const [modalVisible, setModalVisible] = useState(true);

  const dispatch = useAppDispatch();

  const handleScoreUpdate = (newScore: number) => {
    setScore((prevScore) => prevScore + newScore);
  };

  const handleImageTypeSelect = (type: ImageSetKey) => {
    setImageType(type);
    dispatch(setCurrentImageType(type));
    setModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ImageSelectionModal
          onClose={() => setModalVisible(false)}
          isVisible={modalVisible}
          onSelect={handleImageTypeSelect}
        />
        {imageType !== null && (
          <View style={styles.gameContainer}>
            <ThemedText style={styles.title} type="title">
              <Link href="/explore">Home</Link>
            </ThemedText>

            <ScoreBoard score={score} />
            <GameBoard
              onScoreUpdate={handleScoreUpdate}
              imageType={imageType}
            />
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default ThreeInARow;
