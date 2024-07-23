import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import { TileDataOrNull, Position } from "../utils/types";
import { ImageSetKey } from "../utils/imageSets";

import Tile from "./Tile";
import { BOARD_SIZE, createGameLogic } from "../utils/GameLogic";
import ImageSelectionModal from "./ImageSelectionModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { setCurrentImageType } from "@/store/ThreeInARow/imageSetsSlice";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";


interface GameBoardProps {
  onScoreUpdate: (score: number) => void;
  // ОСТАВИТЬ ПОКА ТАК, А ПОТОМ ИЗМЕНИТЬ НА МАСШАБИРУЕМОСТЬ
  imageType: ImageSetKey;
}

const GameBoard: React.FC<GameBoardProps> = ({ onScoreUpdate }) => {
  const dispatch = useAppDispatch();
  const { currentImageType } = useAppSelector((state: RootState) => state.imageSets);
  
  const [gameLogic, setGameLogic] = useState(() => createGameLogic(currentImageType));
  const [board, setBoard] = useState<TileDataOrNull[][]>(() => gameLogic.createInitialBoard());
  const [selectedTile, setSelectedTile] = useState<Position | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const newGameLogic = createGameLogic(currentImageType);
    setGameLogic(newGameLogic);
    setBoard(prevBoard => newGameLogic.updateBoardTypes(prevBoard));
  }, [currentImageType]);

  const handleImageTypeSelect = React.useCallback((imageType: ImageSetKey) => {
    dispatch(setCurrentImageType(imageType));
    setIsModalVisible(false);
  }, [dispatch]);

  const processMatches = React.useCallback(() => {
    let newBoard = board;
    let totalScore = 0;
    let hasMatches;

    do {
      hasMatches = false;
      const matches = gameLogic.checkMatches(newBoard);
      if (matches.length > 0) {
        hasMatches = true;
        totalScore += gameLogic.calculateScore(matches);
        newBoard = gameLogic.removeTiles(newBoard, matches);
        newBoard = gameLogic.fillEmptyCells(newBoard);
      }
    } while (hasMatches);

    if (totalScore > 0) {
      setBoard(newBoard);
      onScoreUpdate(totalScore);
    }
  }, [board, onScoreUpdate]);

  useEffect(() => {
    processMatches();
  }, [processMatches]);

  const handleSwipe = React.useCallback((row: number, col: number, direction: 'left' | 'right' | 'up' | 'down') => {
    if (selectedTile) {
      let newRow = selectedTile.row;
      let newCol = selectedTile.col;

      switch (direction) {
        case 'left': newCol = Math.max(0, newCol - 1); break;
        case 'right': newCol = Math.min(BOARD_SIZE - 1, newCol + 1); break;
        case 'up': newRow = Math.max(0, newRow - 1); break;
        case 'down': newRow = Math.min(BOARD_SIZE - 1, newRow + 1); break;
      }

      if (newRow !== selectedTile.row || newCol !== selectedTile.col) {
        const newBoard = gameLogic.swapTiles(board, selectedTile, { row: newRow, col: newCol });
        setBoard(newBoard);
      }
      setSelectedTile(null);
    } else {
      setSelectedTile({ row, col });
    }
  }, [selectedTile, board]);

  return (
    <View style={styles.board}>
      <Button title="Change Image Set" onPress={() => setIsModalVisible(true)} />
      {board.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map(
            (tile, colIndex) =>
              tile && (
                <Tile
                  key={tile.id}
                  tile={tile}
                  onSwipe={(direction) =>
                    handleSwipe(rowIndex, colIndex, direction)
                  }
                  isSelected={
                    selectedTile?.row === rowIndex &&
                    selectedTile?.col === colIndex
                  }
                />
              )
          )}
        </View>
      ))}
      <ImageSelectionModal
        isVisible={isModalVisible}
        onSelect={handleImageTypeSelect}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
});

export default GameBoard;