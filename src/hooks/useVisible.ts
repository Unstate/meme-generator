import { useState } from "react";

// Создаем пользовательский хук useVisible
export const useVisible = (initial: boolean): {
  visible: boolean, // Состояние видимости
  close: () => void, // Функция для скрытия
  open: () => void, // Функция для отображения
  toggleVisible: () => void, // Функция для переключения видимости
} => {
  // Используем useState для управления состоянием видимости
  const [visible, setVisible] = useState<boolean>(initial);

  // Функция для скрытия
  function close() {
    setVisible(false);
  }

  // Функция для отображения
  function open() {
    setVisible(true);
  }

  // Функция для переключения видимости
  function toggleVisible() {
    setVisible(prev => !prev);
  }

  // Возвращаем текущее состояние видимости и функции для управления ей
  return {
    visible,
    close,
    open,
    toggleVisible
  };
};
