import React from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { CELL_SIZE } from '../utils/constants';

const SnakeHeadTexture = require('../assets/head_snake_pixel.png');
const SnakeStartTexture = require('../assets/Snake_texture_2_pixel_start.png');
const SnakeSegmentTexture = require('../assets/Snake_texture_3_pixel.png');
const SnakeTailTexture = require('../assets/Snake_tail_pixel.png');

interface SnakeProps {
  segments: { x: number; y: number; direction: string }[];
  direction: string;
}

const getRotation = (direction: string) => {
  switch (direction) {
    case 'UP':
      return '270deg';
    case 'RIGHT':
      return '0deg';
    case 'DOWN':
      return '90deg';
    case 'LEFT':
      return '180deg';
    default:
      return '0deg';
  }
};

const Snake: React.FC<SnakeProps> = ({ segments }) => {
  return (
    <>
      {segments.map((segment, index) => {
        const isHead = index === 0;
        const isStart = index === 1;
        const isTail = index === segments.length - 1;

        const currentDirection = segment.direction;
        const rotation = getRotation(currentDirection);

        return (
          <View
            key={`${segment.x}-${segment.y}-${index}`}
            style={[
              styles.segmentContainer,
              {
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                transform: [{ rotate: rotation }],
              },
            ]}
          >
            <ImageBackground
              source={
                isHead
                  ? SnakeHeadTexture
                  : isTail
                  ? SnakeTailTexture
                  : isStart
                  ? SnakeStartTexture
                  : SnakeSegmentTexture
              }
              style={styles.segment}
            />
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  segmentContainer: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    position: 'absolute',
    overflow: 'hidden',
  },
  segment: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    position: 'absolute',
    overflow: 'hidden',
  },
});

export default Snake;
