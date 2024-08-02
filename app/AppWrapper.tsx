import { useScrollManagement } from '@/hooks/useScrollManagement';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import React from 'react';

interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  useTelegramWebApp();
  useScrollManagement();
  return <>{children}</>;
}