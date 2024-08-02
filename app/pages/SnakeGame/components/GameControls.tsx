import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface GameControlsProps {
  paused: boolean;
  onPauseResume: () => void;
  onExitGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ paused, onPauseResume, onExitGame }) => {
  return (
    <View style={styles.pauseButtonContainer}>
      <Button title={paused ? 'Resume' : 'Pause'} onPress={onPauseResume} />
      <Button title="Exit" onPress={onExitGame} />

      {/* <svg width="200" height="50" viewBox="-5 -5 30 30" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M 0 2 C 4 0 8 5 12 5 C 16 5 20 0 24 2 C 24 8 24 16 24 22 C 20 24 16 19 12 19 C 7 19 4 24 0 22 C 0 20 0 16 0 12 C 0 8 0 4 0 2"
    fill="purple"
    stroke="purple"
    stroke-width="2"
  />
</svg> */}

    </View>
  );
};

const styles = StyleSheet.create({
  pauseButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

export default GameControls;
