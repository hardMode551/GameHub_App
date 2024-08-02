import React from 'react';
import { AppWrapper } from './AppWrapper';
import { Slot } from 'expo-router';

export default function App() {
  return (
    <AppWrapper>
      <Slot />
    </AppWrapper>
  );
}