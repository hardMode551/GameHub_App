import { useEffect } from 'react';

// Используем то же определение типов, что и в useScrollManagement
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        enableClosingConfirmation: () => void;
        onEvent: (eventType: string, eventHandler: (event: any) => void) => void;
        offEvent: (eventType: string, eventHandler: (event: any) => void) => void;
        disableVerticalSwipes?: () => void; // Добавляем новый метод как опциональный
      }
    }
  }
}

export function useTelegramWebApp() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      // Включаем подтверждение закрытия
      window.Telegram.WebApp.enableClosingConfirmation();

      // Настраиваем обработку основных событий
      window.Telegram.WebApp.onEvent('viewportChanged', handleViewportChanged);
      window.Telegram.WebApp.onEvent('mainButtonClicked', handleMainButtonClicked);
    }

    return () => {
      // Очистка при размонтировании
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.offEvent('viewportChanged', handleViewportChanged);
        window.Telegram.WebApp.offEvent('mainButtonClicked', handleMainButtonClicked);
      }
    };
  }, []);

  function handleViewportChanged(event: any) {
    console.log('Viewport changed:', event);
    // Здесь можно добавить логику обработки изменения viewport
  }

  function handleMainButtonClicked() {
    console.log('Main button clicked');
    // Обработка нажатия на основную кнопку
  }
}