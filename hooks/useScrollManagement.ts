import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        enableClosingConfirmation: () => void;
        onEvent: (eventType: string, eventHandler: (event: any) => void) => void;
        offEvent: (eventType: string, eventHandler: (event: any) => void) => void;
        disableVerticalSwipes?: () => void;
      }
    }
  }
}

export function useScrollManagement() {
  const scrollableElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollableElRef.current = document.body.querySelector('[style*="overflow: auto"], [style*="overflow-y: auto"]') || document.body;

    let startY = 0;
    let startScrollTop = 0;
    let isScrolling = false;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startScrollTop = scrollableElRef.current?.scrollTop || 0;
      isScrolling = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const scrollableEl = scrollableElRef.current;
      
      if (scrollableEl) {
        const currentY = touch.clientY;
        const scrollTop = scrollableEl.scrollTop;
        const scrollHeight = scrollableEl.scrollHeight;
        const clientHeight = scrollableEl.clientHeight;
        const deltaY = startY - currentY;

        // Определяем, начался ли скролл
        if (Math.abs(deltaY) > 5) {
          isScrolling = true;
        }

        // Предотвращаем сворачивание приложения при свайпе вниз в крайнем верхнем положении
        if (scrollTop === 0 && deltaY < 0) {
          e.preventDefault();
          return;
        }

        // Предотвращаем сворачивание приложения при свайпе вниз в крайнем нижнем положении
        if (scrollTop + clientHeight === scrollHeight && deltaY > 0) {
          e.preventDefault();
          return;
        }

        // Разрешаем скролл в обоих направлениях
        if (isScrolling) {
          return;
        }

        // Если скролл не начался, предотвращаем действие по умолчанию
        e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      isScrolling = false;
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: true });

    // Очистка при размонтировании
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return null;
}