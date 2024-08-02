import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { CELL_SIZE, Direction } from '../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const calculateFieldDimensions = () => {
  const { width, height } = Dimensions.get('window');
  const fieldWidth = Math.floor((width - 80) / CELL_SIZE);
  const fieldHeight = Math.floor((height - 160) / CELL_SIZE);
  return { fieldWidth, fieldHeight };
};

const getNextPosition = (x: number, y: number, direction: string) => {
  switch (direction) {
    case 'UP':
      return { x, y: y - 1 };
    case 'RIGHT':
      return { x: x + 1, y };
    case 'DOWN':
      return { x, y: y + 1 };
    case 'LEFT':
      return { x: x - 1, y };
    default:
      return { x, y };
  }
};

export const useGameLogic = (showMainMenu: boolean, showTutorial: boolean) => {
  const { fieldWidth, fieldHeight } = calculateFieldDimensions();

  const [snake, setSnake] = useState<{ x: number; y: number; direction: string }[]>([
    { x: 5, y: 5, direction: 'RIGHT' },
    { x: 4, y: 5, direction: 'RIGHT' },
    { x: 3, y: 5, direction: 'RIGHT' },
    { x: 2, y: 5, direction: 'RIGHT' },
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  const { difficulty } = useSelector((state: RootState) => state.difficulty);

  const speed = {
    easy: 150,
    medium: 100,
    hard: 50,
  }[difficulty];

  const generateFoodPosition = () => {
    const newFood = {
      x: Math.floor(Math.random() * fieldWidth),
      y: Math.floor(Math.random() * fieldHeight),
    };
    return newFood;
  };

  useEffect(() => {
    const handleMovement = () => {
      if (gameOver || paused || showTutorial || showMainMenu) return;

      const directions = {
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 },
      };

      const { x: dx, y: dy } = directions[direction];
      const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

      if (newHead.x < 0 || newHead.x >= fieldWidth || newHead.y < 0 || newHead.y >= fieldHeight) {
        setGameOver(true);
        return;
      }

      if (snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return;
      }

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(score + 1);
        setFood(generateFoodPosition());
        setSnake([{ ...newHead, direction }, ...snake]);
      } else {
        const newSnake = [{ ...newHead, direction }, ...snake.slice(0, -1)];
        setSnake(newSnake);
      }
    };

    const movementInterval = setInterval(handleMovement, speed);

    return () => {
      clearInterval(movementInterval);
    };
  }, [snake, food, direction, gameOver, paused, showTutorial, showMainMenu, fieldWidth, fieldHeight]);

  const resetGame = () => {
    setSnake([
      { x: 5, y: 5, direction: 'RIGHT' },
      { x: 4, y: 5, direction: 'RIGHT' },
      { x: 3, y: 5, direction: 'RIGHT' },
      { x: 2, y: 5, direction: 'RIGHT' },
    ]);
    setFood(generateFoodPosition());
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setPaused(false);
  };

  return {
    snake,
    food,
    direction,
    setDirection,
    score,
    gameOver,
    resetGame,
    paused,
    setPaused,
    fieldWidth,
    fieldHeight,
  };
};
